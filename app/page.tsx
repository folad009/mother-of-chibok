"use client";

import { useState } from "react";
import { Volume2, VolumeX, Menu } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  const [muted, setMuted] = useState(true);

  // Animation variants for cinematic text reveal
  const letterAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.6 },
    }),
  };

  const subtitleAnimation: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.05 + 0.6, duration: 0.4 },
    }),
  };

  const title = "MOTHERS OF CHIBOK";
  const subtitle =
    "A story of hope, resilience, and healing, through mothers, memory, and peanuts";

  return (
    <div className="relative w-screen h-screen overflow-hidden border-l-2 border-gray-300">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/video/moc-video.mp4"
        autoPlay
        loop
        muted={muted}
      />

      {/* Overlay with Fade-in Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black"
      />

           {/* Vertical Navigation (Left side) */}
      <div className="absolute inset-y-0 left-0 flex flex-col items-center justify-between py-6 text-white text-xs tracking-wide border-r-2 border-gray-300 z-20">
        {/* Top Text */}
        <span className="rotate-180 [writing-mode:vertical-rl]">
          By Kachi Benson
        </span>

        {/* Menu Icon */}
        <button className="p-2 hover:text-yellow-500 transition cursor-pointer">
          <Menu size={24} />
        </button>

        {/* Bottom Text + Sound Toggle */}
        <div className="flex flex-col items-center space-y-4">
          <span className="rotate-180 [writing-mode:vertical-rl] text-center">
            Powered by Wives of Rhoda Foundation
          </span>
          <button
            onClick={() => setMuted(!muted)}
            className="hover:text-yellow-500 transition"
          >
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      {/* Top Right Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-4 right-6 text-white font-bold text-xl"
      >
        <Image src="/assets/images/moc-logo.png" alt="Mothers of Chibok Awards" width={80} height={80} />
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 space-y-2"
        >
          <Image src="/assets/images/moc-awards-logo.png" alt="Mothers of Chibok Awards" width={150} height={150} />
        </motion.div>

        {/* Title with cinematic reveal */}
        <h1 className="text-5xl font-bold mb-4 tracking-wide font-[Cinzel] flex flex-wrap justify-center">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnimation}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle with fade-in word sequence */}
        <p className="text-lg max-w-2xl mb-6 flex flex-wrap justify-center">
          {subtitle.split(" ").map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={subtitleAnimation}
              initial="hidden"
              animate="visible"
              className="mr-1"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="bg-[#B89C58] hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-semibold"
        >
          Follow the journey
        </motion.button>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-6 right-6 text-sm text-white"
      >
        Hope, resilience, and healing.
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 2.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs uppercase tracking-wider z-10"
      >
        <a href="#" className="cursor-pointer">
          Scroll
        </a>
      </motion.div>
    </div>
  );
}
