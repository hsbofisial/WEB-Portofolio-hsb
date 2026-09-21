import { useState } from 'react';
import educationData from '../data/educationData';
import CertificateModal from '../../certificates/components/CertificateModal';

export default function Education() {
  const [activeEdu, setActiveEdu] = useState(null);

  return (
    <div
      className="w-full"
      id="education"
      data-aos="fade-left"
      data-aos-duration="800"
      data-aos-delay="200"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-black uppercase">Education</h2>
        <span className="material-symbols-outlined text-4xl">school</span>
      </div>

      <div className="space-y-3">
        {educationData.map((edu, index) => (
          <div
            key={edu.id || edu.title}
            onClick={() => setActiveEdu(edu)}
            data-aos="zoom-in-up"
            data-aos-delay={300 + index * 150}
            className="bg-white border-2 border-black px-3.5 py-2.5 hard-shadow hover:translate-x-1 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 ease-in-out cursor-pointer flex gap-3.5 items-center group"
          >
            <div className="w-16 h-12 bg-surface-container-high border border-black shrink-0 overflow-hidden relative">
              <img
                src={edu.image}
                alt={edu.title}
                onError={(e) => {
                  e.currentTarget.src = edu.placeholder || '/images/education/ijazah-placeholder.svg';
                }}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">visibility</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="font-black text-sm uppercase leading-tight group-hover:text-primary transition-colors">
                {edu.title}
              </h5>
              <p className="text-[12px] text-on-surface-variant font-bold mt-1 leading-snug">
                {edu.issuer} · {edu.year}{edu.gpa ? ` · ${edu.gpa}` : ''}
              </p>
            </div>

            <span className="material-symbols-outlined text-neutral-400 group-hover:text-black group-hover:translate-x-0.5 transition-all shrink-0">
              open_in_new
            </span>
          </div>
        ))}
      </div>

      {activeEdu && (
        <CertificateModal
          cert={activeEdu}
          onClose={() => setActiveEdu(null)}
        />
      )}
    </div>
  );
}
