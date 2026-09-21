import { useState } from 'react';
import experienceData from '../data/experienceData';

const INITIAL_SHOW = 3;

export default function ExperienceList() {
  const [showAllExp, setShowAllExp] = useState(false);

  const visibleExp = showAllExp ? experienceData : experienceData.slice(0, INITIAL_SHOW);
  const hiddenCount = experienceData.length - INITIAL_SHOW;

  const iconBg = (index) => index % 2 === 0 ? 'bg-primary-container' : 'bg-tertiary-container';

  return (
    <div
      className="col-span-12 lg:col-span-7"
      id="experience"
      data-aos="fade-right"
      data-aos-duration="800"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-black uppercase">Experience</h2>
        <span className="material-symbols-outlined text-4xl animate-pulse">work_history</span>
      </div>

      <div className="space-y-4">
        {visibleExp.map((exp, index) => (
          <div
            key={index}
            data-aos="fade-right"
            data-aos-delay={200 + index * 150}
            className="bg-white border-2 border-black p-6 hard-shadow flex items-start gap-6 group hover:translate-x-2 transition-transform duration-300 ease-in-out"
          >
            <div className={`w-12 h-12 ${iconBg(index)} border-2 border-black flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform`}>
              <span className="material-symbols-outlined">{exp.icon}</span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="font-black text-base sm:text-lg uppercase leading-tight group-hover:text-primary transition-colors">{exp.title}</h4>
                <span className="text-[14px] font-bold bg-secondary-container px-2 border-2 border-black whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-[14px] font-bold text-primary mb-2">{exp.role}</p>
              <p className="text-[16px] opacity-80">{exp.desc}</p>
            </div>
          </div>
        ))}

        {!showAllExp && hiddenCount > 0 && (
          <button
            onClick={() => setShowAllExp(true)}
            data-aos="fade-up"
            data-aos-delay={200 + INITIAL_SHOW * 150}
            className="w-full bg-white border-2 border-black p-4 hard-shadow font-black text-sm uppercase hover:translate-x-1 transition-transform duration-300 cursor-pointer"
          >
            View other experiences (+{hiddenCount})
          </button>
        )}
        {showAllExp && hiddenCount > 0 && (
          <button
            onClick={() => setShowAllExp(false)}
            className="w-full bg-white border-2 border-black p-4 hard-shadow font-black text-sm uppercase hover:-translate-x-1 transition-transform duration-300 cursor-pointer"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}
