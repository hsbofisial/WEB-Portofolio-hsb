import { useState, useEffect } from 'react';
import projectsData from '../data/projectsData';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import AOS from 'aos';

export default function ShowcasePage({ onBack }) {
  const [viewMode, setViewMode] = useState('grid');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface border-b-2 border-black header-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-black uppercase text-sm hover:translate-x-1 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>

          <div className="flex items-center gap-3">
            <h1 className="font-black text-2xl uppercase">Selected Projects</h1>
            <div className="flex gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`border-2 border-black p-1.5 transition-colors flex items-center justify-center cursor-pointer ${
                  viewMode === 'grid' ? 'bg-secondary-container' : 'bg-white hover:bg-secondary-container/50'
                }`}
                title="Tampilan Grid"
              >
                <span className="material-symbols-outlined text-lg">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`border-2 border-black p-1.5 transition-colors flex items-center justify-center cursor-pointer ${
                  viewMode === 'list' ? 'bg-secondary-container' : 'bg-white hover:bg-secondary-container/50'
                }`}
                title="Tampilan List"
              >
                <span className="material-symbols-outlined text-lg">list</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-[16px] opacity-70 mb-8 font-bold">
          All projects ({projectsData.length})
        </p>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                variant="grid"
                onViewDesign={setActiveProject}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                variant="list"
                onViewDesign={setActiveProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* DESIGN PREVIEW MODAL */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}
