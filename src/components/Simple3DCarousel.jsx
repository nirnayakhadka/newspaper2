// src/components/Simple3DCarousel.jsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Simple3DCarousel = ({ items }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="relative w-full h-[520px] bg-transparent overflow-hidden rounded-2xl">
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
        {items.map((item, i) => {
          const diff = ((i - index + items.length) % items.length) - Math.floor(items.length / 2);
          let style = { opacity: 0, transform: "translateX(0) scale(0.8)", zIndex: 1 };

          if (diff === 0) {
            style = { opacity: 1, transform: "translateX(0%) translateZ(100px) scale(1.1)", zIndex: 30 };
          } else if (diff === 1 || diff === -2) {
            style = { opacity: 0.7, transform: "translateX(60%) translateZ(0px) scale(0.9)", zIndex: 20 };
          } else if (diff === -1 || diff === 2) {
            style = { opacity: 0.7, transform: "translateX(-60%) translateZ(0px) scale(0.9)", zIndex: 20 };
          }

          return (
            <div
              key={item.id}
              className="absolute transition-all duration-700 ease-out"
              style={{ ...style, transformStyle: "preserve-3d" }}
            >
              <div className="w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border">
                <div
                  className="h-64 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <h3 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl z-40">
        <ChevronLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl z-40">
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-gray-800 w-10" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Simple3DCarousel;