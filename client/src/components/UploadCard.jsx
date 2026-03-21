import { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';

export default function UploadCard({ title, dropText, writeText, onDataChange }) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ file, text });
    }
  }, [file, text, onDataChange]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="glass-effect rounded-[24px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] bg-white/50 border border-white/60 mb-8 animate-fade-in-up">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
         <h2 className="font-serif font-bold text-2xl text-ink">{title}</h2>
      </div>
      
      {/* Drag & Drop Area */}
      <div 
        className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ease-in-out cursor-pointer overflow-hidden ${
          isDragging ? 'border-primary-500 bg-primary-50/50 scale-[1.02]' 
          : file ? 'border-gray-200 bg-white/60' 
          : 'border-gray-300 bg-white/40 hover:bg-white/70 hover:border-primary-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.docx,.txt"
        />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-gray-100/80 text-ink/40 group-hover:bg-primary-50 md:group-hover:text-primary-500'}`}>
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-semibold text-ink/80">{dropText}</p>
              <p className="text-sm text-ink-muted mt-1">or click to browse</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white/80 border border-gray-100 p-4 rounded-xl shadow-sm animate-fade-in relative z-10">
            <div className="flex items-center gap-4 overflow-hidden">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <div className="text-left truncate">
                <p className="text-sm font-semibold text-ink truncate">{file.name}</p>
                <p className="text-xs text-ink-muted mt-0.5">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); setFile(null); if(fileInputRef.current) fileInputRef.current.value = ''; }} 
              className="p-1.5 text-ink-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove File"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="text-center my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/50 text-ink-muted font-medium">or</span>
          </div>
      </div>

      {/* Manual Input Option */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-ink/80 block">{writeText}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Paste or type here...`}
          className="w-full h-32 px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200 text-ink resize-none text-sm"
        ></textarea>
      </div>

    </div>
  );
}
