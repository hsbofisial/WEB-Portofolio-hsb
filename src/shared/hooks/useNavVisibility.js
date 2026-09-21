import { useState, useEffect, useRef } from 'react';

export default function useNavVisibility(threshold = 50) {
  const [showNavText, setShowNavText] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > threshold) {
        setShowNavText(false);
      } else {
        setShowNavText(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return showNavText;
}
