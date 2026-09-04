'use client';

import { useState, useEffect } from 'react';
import Preloader from './PreLoader';

export default function ClientWrapper({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      window.dispatchEvent(new Event('preloader:complete'));
    }
  }, [isReady]);

  return (
    <div className={!isReady ? 'preload-active overflow-hidden' : ''}>
      {!isReady && <Preloader onComplete={() => setIsReady(true)} />}
      {children}
    </div>
  );
}