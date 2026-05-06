'use client';

import { useEffect, useState } from 'react';

// Module-level flag — persists across re-renders and navigations
// true = first hard load, false = subsequent client-side navigations
let isFirstLoad = true;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(isFirstLoad);

  useEffect(() => {
    if (!isFirstLoad) return;

    // Mark as done so future navigations skip the preloader
    isFirstLoad = false;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loader js-preloader" style={{
      opacity: 1,
      transition: 'opacity 300ms ease-out',
    }}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
