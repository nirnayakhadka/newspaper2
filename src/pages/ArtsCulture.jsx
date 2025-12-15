// src/pages/ArtsCulture.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import Simple3DCarousel from '../components/Simple3DCarousel';

const API_BASE = 'http://localhost:5000/api/artsandculture';

function ArtsCulture() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [slide1, setSlide1] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const marqueeRef2 = useRef(null);
  const marqueeRef3 = useRef(null);

  // Fetch all arts & culture items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(API_BASE);
        // Sort by date descending (latest first)
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setItems(sorted);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('डाटा लोड गर्न असफल भयो। कृपया पछि फेरि प्रयास गर्नुहोस्।');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Responsive visible cards
  const updateVisibleCards = () => {
    if (window.innerWidth >= 1280) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  useEffect(() => {
    const handleResize = () => {
      const newVisible = updateVisibleCards();
      setVisibleCards(newVisible);
      setSlide1(prev => Math.min(prev, Math.max(0, items.slice(3).length - newVisible))); // adjust after data load
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  // Auto slide for first carousel (after featured & top 3)
  useEffect(() => {
    if (items.length < 4 || loading) return;

    const timer = setInterval(() => {
      setSlide1(prev => {
        const data = items.slice(3); // skip first 3 (featured + top3D)
        const max = data.length - visibleCards;
        return prev >= max ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [items, visibleCards, loading]);

  // Marquee animation for section 2 & 3
  useEffect(() => {
    if (items.length === 0 || loading) return;

    const animate = (ref, startIndex) => {
      if (!ref.current) return;
      let pos = 0;
      const speed = 0.5;
      const cardWidth = 416;

      const data = items.slice(startIndex);

      const loop = () => {
        if (!ref.current || ref.current.dataset.paused === 'true') {
          requestAnimationFrame(loop);
          return;
        }
        pos -= speed;
        if (Math.abs(pos) >= data.length * cardWidth) pos = 0;
        ref.current.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(loop);
      };
      loop();
    };

    // Second section: after first 6 items
    animate(marqueeRef2, 6);
    // Third section: after first 12 items (or repeat earlier if less data)
    animate(marqueeRef3, items.length > 12 ? 12 : 6);
  }, [items, loading]);

  const moveMarquee = (ref, direction) => {
    if (!ref.current) return;
    const cardWidth = 416;
    const matrix = getComputedStyle(ref.current).transform;
    const current = matrix === 'none' ? 0 : parseFloat(matrix.split(',')[4]) || 0;
    const target = direction === 'left' ? current + cardWidth : current - cardWidth;

    ref.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    ref.current.style.transform = `translateX(${target}px)`;

    // Reset transition after animation
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = 'none';
    }, 800);
  };

  // Featured Card Component
  const FeaturedCard = ({ item }) => {
    if (!item) return null;
    return (
      <div className="mb-20 group cursor-pointer">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700">
          <div className="relative h-96 md:h-[520px] overflow-hidden">
            <img
              src={`http://localhost:5000/${item.photo}`}
              alt={item.title_np}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-10 text-white">
              <span className="inline-block bg-red-600 px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">
                विशेष
              </span>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-2xl">
                {item.title_np}
              </h2>
            </div>
          </div>
          <div className="p-8 md:p-10 text-center bg-gradient-to-b from-white to-gray-50">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {item.subtitle_np || item.subtitle_en || 'यो कार्यक्रममा सहभागी हुन नछुटाउनुहोस्।'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Responsive Carousel Component
  const SmoothCarousel = ({ data, isFirst, slide, setSlide, marqueeRef }) => {
    if (data.length === 0) return <p className="text-center py-10 text-gray-500">कुनै कार्यक्रम उपलब्ध छैन।</p>;

    if (isFirst) {
      const maxSlides = data.length - visibleCards;

      return (
        <div className="relative group">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${slide * (100 / visibleCards)}%)` }}
            >
              {data.map(item => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <img
                        src={`http://localhost:5000/${item.photo}`}
                        alt={item.title_np}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {item.title_np}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                          {item.subtitle_np || item.subtitle_en || '...'}
                        </p>
                      </div>
                      <span className="text-red-600 font-bold text-sm mt-4 inline-block hover:text-red-700 transition">
                        थप पढ्नुहोस् →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => setSlide(p => (p <= 0 ? maxSlides : p - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => setSlide(p => (p >= maxSlides ? 0 : p + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dots */}
          {maxSlides > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxSlides + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === slide ? 'bg-red-600 w-10' : 'bg-gray-300 w-2'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    // Marquee Style Carousel (infinite scroll)
    const duplicatedData = [...data, ...data];
    return (
      <div
        className="relative group"
        onMouseEnter={() => marqueeRef.current && (marqueeRef.current.dataset.paused = 'true')}
        onMouseLeave={() => marqueeRef.current && (marqueeRef.current.dataset.paused = 'false')}
      >
        <button
          onClick={() => moveMarquee(marqueeRef, 'left')}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-5 rounded-full shadow-2xl hover:scale-115 transition-all z-20 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={() => moveMarquee(marqueeRef, 'right')}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-5 rounded-full shadow-2xl hover:scale-115 transition-all z-20 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={40} />
        </button>

        <div className="overflow-hidden rounded-3xl">
          <div ref={marqueeRef} className="flex gap-8" style={{ willChange: 'transform' }}>
            {duplicatedData.map((item, i) => (
              <div key={`${item.id}-${i}`} className="w-96 flex-shrink-0">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={`http://localhost:5000/${item.photo}`}
                      alt={item.title_np}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {item.title_np}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {item.subtitle_np || item.subtitle_en || '...'}
                    </p>
                    <span className="text-red-600 font-bold text-sm mt-4 inline-block hover:text-red-700 transition">
                      थप पढ्नुहोस् →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-gray-600">लोड हुँदै...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-2xl text-red-600 text-center px-6">{error}</div>
      </div>
    );
  }

  // Split data into sections
  const featuredItem = items[0];
  const top3DItems = items.slice(0, 3).map(item => ({
    id: item.id,
    title: item.title_np,
    image: `http://localhost:5000/${item.photo}`,
    description: item.subtitle_np || item.subtitle_en || 'विवरण उपलब्ध छैन',
    tags: item.tag_np ? [item.tag_np] : ['कला', 'संस्कृति'],
  }));

  const carousel1Data = items.slice(3, 3 + 12); // after top 3
  const carousel2Data = items.slice(6); // more overlap for marquee
  const carousel3Data = items.slice(12) || items.slice(6); // fallback

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-20 lg:py-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">कला र संस्कृति</h1>
          <p className="text-2xl text-gray-600">नेपालको सांस्कृतिक धरोहर र समकालीन कलाको सङ्गम</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          {featuredItem && <FeaturedCard item={featuredItem} />}
          
          <div className="my-24">
            <Simple3DCarousel items={top3DItems} />
          </div>

          <div>
            <h3 className="text-4xl font-bold text-right mb-12 pr-8 border-r-8 border-red-600">
              थप कार्यक्रमहरू
            </h3>
            <SmoothCarousel
              data={carousel1Data}
              isFirst={true}
              slide={slide1}
              setSlide={setSlide1}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {items[6] && <FeaturedCard item={items[6]} />}
          <SmoothCarousel data={carousel2Data} isFirst={false} marqueeRef={marqueeRef2} />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {items[12] && <FeaturedCard item={items[12]} />}
          <SmoothCarousel data={carousel3Data} isFirst={false} marqueeRef={marqueeRef3} />
        </div>
      </section>
    </div>
  );
}

export default ArtsCulture;