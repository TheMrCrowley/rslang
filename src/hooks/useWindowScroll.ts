import { useLayoutEffect, useState } from 'react';

const useWindowScroll = (initialTop: number) => {
  const [top, setTop] = useState(0);
  useLayoutEffect(() => {
    function updateTop() {
      setTop(window.scrollY + initialTop);
    }
    window.addEventListener('scroll', updateTop);
    updateTop();
    return () => window.removeEventListener('scroll', updateTop);
  }, []);
  return top;
};

export default useWindowScroll;
