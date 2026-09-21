import { useState, useEffect } from 'react';

export default function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= minWidth);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);
    const handleChange = (event) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    setIsDesktop(mediaQuery.matches);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [minWidth]);

  return isDesktop;
}
