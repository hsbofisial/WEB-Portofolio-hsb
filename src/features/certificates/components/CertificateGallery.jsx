import { useState } from 'react';
import certificatesData from '../data/certificatesData';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

export default function CertificateGallery() {
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div
      className="col-span-12 lg:col-span-5"
      id="certificates"
      data-aos="fade-left"
      data-aos-duration="800"
      data-aos-delay="100"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-black uppercase">Certificates</h2>
        <span className="material-symbols-outlined text-4xl">workspace_premium</span>
      </div>
      <div className="bg-white border-2 border-black hard-shadow p-6 h-[calc(100%-4rem)] flex flex-col justify-between">
        <div className="space-y-4">
          {certificatesData.map((cert, index) => (
            <CertificateCard
              key={cert.title}
              cert={cert}
              index={index}
              onOpen={setActiveCert}
            />
          ))}
        </div>
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
