export default function CertificateModal({ cert, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        data-aos="zoom-in"
        data-aos-duration="300"
        className="bg-white border-4 border-black p-6 hard-shadow max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-secondary-container border-2 border-black flex items-center justify-center font-black text-xl hover:bg-secondary-fixed transition-colors cursor-pointer"
          style={{ boxShadow: '3px 3px 0px 0px #000' }}
        >
          ×
        </button>
        <div className="border-2 border-black overflow-hidden mb-4 bg-black">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full max-h-[60vh] object-contain mx-auto"
          />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold bg-primary-container px-2 py-0.5 border-2 border-black uppercase mb-2 inline-block">
              Verified Certificate
            </span>
            <h3 className="font-black text-2xl uppercase leading-tight mb-1">{cert.title}</h3>
            <p className="font-bold text-[14px] text-on-surface-variant">{cert.issuer} · {cert.year}</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-black text-white font-black border-2 border-black text-sm uppercase hover:bg-neutral-800 transition-colors shrink-0 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
