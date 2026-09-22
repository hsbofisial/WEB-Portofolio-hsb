function renderActionButtons(project, isGrid, onViewDesign) {
  const pyClass = isGrid ? 'py-2 text-xs md:text-sm' : 'py-1.5 text-xs';

  if (project.links && project.links.length > 0) {
    return (
      <div className={`flex gap-2 w-full ${!isGrid ? 'max-w-xs' : ''}`}>
        {project.links.map((link, i) => {
          const isPrimary = link.isPrimary ?? (i === 0);
          const isViewDesign = link.label?.toLowerCase().includes('lihat') || link.action === 'preview';

          if (isViewDesign) {
            return (
              <button
                key={link.label || i}
                type="button"
                onClick={() => onViewDesign?.(project)}
                className={`flex-1 min-w-0 text-center font-bold border-2 border-black uppercase transition-all cursor-pointer truncate active:translate-y-0.5 ${pyClass} ${
                  isPrimary
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
                title={link.label}
              >
                {link.label}
              </button>
            );
          }

          return (
            <a
              key={link.label || i}
              href={link.url || '#'}
              target={link.url && link.url !== '#' ? '_blank' : '_self'}
              rel="noreferrer"
              className={`flex-1 min-w-0 text-center font-bold border-2 border-black uppercase transition-colors cursor-pointer truncate ${pyClass} ${
                isPrimary
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
              title={link.label}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex gap-4 w-full ${!isGrid ? 'max-w-xs' : ''}`}>
      {project.sourceUrl && (
        <a
          className={`flex-1 text-center bg-black text-white font-bold border-2 border-black uppercase hover:bg-neutral-800 transition-colors cursor-pointer ${pyClass}`}
          href={project.sourceUrl}
          target={project.sourceUrl !== '#' ? '_blank' : '_self'}
          rel="noreferrer"
        >
          {project.sourceLabel || 'Source'}
        </a>
      )}
      {project.liveUrl && (
        <a
          className={`flex-1 text-center bg-white text-black font-bold border-2 border-black uppercase hover:bg-neutral-100 transition-colors cursor-pointer ${pyClass}`}
          href={project.liveUrl}
          target={project.liveUrl !== '#' ? '_blank' : '_self'}
          rel="noreferrer"
        >
          {project.liveLabel || 'Live'}
        </a>
      )}
    </div>
  );
}

export default function ProjectCard({ project, index, variant, clampDescription = false, onViewDesign }) {
  const isGrid = variant === 'grid';
  const displayImage = project.image || project.images?.[0]?.url || '';

  if (isGrid) {
    return (
      <div
        data-aos="fade-up"
        data-aos-delay={(index % 3) * 100}
        className="bg-white border-2 border-black hard-shadow overflow-hidden group hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between"
      >
        <div>
          <div
            className="h-48 overflow-hidden border-b-2 border-black relative cursor-pointer"
            onClick={() => onViewDesign?.(project)}
          >
            <img
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
              src={displayImage}
              alt={project.title}
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-black text-xl uppercase group-hover:text-primary transition-colors">{project.title}</h3>
              <span className={`${project.tagBg} text-[10px] font-bold px-2 border-2 border-black shrink-0`}>
                {project.tag}
              </span>
            </div>
            <p className={`text-[14px] leading-5 mb-6 opacity-80 min-h-[40px] ${clampDescription ? 'line-clamp-2' : ''}`}>
              {project.description}
            </p>
          </div>
        </div>
        <div className="px-6 pb-6">
          {renderActionButtons(project, true, onViewDesign)}
        </div>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-right"
      data-aos-delay={index * 100}
      className="bg-white border-2 border-black hard-shadow p-6 flex flex-col md:flex-row items-center gap-6 group hover:translate-x-1 transition-all duration-300 ease-in-out"
    >
      <div
        className="w-full md:w-48 h-32 overflow-hidden border-2 border-black shrink-0 cursor-pointer relative"
        onClick={() => onViewDesign?.(project)}
      >
        <img
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
          src={displayImage}
          alt={project.title}
        />
      </div>
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-black text-xl uppercase group-hover:text-primary transition-colors">{project.title}</h3>
          <span className={`${project.tagBg} text-[10px] font-bold px-2 border-2 border-black`}>
            {project.tag}
          </span>
        </div>
        <p className="text-[14px] leading-5 opacity-80 mb-4">{project.description}</p>
        {renderActionButtons(project, false, onViewDesign)}
      </div>
    </div>
  );
}
