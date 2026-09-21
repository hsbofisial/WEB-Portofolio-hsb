import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-9 h-9 md:w-10 md:h-10 bg-secondary-container border-2 border-black flex items-center justify-center font-black text-2xl hover:bg-secondary-fixed transition-transform hover:scale-110 active:scale-95 cursor-pointer z-20"
          style={{ boxShadow: '3px 3px 0px 0px #000' }}
          aria-label="Tutup preview desain"
          title="Tutup (Esc)"
        >
          ×
        </button>

        {/* Large Design Image Only */}
        <div className="border-2 border-black bg-neutral-950 flex items-center justify-center overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="max-h-[84vh] max-w-[90vw] md:max-w-[85vw] w-auto h-auto object-contain block"
          />
        </div>
      </div>
    </div>
  );
}
