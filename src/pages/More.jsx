import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function More() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sideNews = [
    { id: 1, title: "नयाँ बजेटमा कर छुटको घोषणा, उद्योगीहरू खुसी", category: "अर्थतन्त्र" },
    { id: 2, title: "काठमाडौंमा ट्राफिक जाम नयाँ रेकर्डमा", category: "यातायात" },
    { id: 3, title: "नेपालको पर्यटन क्षेत्रमा ४०% वृद्धि", category: "पर्यटन" }
  ];

  const mainNews = {
    title: "नेपाल स्टक एक्सचेन्जमा ऐतिहासिक उछाल, नेप्से ३००० अंक नाघ्यो",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=800&fit=crop",
    description: "आर्थिक सुधार र लगानीकर्ताको विश्वासले बजारमा ठूलो उत्साह, जलविद्युत र बैंकिङ क्षेत्र अग्रस्थानमा"
  };

  const rightSideNews = [
    { id: 4, title: "नेपालले टी-२० विश्वकपमा भारतलाई हरायो", category: "क्रिकेट" },
    { id: 5, title: "कोरोना खोपको तेस्रो डोज आजबाट सुरु", category: "स्वास्थ्य" },
    { id: 6, title: "दशैंको लागि टिकट बुकिङ खुला, अनलाइनबाट", category: "यातायात" }
  ];

  const featuredNews = {
    title: "नेपाल डिजिटल समिट २०८२: प्रविधिको नयाँ युग सुरु",
    image: "https://images.unsplash.com/photo-1519389950473-47ba27d9f5e88?w=1200&h=700&fit=crop",
    description: "नेपालमा पहिलो पटक अन्तर्राष्ट्रिय स्तरको टेक सम्मेलन, एआई, ब्लकचेन र स्टार्टअपहरूको जमघट",
    date: "मंसिर २४, २०८२",
    tags: ["प्रविधि", "स्टार्टअप", "एआई", "डिजिटल नेपाल"]
  };

  const carouselItems = [
    { id: 1, title: "हिमाल सफा अभियान २०८२: सगरमाथाबाट १० टन फोहोर संकलन", image: "https://images.unsplash.com/photo-1518914804697-6f5a661bec25?w=600&h=500&fit=crop", category: "वातावरण" },
    { id: 2, title: "पोखरामा अन्तर्राष्ट्रिय विमानस्थल सञ्चालनमा", image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248d?w=600&h=500&fit=crop", category: "हवाई यातायात" },
    { id: 3, title: "नेपाली चलचित्र 'कबड्डी ५' ले बक्स अफिसमा कीर्तिमान", image: "https://images.unsplash.com/photo-1489599460483-0c3b9b7727b3?w=600&h=500&fit=crop", category: "मनोरञ्जन" },
    { id: 4, title: "नेपाल टेलिकमले ५जी सेवा विस्तार गर्ने", image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d21?w=600&h=500&fit=crop", category: "प्रविधि" },
    { id: 5, title: "लुम्बिनीमा बुद्ध जयन्तीको भव्य तयारी", image: "https://images.unsplash.com/photo-1588668214407-6e9d2e397641?w=600&h=500&fit=crop", category: "संस्कृति" },
    { id: 6, title: "नेपालको अर्थतन्त्र ७.२% ले वृद्धि हुने प्रक्षेपण", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop", category: "अर्थतन्त्र" }
  ];

  const extraMiddleNews = [
    { title: "मेलम्चीको पानी काठमाडौंमा वितरण सुरु,", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=500&fit=crop", category: "राष्ट्रिय गौरव" },
    { title: "नेपालको विद्युत निर्यात भारततर्फ १००० मेगावाट", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop", category: "ऊर्जा" }
  ];

  const nextSlide = () => setCurrentSlide(prev => (prev + 3 >= carouselItems.length ? 0 : prev + 3));
  const prevSlide = () => setCurrentSlide(prev => (prev - 3 < 0 ? Math.max(0, carouselItems.length - 3) : prev - 3));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white py-6 shadow-2xl">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center tracking-wider">बिबिध खबर</h1>
          <p className="text-center mt-2 text-indigo-100 text-lg">तपाईंको विश्वसनीय समाचार स्रोत</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 lg:py-10">
        {/* Section 1: शीर्ष समाचार */}
        <section className="mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-5">
              {sideNews.map(news => (
                <div key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                  <div className="p-4 lg:p-5">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{news.category}</span>
                    <h3 className="mt-2 text-base lg:text-lg font-bold text-gray-800 leading-tight">{news.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Center - Main + Extra Cards */}
            <div className="lg:col-span-6 space-y-6">
              {/* Main Big News */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden group cursor-pointer">
                <img src={mainNews.image} alt={mainNews.title} className="w-full h-56 lg:h-90 object-cover" />
                <div className="p-5 lg:p-6">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">बजार</span>
                  <h2 className="mt-3 text-xl lg:text-2xl font-bold text-gray-900 leading-tight">{mainNews.title}</h2>
                  <p className="mt-3 text-gray-700 text-sm lg:text-base leading-relaxed hidden sm:block">{mainNews.description}</p>
                </div>
              </div>

              {/* Two Extra Middle Cards - Mobile: Full width, Desktop: Side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                {extraMiddleNews.map((item, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
                    <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
                    <div className="p-4 lg:p-5">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{item.category}</span>
                      <h3 className="mt-2 text-lg font-bold text-gray-800 leading-tight">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-5">
              {rightSideNews.map(news => (
                <div key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
                  <div className="h-40 bg-gradient-to-br from-emerald-500 to-teal-600"></div>
                  <div className="p-4 lg:p-5">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">{news.category}</span>
                    <h3 className="mt-2 text-base lg:text-lg font-bold text-gray-800 leading-tight">{news.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: विशेष + Carousel */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Ads Sidebar (Hidden on mobile or shown at bottom) */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-20 space-y-6">
                <div className="bg-amber-50 border-4 border-amber-400 rounded-2xl p-5 text-center shadow-lg">
                  <p className="text-lg font-bold text-amber-800 mb-3">विज्ञापन</p>
                  <div className="bg-white rounded-xl p-10 shadow-inner">
                    <p className="text-gray-600 text-xl font-bold">यहाँ तपाईंको विज्ञापन</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-white text-center shadow-xl">
                  <p className="text-xl font-bold">विशेष अफर!</p>
                  <p className="mt-2 text-3xl font-black">५०% छुट</p>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-right">विशेष समाचार</h2>

              {/* Featured Big Card */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-10">
                <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-64 lg:h-96 object-cover" />
                <div className="p-6 lg:p-10 bg-gradient-to-b from-gray-50 to-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">विशेष कभर स्टोरी</span>
                    <div className="text-right">
                      <p className="text-gray-600 font-medium">{featuredNews.date}</p>
                      <div className="flex gap-2 mt-2 justify-end flex-wrap">
                        {featuredNews.tags.map((tag, i) => (
                          <span key={i} className="text-xs lg:text-sm text-indigo-600 font-semibold">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{featuredNews.title}</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">{featuredNews.description}</p>
                </div>
              </div>

              {/* Trending Carousel - Mobile: Horizontal Scroll */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">ट्रेन्डिङ समाचार</h3>

                {/* Mobile: Horizontal Scroll */}
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
                  {carouselItems.map(item => (
                    <div key={item.id} className="w-[80vw] md:w-full flex-shrink-0 snap-center md:snap-normal bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer">
                      <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                      <div className="p-5">
                        <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">{item.category}</span>
                        <h3 className="mt-3 text-lg font-bold text-gray-800 leading-tight">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Navigation (Hidden on mobile) */}
                <div className="hidden md:flex justify-center items-center gap-4 mt-8">
                  <button onClick={prevSlide} className="bg-white rounded-full p-3 shadow-xl hover:bg-gray-100">
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                  <div className="flex gap-3">
                    {Array.from({ length: Math.ceil(carouselItems.length / 3) }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i * 3)}
                        className={`h-3 rounded-full transition-all ${currentSlide === i * 3 ? 'w-12 bg-indigo-600' : 'w-3 bg-gray-300'}`}
                      />
                    ))}
                  </div>
                  <button onClick={nextSlide} className="bg-white rounded-full p-3 shadow-xl hover:bg-gray-100">
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Optional: Hide scrollbar but keep functionality */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default More;