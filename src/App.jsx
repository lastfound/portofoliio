import React, { useState } from 'react';
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

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease 0.1s',
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
      </div>
    </>
  );
}

export default App;