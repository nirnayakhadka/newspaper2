// src/pages/ArtsCulture.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Simple3DCarousel from '../components/Simple3DCarousel';

function ArtsCulture() {
  const [slide1, setSlide1] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const marqueeRef2 = useRef(null);
  const marqueeRef3 = useRef(null);

  // ====================== ALL DATA (FULLY DEFINED) ======================
  const carouselData1 = [
    { id: 1, title: 'समकालीन कला प्रदर्शनी २०८२', image: 'https://images.unsplash.com/photo-1544966490-09079e2b7c3a?w=800', contents: 'काठमाडौँमा विश्वस्तरीय कलाकारहरूको संयुक्त प्रदर्शनी आयोजना हुँदै।' },
    { id: 2, title: 'शास्त्रीय संगीत महोत्सव', image: 'https://images.unsplash.com/photo-1511671781617-2d27d07e31a2?w=800', contents: 'प्रख्यात सङ्गीतकारहरूको साझेदारीमा तीनदिने शास्त्रीय संगीत महोत्सव।' },
    { id: 3, title: 'नाटक मञ्चन: अभिज्ञान शाकुन्तलम्', image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800', contents: 'कालिदासको प्रसिद्ध नाटकको आधुनिक मञ्चन, मण्डला थिएटर।' },
    { id: 4, title: 'आधुनिक नृत्य प्रदर्शन', image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=w=800', contents: 'नेपाली समकालीन नृत्यको नयाँ प्रयोग, नेपाल नाचघरमा।' },
    { id: 5, title: 'काठमाडौँ अन्तर्राष्ट्रिय चलचित्र महोत्सव', image: 'https://images.unsplash.com/photo-1489599462969-4f30bcd22b2c?w=800', contents: 'विश्वभरका स्वतन्त्र चलचित्रहरूको प्रदर्शनी र छलफल।' },
    { id: 6, title: 'कविता वाचन साँझ', image: 'https://images.unsplash.com/photo-1518614369273-5d86f3d4e050?w=800', contents: 'नेपाली समकालीन कविका नयाँ रचनाहरूको जीवन्त प्रस्तुति।' },
  ];

  const carouselData2 = [
    { id: 7, title: 'फोटो प्रदर्शनी: शहरको कथा', image: 'https://images.unsplash.com/photo-1517230733600-6293f879a2c9?w=800', contents: 'काठमाडौँको परिवर्तनशील जीवनलाई क्याप्चर गरेका दुर्लभ तस्बिरहरू।' },
    { id: 8, title: 'ज्याज साँझ दरबारमार्ग', image: 'https://images.unsplash.com/photo-1516280440614-37939bb6c810?w=800', contents: 'नेपालका उत्कृष्ट ज्याज ब्यान्डहरूको साझा प्रस्तुति।' },
    { id: 9, title: 'ओपेरा: कार्मेन', image: 'https://images.unsplash.com/photo-1518562917826-29a07f2e1e41?w=800', contents: 'नेपाल एकेडेमीमा विश्वप्रसिद्ध ओपेरा कार्मेनको पूर्ण मञ्चन।' },
    { id: 10, title: 'सडक कला महोत्सव', image: 'https://images.unsplash.com/photo-1605721911524-4d03b7f6e08e?w=800', contents: 'पाटन दरबार क्षेत्रमा अन्तर्राष्ट्रिय सडक कलाकारहरूको जमघट।' },
    { id: 11, title: 'ब्यालेट: द नटक्र्याकर', image: 'https://images.unsplash.com/photo-1551887373-35a1b9e31e08?w=800', contents: 'क्रिसमसको अवसरमा क्लासिक ब्यालेटको विशेष प्रस्तुति।' },
    { id: 12, title: 'विश्व सङ्गीत महोत्सव', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', contents: '२५ देशका सङ्गीतकारहरूको साझा मञ्च, भृकुटीमण्डप।' },
  ];

  const carouselData3 = [
    { id: 13, title: 'मूर्तिकला प्रदर्शनी', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fcbf?w=800', contents: 'नेपाली समकालीन मूर्तिकारहरूको संयुक्त प्रदर्शनी, सिद्दार्थ आर्ट ग्यालरी।' },
    { id: 14, title: 'लोक सांस्कृतिक महोत्सव', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', contents: 'नेपालका १० जातिका परम्परागत नृत्य र सङ्गीतको जीवन्त प्रस्तुति।' },
    { id: 15, title: 'वातावरणीय कला वृत्तचित्र', image: 'https://images.unsplash.com/photo-1485846299777-2e7f3dc74980?w=800', contents: 'हिमालदेखि तराईसम्मको पर्यावरणीय कलाको खोजी।' },
    { id: 16, title: 'नयाँ पुस्तक लोकार्पण', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f3abd8c?w=800', contents: 'विजय मल्ल स्मृति पुरस्कार विजेता कृतिको भव्य लोकार्पण।' },
    { id: 17, title: 'अमूर्त चित्रकला प्रदर्शनी', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b159?w=800', contents: 'नेपाली अमूर्त कलाकारहरूको सशक्त उपस्थिति।' },
    { id: 18, title: 'विश्व नृत्य दिवस विशेष', image: 'https://images.unsplash.com/photo-1603195523826-3f3a2e0f0e38?w=800', contents: 'विश्वभरका नृत्य शैलीको एकै मञ्चमा प्रस्तुति।' },
  ];

  const top3D_1 = [
    { id: 1, title: "समकालीन कला प्रदर्शनी २०८२", image: "https://images.unsplash.com/photo-1544966490-09079e2b7c3a?w=800", description: "काठमाडौँमा विश्वस्तरीय कलाकारहरूको संयुक्त प्रदर्शनी", tags: ["कला", "प्रदर्शनी", "काठमाडौँ"] },
    { id: 2, title: "शास्त्रीय संगीत महोत्सव", image: "https://images.unsplash.com/photo-1511671781617-2d27d07e31a2?w=800", description: "तीनदिने भव्य सङ्गीत उत्सव", tags: ["सङ्गीत", "शास्त्रीय", "महोत्सव"] },
    { id: 3, title: "नाटक मञ्चन", image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800", description: "अभिज्ञान शाकुन्तलम् - आधुनिक प्रस्तुति", tags: ["नाटक", "मञ्चन", "कालिदास"] },
  ];

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
      setSlide1(prev => Math.min(prev, Math.max(0, carouselData1.length - newVisible)));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide1(prev => {
        const max = carouselData1.length - visibleCards;
        return prev >= max ? 0 : prev + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [visibleCards]);

  // Marquee animation
  useEffect(() => {
    const animate = (ref, items) => {
      if (!ref.current) return;
      let pos = 0;
      const speed = 0.5;
      const cardWidth = 416;

      const loop = () => {
        if (!ref.current || ref.current.dataset.paused === 'true') {
          requestAnimationFrame(loop);
          return;
        }
        pos -= speed;
        if (Math.abs(pos) >= items.length * cardWidth) pos = 0;
        ref.current.style.transform = `translateX(${pos}px)`;
        requestAnimationFrame(loop);
      };
      loop();
    };

    animate(marqueeRef2, carouselData2);
    animate(marqueeRef3, carouselData3);
  }, []);

  const moveMarquee = (ref, direction) => {
    if (!ref.current) return;
    const cardWidth = 416;
    const matrix = getComputedStyle(ref.current).transform;
    const current = matrix === 'none' ? 0 : parseFloat(matrix.split(',')[4]) || 0;
    const target = direction === 'left' ? current + cardWidth : current - cardWidth;

    ref.current.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    ref.current.style.transform = `translateX(${target}px)`;
  };

  // Featured Card Component
  const FeaturedCard = ({ item }) => (
    <div className="mb-20 group cursor-pointer">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700">
        <div className="relative h-96 md:h-[520px] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 p-8 md:p-10 text-white">
            <span className="inline-block bg-red-600 px-6 py-3 rounded-full text-sm font-bold mb-4 shadow-lg">विशेष</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-2xl">{item.title}</h2>
          </div>
        </div>
        <div className="p-8 md:p-10 text-center bg-gradient-to-b from-white to-gray-50">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">{item.contents}</p>
        </div>
      </div>
    </div>
  );

  // Responsive Carousel
  const SmoothCarousel = ({ data, isFirst, slide, setSlide, marqueeRef }) => {
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
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                          {item.contents}
                        </p>
                      </div>
                      <span className="text-red-600 font-bold text-sm mt-4 inline-block hover:text-red-700 transition">
                        थप पढ्नुहोस्
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={() => setSlide(p => p <= 0 ? maxSlides : p - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={() => setSlide(p => p >= maxSlides ? 0 : p + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-3 sm:p-4 rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100 z-10"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dots */}
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
        </div>
      );
    }

    // Marquee Carousel
    return (
      <div
        className="relative group"
        onMouseEnter={() => marqueeRef.current && (marqueeRef.current.dataset.paused = 'true')}
        onMouseLeave={() => marqueeRef.current && (marqueeRef.current.dataset.paused = 'false')}
      >
        <button onClick={() => moveMarquee(marqueeRef, 'left')} className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-5 rounded-full shadow-2xl hover:scale-115 transition-all z-20 opacity-0 group-hover:opacity-100">
          <ChevronLeft size={40} />
        </button>
        <button onClick={() => moveMarquee(marqueeRef, 'right')} className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur p-5 rounded-full shadow-2xl hover:scale-115 transition-all z-20 opacity-0 group-hover:opacity-100">
          <ChevronRight size={40} />
        </button>

        <div className="overflow-hidden rounded-3xl">
          <div ref={marqueeRef} className="flex gap-8" style={{ willChange: 'transform' }}>
            {[...data, ...data].map((item, i) => (
              <div key={`${item.id}-${i}`} className="w-96 flex-shrink-0">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="h-64 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{item.contents}</p>
                    <span className="text-red-600 font-bold text-sm mt-4 inline-block hover:text-red-700 transition">थप पढ्नुहोस्</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      <section className="py-20 lg:py-32">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6">कला र संस्कृति</h1>
          <p className="text-2xl text-gray-600">नेपालको सांस्कृतिक धरोहर र समकालीन कलाको सङ्गम</p>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <FeaturedCard item={carouselData1[0]} />
          <div className="my-24">
            <Simple3DCarousel items={top3D_1} />
          </div>

          <div>
            <h3 className="text-4xl font-bold text-right mb-12 pr-8 border-r-8 border-red-600">थप कार्यक्रमहरू</h3>
            <SmoothCarousel data={carouselData1} isFirst={true} slide={slide1} setSlide={setSlide1} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedCard item={carouselData2[0]} />
          <SmoothCarousel data={carouselData2} isFirst={false} marqueeRef={marqueeRef2} />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedCard item={carouselData3[0]} />
          <SmoothCarousel data={carouselData3} isFirst={false} marqueeRef={marqueeRef3} />
        </div>
      </section>

    </div>
  );
}

export default ArtsCulture;