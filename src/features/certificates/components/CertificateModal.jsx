import React, { useEffect } from 'react';

export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        data-aos="zoom-in"
        data-aos-duration="200"
        className="bg-white border-2 border-black p-3 sm:p-4 hard-shadow max-w-2xl sm:max-w-3xl w-full max-h-[82vh] sm:max-h-[85vh] relative flex flex-col justify-between my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON - UNCLIPPED ON CORNER */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 bg-secondary-container border-2 border-black flex items-center justify-center font-black text-base hover:bg-secondary-fixed active:scale-95 transition-all cursor-pointer"
          style={{ boxShadow: '2px 2px 0px 0px #000' }}
          aria-label="Tutup pratinjau"
        >
          ✕
        </button>

        {/* IMAGE DISPLAY - CLEAN & PROPORTIONAL */}
        <div className="flex-1 min-h-0 bg-[#fcf9f0] border-2 border-black flex items-center justify-center overflow-hidden p-1.5 sm:p-2">
          <img
            src={cert.image}
            alt={cert.title}
            onError={(e) => {
              if (cert.placeholder) e.currentTarget.src = cert.placeholder;
            }}
            className="w-full h-full max-h-[55vh] sm:max-h-[60vh] object-contain mx-auto select-none"
          />
        </div>

        {/* BRIEF CAPTION (KETERANGAN SEDIKIT) */}
        <div className="pt-2.5 sm:pt-3 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-black text-sm sm:text-base uppercase leading-tight text-black">
                {cert.title}
              </h4>
              {cert.gpa && (
                <span className="text-[10px] font-black bg-secondary-container px-1.5 py-0.5 border border-black leading-none">
                  {cert.gpa}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-neutral-600 mt-0.5 leading-snug">
              {cert.issuer} · {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-black text-white text-xs font-black uppercase border-2 border-black hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
