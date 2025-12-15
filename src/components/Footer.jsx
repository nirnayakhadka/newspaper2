'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-t from-slate-900 via-purple-950 to-purple-950    text-white border-t border-purple-800"
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Left: Logo + Contact */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="Kalpabriksha Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="text-3xl font-black text-white">कल्पवृक्ष</h3>
                <p className="text-red-400 font-bold">Kalpabriksha.com</p>
              </div>
            </div>
            
            {/* Tagline */}
            <p className="text-purple-200 text-sm">
              नेपाली स्वदेशीय ज्ञान सत्तामा समर्पित
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-purple-200 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>9851097613 / 9851037243</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>kalpabriksha2024@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Center: Links */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <h4 className="text-white font-bold mb-4">Our Team</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition">टीमबारे</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">For advertisement contact</h4>
              <p className="text-purple-200 text-sm">9851037243</p>
            </div>
          </div>

          {/* Right: Address + QR + Social */}
          <div className="space-y-6">
            {/* Address */}
            <div>
              <h4 className="text-white font-bold mb-3">ठेगाना</h4>
              <p className="text-purple-200 text-sm">
                अनामनगर-२९, काठमाडौं<br />
                बागमती प्रदेश, नेपाल
              </p>
              <p className="text-purple-200 text-xs mt-2">
                अध्यक्ष / प्रधान सम्पादक - सूर्यबहादुर माझिन
              </p>
            </div>

            {/* QR Code */}
            <div>
              <img 
                src="/qr-code.png" 
                alt="QR Code" 
                className="w-24 h-24 bg-white p-2 rounded"
              />
            </div>

            {/* Social Media */}
            <div>
              <p className="text-white font-bold mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-purple-800 text-center">
          <p className="text-purple-300 text-sm">
            © 2025 कल्पवृक्ष.com. Nepali Digital Newspaper All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}