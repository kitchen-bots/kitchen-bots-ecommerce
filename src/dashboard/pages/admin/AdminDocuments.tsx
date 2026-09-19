import { useState } from 'react';
import { FileText, Download, Trash2, Plus } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import UploadField from '../../components/UploadField';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import { mockDocuments } from '../../data/mockData';
import { formatDate } from '../../utils/formatters';
import type { Document, DocType } from '../../data/mockData';

const TYPE_COLORS: Record<DocType, { bg: string; text: string }> = {
  Invoice:      { bg: '#DDF3E4', text: '#1A7A3C' },
  Warranty:     { bg: '#DCEBFF', text: '#1E6BD3' },
  Quotation:    { bg: '#E8DEFF', text: '#6B3FA0' },
  AMC:          { bg: '#FFF3DC', text: '#E8940A' },
  Installation: { bg: '#FFE8E8', text: '#C0392B' },
};

export default function AdminDocuments() {
  const [docs, setDocs] = useState<Document[]>(mockDocuments);
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = docs.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.type.toLowerCase().includes(search.toLowerCase()) ||
    (d.orderId ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ── HEADER ── */}
      <div>
        <h1 className="text-[28px] font-bold tracking-tight" style={{ color: 'var(--dash-heading)', fontFamily: 'var(--font-display)' }}>
          Technical Resources & Documents
        </h1>
        <p className="text-[14px]" style={{ color: 'var(--dash-muted)' }}>Manage technical specifications, manuals, warranties, and system documentation.</p>
      </div>

      <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents…" className="flex-1" />
        <button onClick={() => setShowUpload(p => !p)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90">
          <Plus size={16} /> Upload Document
        </button>
      </div>

      {showUpload && (
        <div className="dash-card p-6">
          <UploadField label="Upload Document" accept=".pdf,.docx,.xlsx,.jpg,.png" hint="PDF, Word, Excel, or Image — max 20 MB" />
          <div className="flex gap-3 mt-4">
            <button className="px-6 py-2.5 rounded-[14px] bg-[#1A7A3C] text-white text-[14px] font-semibold hover:opacity-90"
              onClick={() => setShowUpload(false)}>Upload</button>
            <button className="px-6 py-2.5 rounded-[14px] text-[14px] font-semibold hover:bg-gray-100"
              style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-body)' }}
              onClick={() => setShowUpload(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="dash-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Order ID</th>
                <th>Uploaded</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(doc => {
                const c = TYPE_COLORS[doc.type];
                return (
                  <tr key={doc.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                          <FileText size={15} color={c.text} />
                        </div>
                        <span className="text-[13px] font-semibold" style={{ color: 'var(--dash-heading)' }}>{doc.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="px-2.5 py-1 rounded-[8px] text-[11px] font-bold" style={{ background: c.bg, color: c.text }}>
                        {doc.type}
                      </span>
                    </td>
                    <td><span style={{ color: 'var(--dash-muted)' }}>{doc.orderId ?? '—'}</span></td>
                    <td><span style={{ color: 'var(--dash-muted)' }}>{formatDate(doc.uploadedAt)}</span></td>
                    <td><span style={{ color: 'var(--dash-muted)' }}>{doc.size}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <a href={doc.url} download
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                          <Download size={14} style={{ color: 'var(--dash-muted)' }} />
                        </a>
                        <button className="w-8 h-8 rounded-lg hover:bg-[#FFEAEA] flex items-center justify-center"
                          onClick={() => setDeleteId(doc.id)}>
                          <Trash2 size={14} color="#C0392B" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="p-12 text-center">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p style={{ color: 'var(--dash-muted)' }}>No documents found</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => setDocs(d => d.filter(x => x.id !== deleteId))}
        title="Delete Document"
        message="This document will be permanently deleted."
      />
      </div>
    </div>
  );
}
