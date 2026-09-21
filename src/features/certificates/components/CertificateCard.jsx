export default function CertificateCard({ cert, index, onOpen }) {
  return (
    <div
      onClick={() => onOpen(cert)}
      data-aos="zoom-in-up"
      data-aos-delay={300 + index * 150}
      className="bg-white border-2 border-black p-3 hover:translate-x-1 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer flex gap-4 items-center group"
      style={{ boxShadow: '4px 4px 0px 0px #000' }}
    >
      <div className="w-20 h-14 bg-surface-container-high border border-black shrink-0 overflow-hidden relative">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">visibility</span>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-black text-sm uppercase leading-tight truncate group-hover:text-primary transition-colors">
          {cert.title}
        </h5>
        <p className="text-[12px] text-on-surface-variant font-bold mt-1">
          {cert.issuer} · {cert.year}
        </p>
      </div>
      <span className="material-symbols-outlined text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0">
        open_in_new
      </span>
    </div>
  );
}
