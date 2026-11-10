import React, { useState, useCallback, Suspense, lazy } from 'react';
import './styles/global.css';

import LoadingScreen    from './components/layout/LoadingScreen';
import Cursor           from './components/layout/Cursor';
import Navbar           from './components/layout/Navbar';
import Footer           from './components/layout/Footer';

import Intro            from './components/sections/Intro';
import About            from './components/sections/About';
import Keahlian         from './components/sections/Keahlian';
import Projek           from './components/sections/Projek';
import Sertifikat       from './components/sections/Sertifikat';
import Kontak           from './components/sections/Kontak';

import ScrollAnimator   from './components/ui/ScrollAnimator';
import Particles        from './components/ui/Particles';

// Lazy load AIWidget agar chatbot & logic berat tidak membebani initial payload
const AIWidget = lazy(() => import('./components/ai/AIWidget'));

function App() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}

      <div id="scroll-progress" />
      <Particles />
      <ScrollAnimator />
      <Cursor />
      <Navbar />
      <main>
        <Intro />
        <About />
        <Keahlian />
        <Projek />
        <Sertifikat />
        <Kontak />
      </main>
      <Footer />

      <Suspense fallback={null}>
        <AIWidget />
      </Suspense>
    </>
  );
}

export default App;