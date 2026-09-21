import { useState } from 'react';
import certificatesData from '../data/certificatesData';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

export default function CertificateGallery() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div
      className="w-full"
      id="certificates"
      data-aos="fade-left"
      data-aos-duration="800"
      data-aos-delay="100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-black uppercase">Certificates</h2>
        <span className="material-symbols-outlined text-4xl">workspace_premium</span>
      </div>

      <div className="space-y-3">
        {certificatesData.map((cert, index) => (
          <CertificateCard
            key={cert.title}
            cert={cert}
            index={index}
            onOpen={setActiveCert}
          />
        ))}
      </div>

      {activeCert && (
        <CertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />
      )}
    </div>
  );
}
