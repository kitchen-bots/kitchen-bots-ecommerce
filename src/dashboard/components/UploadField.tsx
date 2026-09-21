import { useState, useCallback } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: string;
  preview?: string;
  type: 'image' | 'document';
}

interface UploadFieldProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  hint?: string;
  onChange?: (files: File[]) => void;
}

export default function UploadField({ label, accept = '*/*', multiple = true, hint, onChange }: UploadFieldProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState(false);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const processFiles = useCallback((rawFiles: FileList | null) => {
    if (!rawFiles) return;
    const arr = Array.from(rawFiles);
    const mapped: UploadedFile[] = arr.map(f => ({
      name: f.name,
      size: formatSize(f.size),
      type: f.type.startsWith('image/') ? 'image' : 'document',
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }));
    setFiles(prev => multiple ? [...prev, ...mapped] : mapped);
    onChange?.(arr);
  }, [multiple, onChange]);

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-col gap-3">
      {label && <label className="text-[13px] font-semibold" style={{ color: 'var(--dash-heading)' }}>{label}</label>}

      <label
        className={`flex flex-col items-center justify-center gap-3 p-8 rounded-[20px] border-2 border-dashed cursor-pointer transition-all duration-200 ${dragging ? 'border-[#1A7A3C] bg-[#DDF3E4]' : 'border-[#E8EAED] bg-[#FAFBFC] hover:border-[#1A7A3C] hover:bg-[#F5FFF8]'}`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#DDF3E4] flex items-center justify-center">
          <Upload size={22} color="#1A7A3C" />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-semibold" style={{ color: 'var(--dash-heading)' }}>Drop files here or <span style={{ color: '#1A7A3C' }}>browse</span></p>
          {hint && <p className="text-[12px] mt-1" style={{ color: 'var(--dash-muted)' }}>{hint}</p>}
        </div>
        <input type="file" accept={accept} multiple={multiple} className="hidden" onChange={e => processFiles(e.target.files)} />
      </label>

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-[14px] border" style={{ background: '#FAFBFC', borderColor: 'var(--dash-border)' }}>
              {f.preview ? (
                <img src={f.preview} alt={f.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#E8DEFF] flex items-center justify-center flex-shrink-0">
                  <FileText size={18} color="#6B3FA0" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate" style={{ color: 'var(--dash-heading)' }}>{f.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--dash-muted)' }}>{f.size}</p>
              </div>
              <button onClick={() => removeFile(i)} className="w-7 h-7 rounded-lg bg-[#FFEAEA] flex items-center justify-center flex-shrink-0 hover:bg-red-200 transition-colors">
                <X size={14} color="#C0392B" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
