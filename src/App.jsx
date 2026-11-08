import React, { useState, useCallback } from 'react';
import './styles/global.css';

import LoadingScreen    from './components/layout/LoadingScreen';
import Cursor           from './components/layout/Cursor';
import Navbar           from './components/layout/Navbar';
import Footer           from './components/layout/Footer';

import Intro            from './components/sections/Intro';
import About            from './components/sections/About';
import Projek           from './components/sections/Projek';
import Sertifikat       from './components/sections/Sertifikat';
import Kontak           from './components/sections/Kontak';

import ScrollAnimator   from './components/ui/ScrollAnimator';
import Particles        from './components/ui/Particles';
import AIWidget         from './components/ai/AIWidget';

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
          <Intro />
          <About />
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