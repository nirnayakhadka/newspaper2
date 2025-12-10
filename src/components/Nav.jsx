// components/NavBar.jsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function NavBar() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="bg-gradient-to-br from-gray-900 to-purple-950  text-white shadow-2xl"
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">

          {/* LEFT: Logo + Text */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="/logo.png"
                  alt="Kalpabriksha Logo"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-1">
              <h1 className="text-4xl lg:text-5xl font-black text-white">
                कल्पवृक्ष
              </h1>
              <p className="text-lg lg:text-xl font-bold text-red-400">
                Kalpabriksha.com
              </p>
              <p className="text-sm text-purple-200 font-medium">
                नेपाली स्वदेशीय ज्ञान सत्तामा समर्पित
              </p>
              <div className="flex items-center gap-3 text-purple-300 text-xs lg:text-sm">
                <span>मंसिर २३ सोमबार, १२:११ अपराह्न</span>
                <span>•</span>
                <span>काठमाडौं: २३.२ °C</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Advertisement Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="hidden lg:flex bg-white rounded-2xl shadow-xl border-2 border-purple-200 w-[800px] h-[100px] items-center justify-center"
          >
            <div className="text-center px-6">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                A PLACE WHERE LEARNING <span className="text-purple-700">NEVER STOPS</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <p className="text-lg text-gray-800 font-bold">
                  Scholars' Home Academy
                </p>
                <span className="text-gray-400">•</span>
                <p className="text-base text-gray-600 font-medium">
                  Samakhushi, Kathmandu
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Mobile Ad - Shows below on smaller screens */}
      <div className="lg:hidden px-6 pb-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border-2 border-purple-300">
          <p className="text-xl font-black text-gray-900">Scholars' Home Academy</p>
          <p className="text-sm text-gray-600 font-medium mt-1">Samakhushi, Kathmandu</p>
        </div>
      </div>
    </motion.header>
  );
}