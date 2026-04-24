import React, { useState, useCallback } from 'react';
import './styles/global.css';

import LoadingScreen    from './components/LoadingScreen';
import Cursor           from './components/Cursor';
import Navbar           from './components/Navbar';
import Tentang          from './components/Tentang';
import Projek           from './components/Projek';
import Sertifikat       from './components/Sertifikat';
import Kontak           from './components/Kontak';
import Footer           from './components/Footer';
import ScrollAnimator   from './components/ScrollAnimator';
import Particles        from './components/Particles';
import AIWidget         from './components/AIWidget';

function App() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease',
        visibility: loaded ? 'visible' : 'hidden',
      }}>
        <div id="scroll-progress" />
        <Particles />
        <ScrollAnimator />
        <Cursor />
        <Navbar />
        <main>
          <Tentang />
          <Projek />
          <Sertifikat />
          <Kontak />
        </main>
        <Footer />
        <AIWidget />
      </div>
    </>
  );
}

export default App;