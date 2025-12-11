'use client';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { id: 1, name: 'मुख्य', path: '/home', end: true },
  { id: 2, name: 'समाचार', path: '/news' },
  { id: 3, name: 'कला र संस्कृति', path: '/artsandculture' },
  { id: 4, name: 'अन्तर्वार्ता', path: '/interview' },
  { id: 5, name: 'थप', path: '/more' },
];

export default function MiniNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-gradient-to-b from-[#5f0a0a] to-[#3f0000]">
        <div className="relative max-w-screen-sm mx-auto px-4 py-4">

          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <div className="
              relative flex justify-center items-center
              bg-gradient-to-b from-[#450a0a] to-[#2c0808]
              rounded-3xl p-2
              border border-[#991b1b]/30
              shadow-[inset_0_2px_2px_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.3)]
            ">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-90" />

              <div className="relative flex items-center gap-6 md:gap-8 lg:gap-10">
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    end={item.end}
                    className="relative group"
                    onClick={() => setIsOpen(false)}
                  >
                    {({ isActive }) => (
                      <div className="relative px-2">
                        <span className={`
                          block text-base md:text-lg font-medium transition-all duration-300
                          ${isActive ? 'text-white font-semibold' : 'text-gray-300'}
                          group-hover:text-white
                        `}>
                          {item.name}
                        </span>

                        {/* Shared Animated Underline */}
                        {isActive && (
                          <motion.div
                            layoutId="hollowNavUnderline"
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                        )}

                        {/* Hover line for inactive items */}
                        {!isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white/50 rounded-full"
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileHover={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                          />
                        )}
                      </div>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="
              relative flex justify-between items-center
              bg-gradient-to-b from-[#450a0a] to-[#2c0808]
              rounded-3xl p-3 px-5
              border border-[#991b1b]/30
              shadow-[inset_0_2px_2px_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.3)]
            ">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-90" />

              <span className="relative text-white font-semibold text-lg">मेनु</span>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-10 text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="
                  absolute left-4 right-4 mt-2
                  bg-gradient-to-b from-[#450a0a] to-[#2c0808]
                  rounded-2xl border border-[#991b1b]/30
                  shadow-[inset_0_2px_2px_rgba(0,0,0,0.9),0_6px_12px_rgba(0,0,0,0.5)]
                  overflow-hidden
                "
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-90" />

                <div className="relative py-2">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      end={item.end}
                      onClick={() => setIsOpen(false)}
                    >
                      {({ isActive }) => (
                        <div className={`
                          px-6 py-3 text-lg font-medium transition-all duration-200 flex items-center
                          ${isActive 
                            ? 'text-white bg-white/10 border-l-4 border-white' 
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                          }
                        `}>
                          <span className="flex-1">{item.name}</span>
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="ml-auto w-1.5 h-8 bg-white rounded-l-full"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                        </div>
                      )}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}