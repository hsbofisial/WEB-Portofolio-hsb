import { useState, useEffect, useCallback } from 'react';

export default function ProjectModal({ project, onClose }) {
  const images = project?.images && project.images.length > 0
    ? project.images
    : [{ url: project?.image, title: project?.title }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalWorks = images.length;
  const currentWork = images[currentIndex] || images[0];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalWorks - 1 : prev - 1));
  }, [totalWorks]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalWorks - 1 ? 0 : prev + 1));
  }, [totalWorks]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && totalWorks > 1) {
        handlePrev();
      } else if (e.key === 'ArrowRight' && totalWorks > 1) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handlePrev, handleNext, totalWorks]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6 overflow-hidden cursor-zoom-out select-none"
      style={{ backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div
        data-aos="zoom-in"
        data-aos-duration="250"
        className="bg-white border-4 border-black p-2 md:p-3 hard-shadow relative inline-flex items-center justify-center max-w-[95vw] max-h-[92vh] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-9 h-9 md:w-10 md:h-10 bg-secondary-container border-2 border-black flex items-center justify-center font-black text-2xl hover:bg-secondary-fixed transition-transform hover:scale-110 active:scale-95 cursor-pointer z-30"
          style={{ boxShadow: '3px 3px 0px 0px #000' }}
          aria-label="Tutup preview desain"
          title="Tutup (Esc)"
        >
          ×
        </button>

        {/* Large Design Image Only */}
        <div className="border-2 border-black bg-neutral-950 flex items-center justify-center overflow-hidden relative">
          <img
            key={currentWork.url || currentWork}
            src={currentWork.url || currentWork}
            alt={currentWork.title || project.title}
            className="max-h-[84vh] max-w-[90vw] md:max-w-[85vw] w-auto h-auto object-contain block transition-opacity duration-200"
          />

          {/* Navigation Arrows for Multiple Works */}
          {totalWorks > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-secondary-container border-2 border-black flex items-center justify-center font-black text-xl text-black transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                style={{ boxShadow: '2px 2px 0px 0px #000' }}
                aria-label="Karya sebelumnya"
                title="Karya sebelumnya (←)"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-11 md:h-11 bg-white hover:bg-secondary-container border-2 border-black flex items-center justify-center font-black text-xl text-black transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                style={{ boxShadow: '2px 2px 0px 0px #000' }}
                aria-label="Karya berikutnya"
                title="Karya berikutnya (→)"
              >
                ›
              </button>

              {/* Subtle Work Counter */}
              <div
                className="absolute bottom-3 right-3 z-20 bg-black/85 text-white text-xs font-black px-2.5 py-1 border border-white/60 select-none tracking-wider"
              >
                {currentIndex + 1} / {totalWorks}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
