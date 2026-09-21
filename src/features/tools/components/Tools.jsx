import React from 'react';
import toolsData from '../data/toolsData';

export default function Tools() {
  return (
    <section className="mb-10" id="tools">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-black uppercase">DESIGN & CREATIVE TOOLS</h2>
        </div>
        <span className="material-symbols-outlined text-4xl">palette</span>
      </div>
      
      <div className="relative w-full overflow-hidden border-2 border-black bg-surface-container-high py-6 hard-shadow">
        {/* Soft gradient fade on sides */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-surface-container-high to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface-container-high to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {/* First Copy */}
          <div className="flex shrink-0 items-center gap-6 px-3">
            {toolsData.map((tool, index) => (
              <div 
                key={`tool-1-${index}`} 
                className={`${tool.bg} border-2 border-black p-4 flex items-center gap-4 hard-shadow group hover:-translate-y-0.5 hover:shadow-none transition-all duration-100 min-w-[200px] select-none`}
              >
                <div className="w-10 h-10 bg-white border border-black p-1.5 flex items-center justify-center shrink-0">
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-100" 
                  />
                </div>
                <span className="font-black text-lg uppercase leading-none">{tool.name}</span>
              </div>
            ))}
          </div>
          {/* Second Copy for Seamless Loop */}
          <div className="flex shrink-0 items-center gap-6 px-3" aria-hidden="true">
            {toolsData.map((tool, index) => (
              <div 
                key={`tool-2-${index}`} 
                className={`${tool.bg} border-2 border-black p-4 flex items-center gap-4 hard-shadow group hover:-translate-y-0.5 hover:shadow-none transition-all duration-100 min-w-[200px] select-none`}
              >
                <div className="w-10 h-10 bg-white border border-black p-1.5 flex items-center justify-center shrink-0">
                  <img 
                    src={tool.icon} 
                    alt={tool.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-100" 
                  />
                </div>
                <span className="font-black text-lg uppercase leading-none">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
