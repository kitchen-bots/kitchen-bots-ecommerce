import { useState } from 'react';
import { FileText, Download, Upload } from 'lucide-react';
import SearchBar from '../../components/SearchBar';
import UploadField from '../../components/UploadField';
import { mockDocuments } from '../../data/mockData';
import { formatDate } from '../../utils/formatters';
import type { DocType } from '../../data/mockData';

const TYPE_COLORS: Record<DocType, { bg: string; text: string }> = {
  Invoice:      { bg: '#DDF3E4', text: '#1A7A3C' },
  Warranty:     { bg: '#DCEBFF', text: '#1E6BD3' },
  Quotation:    { bg: '#E8DEFF', text: '#6B3FA0' },
  AMC:          { bg: '#FFF3DC', text: '#E8940A' },
  Installation: { bg: '#FFE8E8', text: '#C0392B' },
};

const DOC_TYPES: (DocType | 'All')[] = ['All', 'Invoice', 'Warranty', 'Quotation', 'AMC', 'Installation'];

export default function CustomerDocuments() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DocType | 'All'>('All');
  const [showUpload, setShowUpload] = useState(false);

  const filtered = mockDocuments.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.orderId ?? '').toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || d.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search documents…" className="flex-1" />
        <button onClick={() => setShowUpload(p => !p)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-[14px] text-[14px] font-semibold hover:bg-gray-50"
          style={{ border: '1px solid var(--dash-border)', color: 'var(--dash-body)', background: 'var(--dash-surface)' }}>
          <Upload size={16} /> Upload
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

      <div className="flex gap-2 flex-wrap">
        {DOC_TYPES.map(t => {
          const isActive = filter === t;
          const c = t !== 'All' ? TYPE_COLORS[t] : null;
          return (
            <button key={t} onClick={() => setFilter(t)}
              className="px-3 py-1.5 rounded-[10px] text-[13px] font-semibold transition-all"
              style={isActive
                ? { background: c?.bg ?? '#DDF3E4', color: c?.text ?? '#1A7A3C', border: `1.5px solid ${c?.text ?? '#1A7A3C'}` }
                : { background: 'var(--dash-surface)', color: 'var(--dash-muted)', border: '1.5px solid var(--dash-border)' }
              }
            >{t}</button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="col-span-full dash-card p-12 text-center">
            <FileText size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-[15px] font-semibold" style={{ color: 'var(--dash-muted)' }}>No documents found</p>
          </div>
        )}
        {filtered.map(doc => {
          const c = TYPE_COLORS[doc.type];
          return (
            <div key={doc.id} className="dash-card p-5 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                  <FileText size={22} color={c.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold truncate" style={{ color: 'var(--dash-heading)' }}>{doc.name}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-[7px] text-[11px] font-bold" style={{ background: c.bg, color: c.text }}>{doc.type}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--dash-border)' }}>
                <div>
                  {doc.orderId && <p className="text-[11px]" style={{ color: 'var(--dash-muted)' }}>Order: {doc.orderId}</p>}
                  <p className="text-[11px]" style={{ color: 'var(--dash-muted)' }}>{formatDate(doc.uploadedAt)} · {doc.size}</p>
                </div>
                <a href={doc.url} download className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100">
                  <Download size={16} style={{ color: 'var(--dash-muted)' }} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
