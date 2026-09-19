#!/usr/bin/env node
/**
 * Zero-dependency Cloudflare R2 Upload Script
 * Uses Node.js built-ins with AWS S3 SigV4 authentication.
 * 
 * Usage:
 *   node scripts/upload-to-r2.mjs
 * Or with custom env:
 *   R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... R2_BUCKET_NAME=... node scripts/upload-to-r2.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// Load .env if present
const envPath = path.join(ROOT_DIR, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !BUCKET_NAME) {
  console.error('\n❌ Missing Cloudflare R2 credentials in environment or .env file!');
  console.error('Please configure the following in kitchen-bots-ecommerce/.env:');
  console.error('  R2_ACCOUNT_ID=your_cloudflare_account_id');
  console.error('  R2_ACCESS_KEY_ID=your_r2_access_key_id');
  console.error('  R2_SECRET_ACCESS_KEY=your_r2_secret_access_key');
  console.error('  R2_BUCKET_NAME=your_r2_bucket_name\n');
  process.exit(1);
}

const HOST = `${ACCOUNT_ID}.r2.cloudflarestorage.com`;
const REGION = 'auto';
const SERVICE = 's3';

const MIME_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
  '.gif': 'image/gif',
  '.glb': 'model/gltf-binary',
};

function hmac(key, data, encoding) {
  return crypto.createHmac('sha256', key).update(data).digest(encoding);
}

function sha256(data, encoding = 'hex') {
  return crypto.createHash('sha256').update(data).digest(encoding);
}

function getSigningKey(secretKey, dateStamp, region, service) {
  const kDate = hmac('AWS4' + secretKey, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, 'aws4_request');
}

function uploadFile(localPath, s3Key) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.substring(0, 8);

    const payloadHash = sha256(fileData);
    const encodedKey = s3Key.split('/').map(encodeURIComponent).join('/');
    const canonicalUri = `/${BUCKET_NAME}/${encodedKey}`;

    const canonicalHeaders = `host:${HOST}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-content-sha256;x-amz-date';

    const canonicalRequest = [
      'PUT',
      canonicalUri,
      '',
      canonicalHeaders,
      signedHeaders,
      payloadHash
    ].join('\n');

    const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      sha256(canonicalRequest)
    ].join('\n');

    const signingKey = getSigningKey(SECRET_ACCESS_KEY, dateStamp, REGION, SERVICE);
    const signature = hmac(signingKey, stringToSign, 'hex');

    const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const req = https.request({
      hostname: HOST,
      port: 443,
      path: canonicalUri,
      method: 'PUT',
      headers: {
        'Host': HOST,
        'Content-Type': contentType,
        'Content-Length': fileData.length,
        'x-amz-date': amzDate,
        'x-amz-content-sha256': payloadHash,
        'Authorization': authHeader
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode} ${res.statusMessage}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

async function collectFiles(dir, baseDir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

async function main() {
  console.log(`\n🚀 Preparing to upload Kitchen Bots assets to Cloudflare R2: [${BUCKET_NAME}]`);

  const targets = [
    { dir: path.join(ROOT_DIR, 'public/3d-assets'), prefix: '3d-assets' },
    { dir: path.join(ROOT_DIR, 'public/images/products'), prefix: 'images/products' },
    { dir: path.join(ROOT_DIR, 'public/images/redesign'), prefix: 'images/redesign' },
    { dir: path.join(ROOT_DIR, 'public/videos'), prefix: 'videos' },
  ];

  // Check if user also wants raw products from kitchen-bots-products
  const rawProductsDir = path.resolve(ROOT_DIR, '../kitchen-bots-products');
  if (process.argv.includes('--include-raw') && fs.existsSync(rawProductsDir)) {
    targets.push({ dir: path.join(rawProductsDir, 'Products Images'), prefix: 'raw/Products Images' });
    targets.push({ dir: path.join(rawProductsDir, 'Product videos'), prefix: 'raw/Product videos' });
  }

  const allFiles = [];
  for (const target of targets) {
    const files = await collectFiles(target.dir, target.dir);
    for (const f of files) {
      allFiles.push({
        localPath: f.fullPath,
        s3Key: `${target.prefix}/${f.relPath}`
      });
    }
  }

  console.log(`📦 Found ${allFiles.length} files to upload.`);

  const CONCURRENCY = 15;
  let completed = 0;
  let failed = 0;

  async function worker(queue) {
    while (queue.length > 0) {
      const item = queue.shift();
      try {
        await uploadFile(item.localPath, item.s3Key);
        completed++;
        if (completed % 50 === 0 || completed === allFiles.length) {
          process.stdout.write(`\r✅ Uploaded ${completed}/${allFiles.length} files (${((completed / allFiles.length) * 100).toFixed(1)}%)...`);
        }
      } catch (err) {
        failed++;
        console.error(`\n❌ Failed to upload ${item.s3Key}: ${err.message}`);
      }
    }
  }

  const queue = [...allFiles];
  const workers = Array.from({ length: CONCURRENCY }, () => worker(queue));
  await Promise.all(workers);

  console.log(`\n\n🎉 Done! Uploaded: ${completed} files. Failed: ${failed}.`);
  console.log(`\nNext Steps:`);
  console.log(`1. In Cloudflare Dashboard -> R2 -> [${BUCKET_NAME}] -> Settings:`);
  console.log(`   Enable "Public R2.dev URL" or Connect a custom domain (e.g. assets.kitchenbots.in).`);
  console.log(`2. Update VITE_CDN_URL in kitchen-bots-ecommerce/.env`);
  console.log(`3. Run: npm run build & preview!`);
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err);
  process.exit(1);
});
