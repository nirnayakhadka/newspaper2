// src/components/MiniNav.jsx - Enhanced Hollow Version
'use client';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { id: 1, name: 'मुख्य', path: '/home', end: true },
  { id: 2, name: 'समाचार', path: '/news' },
  { id: 3, name: 'कला र संस्कृति', path: '/artsandculture' },
  { id: 4, name: 'अन्तर्वार्ता', path: '/interview' },
  { id: 5, name: 'थप', path: '/more' },
];

export default function MiniNav() {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-[#5f0a0a] to-[#3f0000] ">
      <div className="relative max-w-screen-sm mx-auto px-4 py-4">
        {/* Hollow Container with Deep Inset Effect */}
        <div className="
          relative flex justify-center items-center
          bg-gradient-to-b from-[#450a0a] to-[#2c0808]
          rounded-3xl
          p-2
          border border-[#991b1b]/30
          shadow-[inset_0_2px_2px_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.3)]
        ">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-90" />
          
          {/* Navigation Items Container */}
          <div className="relative flex items-center gap-6 md:gap-8 lg:gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.end}
                className="relative group"
              >
                {({ isActive }) => (
                  <div className="relative px-2">
                    {/* Text */}
                    <span className={`
                      relative block
                      text-base md:text-lg font-medium
                      transition-all duration-300
                      ${isActive ? 'text-white font-semibold' : 'text-gray-300'}
                      group-hover:text-white
                    `}>
                      {item.name}
                    </span>

                    {/* Active Underline */}
                    {isActive && (
                      <motion.div
                        layoutId="hollowNavUnderline"
                        className="
                          absolute -bottom-1 left-0 right-0 
                          h-[2px] bg-white 
                          rounded-full
                          shadow-[0_0_8px_rgba(255,255,255,0.4)]
                        "
                        initial={false}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 25 
                        }}
                      />
                    )}

                    {/* Hover Underline (Inactive Only) */}
                    {!isActive && (
                      <motion.div
                        className="
                          absolute -bottom-1 left-0 right-0 
                          h-[2px] bg-white/50
                          rounded-full
                        "
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ 
                          scaleX: 1, 
                          opacity: 1,
                          transition: { 
                            duration: 0.25, 
                            ease: "easeOut" 
                          }
                        }}
                      />
                    )}
                  </div>
                )}
              </NavLink>
            ))}
          </div>

          {/* Subtle corner accents */}
         
        </div>
      </div>
    </div>
  );
}