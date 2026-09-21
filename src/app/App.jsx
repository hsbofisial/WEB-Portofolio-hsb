import { useState, useEffect } from 'react';
import Sidebar from '../shared/components/layout/Sidebar';
import TopBar from '../shared/components/layout/TopBar';
import Footer from '../shared/components/layout/Footer';
import FAB from '../shared/components/layout/FAB';
import Loader from '../shared/components/layout/Loader';
import Hero from '../features/hero/components/Hero';
import ExperienceList from '../features/experience/components/ExperienceList';
import CertificateGallery from '../features/certificates/components/CertificateGallery';
import Education from '../features/education/components/Education';
import Tools from '../features/tools/components/Tools';
import ProjectsSection from '../features/projects/components/ProjectsSection';
import ShowcasePage from '../features/projects/components/ShowcasePage';
import Contact from '../features/contact/components/Contact';
import useIsDesktop from '../shared/hooks/useIsDesktop';
import useNavVisibility from '../shared/hooks/useNavVisibility';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function App() {
  const [page, setPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useIsDesktop();
  const showNavText = useNavVisibility();

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // keep nav text visible when closing the sidebar so the toggle stays readable
      setIsSidebarOpen(prev => !prev);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  };

  const handleLoaderFinished = () => {
    setIsLoading(false);
    setTimeout(() => {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic',
      });
      AOS.refreshHard();
    }, 100);
  };

  return (
    <>
      {page === 'showcase' ? (
        <ShowcasePage onBack={() => setPage('home')} />
      ) : (
        <>
          {isLoading && <Loader onFinished={handleLoaderFinished} />}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <TopBar isOpen={isSidebarOpen} showNavText={showNavText} />
          <div className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'md:ml-[240px] ml-0' : 'ml-0'
          }`}>
            <main className="mt-16 p-6 min-h-screen">
              <Hero />
              <section className="grid grid-cols-12 gap-6 mb-6 overflow-hidden">
                <ExperienceList />
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-4.5">
                  <CertificateGallery />
                  <Education />
                </div>
              </section>
              <Tools />
              <ProjectsSection onShowAll={() => setPage('showcase')} />
              <Contact />
            </main>
            <Footer />
          </div>
          <FAB />
        </>
      )}
    </>
  )
}
