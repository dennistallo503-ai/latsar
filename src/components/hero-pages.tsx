
import React from 'react';
import { motion } from 'framer-motion';

const HeroPages = () => {
  return (
    <section className="relative w-full h-screen bg-gradient-to-r from-gray-900 to-indigo-900 flex items-center px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between w-full">

        {/* Teks Hero */}
        <div className="text-white z-10">
          <h1 className="text-5xl md:text-7xl font-bold">Pilih Hero Favoritmu</h1>
          <p className="mt-4 text-gray-300">Dominasi permainan dengan animasi latar belakang modern.</p>
        </div>

        {/* DISINI PANGGIL FILE .TS TITLE DAN DESC PAGES */}

        {/* Gambar Hero dengan Efek Bergerak */}
        <motion.div
          className="relative z-10 w-full md:w-1/2 flex justify-center"
          animate={{ y: [0, -20, 0] }} // Bergerak ke atas dan bawah
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/hero-page/bg-trans.digital-slide.png"
            alt="Hero Karakter"
            className="w-full max-w-md md:max-w-lg drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroPages;
