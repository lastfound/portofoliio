import React from 'react';
import './styles/global.css';

import Cursor         from './components/Cursor';
import Navbar         from './components/Navbar';
import Tentang        from './components/Tentang';
import Projek         from './components/Projek';
import Sertifikat     from './components/Sertifikat';
import Kontak         from './components/Kontak';
import Footer         from './components/Footer';
import ScrollAnimator from './components/ScrollAnimator';
import Particles      from './components/Particles';

function App() {
  return (
    <>
      {/* Progress bar scroll di paling atas */}
      <div id="scroll-progress" />

      {/* Partikel background */}
      <Particles />

      {/* Animasi scroll terpusat */}
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
    </>
  );
}

export default App;
