import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Calendar, User, Eye, ChevronRight, TrendingUp, Bookmark, Share2, Play, Headphones, Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Interview() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  // Base URL for images (adjust if your backend serves from different port/domain)
// Your backend URL - change if deployed or running on different port
const API_BASE = 'http://localhost:5000';
const IMAGE_BASE = `${API_BASE}`;

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/interviews`);
        if (!response.ok) throw new Error('Failed to fetch interviews');
        const data = await response.json();

        // Sort by date DESC (already done in backend, but just in case)
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setInterviews(sorted);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  // Derived data
  const featuredInterview = interviews[0] || null; // Most recent = featured
  const latestInterviews = interviews.slice(1, 7); // Next 6 for latest grid
  const carouselInterviews = interviews.slice(3, 9); // For special carousel
  const popularInterviews = interviews
    .sort((a, b) => parseInt(b.views || 0) - parseInt(a.views || 0))
    .slice(0, 4); // Top 4 by views

  // Format date to Nepali style (you can improve this later)
  const formatNepaliDate = (dateString) => {
    const date = new Date(dateString);
    // Simple fallback - you can use nepali-date-converter library later
    return date.toLocaleDateString('ne-NP', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-600">लोड हुँदै...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">त्रुटि: {error}</div>
      </div>
    );
  }

  if (!featuredInterview) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-slate-600">कुनै अन्तर्वार्ता उपलब्ध छैन।</div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        style={{ scale: scaleProgress, opacity: opacityProgress }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content */}
          <main className="lg:col-span-8 space-y-12">

            {/* Featured Interview */}
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3 mb-2">
                  <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </motion.div>
                  विशेष अन्तर्वार्ता
                </h2>
                <p className="text-slate-600">हालैका महत्वपूर्ण व्यक्तित्वहरूसँगको कुराकानी</p>
              </div>

              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 hover:shadow-3xl transition-all duration-500 group"
              >
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 8 }}
                    whileHover={{ scale: 1.05 }}
                    src={`${IMAGE_BASE}/${featuredInterview.image}`}
                    alt={featuredInterview.person}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      टप स्टोरी
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-sm font-bold rounded-full">
                        {featuredInterview.category || 'अन्तर्वार्ता'}
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                      {featuredInterview.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatNepaliDate(featuredInterview.date)}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredInterview.duration || 'अज्ञात'}
                      </span>
                      <span className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {featuredInterview.views || '0'} हेराइ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900">{featuredInterview.person}</h4>
                      <p className="text-slate-600">{featuredInterview.position}</p>
                    </div>
                  </div>

                  <p className="text-slate-700 text-lg leading-relaxed mb-6">
                    {featuredInterview.excerpt || featuredInterview.description?.slice(0, 200) + '...'}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                        <Play className="w-5 h-5" />
                        भिडियो हेर्नुहोस्
                      </motion.button>

                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all">
                        <Headphones className="w-5 h-5" />
                        सुन्नुहोस्
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button whileHover={{ scale: 1.1, rotate: 5 }} className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <Bookmark className="w-5 h-5 text-slate-600" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.1, rotate: -5 }} className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors">
                        <Share2 className="w-5 h-5 text-slate-600" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </section>

            {/* Special Presentation Carousel */}
            <section className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">विशेष प्रस्तुति</h3>
                  <p className="text-slate-600">अन्य महत्वपूर्ण अन्तर्वार्ताहरू</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => swiperRef.current?.slidePrev()} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button onClick={() => swiperRef.current?.slideNext()} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 transition-colors">
                    <ArrowRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>

              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="pb-8"
              >
                {carouselInterviews.map((item) => (
                  <SwiperSlide key={item.id}>
                    <motion.article whileHover={{ y: -4 }} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 group cursor-pointer h-full flex flex-col">
                      <div className="relative h-40 overflow-hidden">
                        <img src={`${IMAGE_BASE}/${item.image}`} alt={item.person} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 text-slate-800 text-xs font-semibold rounded-full">
                            {item.category || 'अन्तर्वार्ता'}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center justify-between text-white text-xs">
                            <span className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> {item.duration || '?? मिनेट'}
                            </span>
                            <span className="flex items-center gap-1 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              <Eye className="w-3 h-3" /> {item.views || '0'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-semibold text-slate-900 text-base mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {item.title}
                        </h4>
                        <div className="mt-auto pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full flex items-center justify-center">
                              <User className="w-3.5 h-3.5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-sm truncate">{item.person}</p>
                              <p className="text-xs text-slate-500 truncate">{item.position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>

            {/* Latest Interviews Grid */}
            <section>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">नवीनतम अन्तर्वार्ताहरू</h3>
                <p className="text-slate-600">हालैका महत्वपूर्ण अन्तर्वार्ताहरू</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {latestInterviews.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={`${IMAGE_BASE}/${item.image}`}
                        alt={item.person}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 text-slate-800 text-xs font-semibold rounded-full">
                          {item.category || 'अन्तर्वार्ता'}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                          <Clock className="w-3 h-3" /> {item.duration || '?? मिनेट'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/20 backdrop-blur-sm text-white text-xs rounded-full">
                          <Eye className="w-3 h-3" /> {item.views || '0'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 text-sm truncate">{item.person}</p>
                          <p className="text-xs text-slate-500 truncate">{item.position}</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                        {item.excerpt || item.description?.slice(0, 100) + '...'}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatNepaliDate(item.date)}
                        </span>
                        <motion.button whileHover={{ x: 3 }} className="text-blue-600 font-medium text-xs hover:text-blue-700 flex items-center gap-1">
                          हेर्नुहोस् <ChevronRight className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Popular Interviews */}
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">लोकप्रिय अन्तर्वार्ता</h3>
                      <p className="text-sm text-slate-600">धेरै हेरिएका अन्तर्वार्ताहरू</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {popularInterviews.map((item, index) => (
                    <motion.article key={item.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group cursor-pointer">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-all duration-300">
                        <div className="flex-shrink-0 relative">
                          <div className="w-14 h-14 rounded-lg overflow-hidden shadow">
                            <img src={`${IMAGE_BASE}/${item.image}`} alt={item.person} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          {index < 3 && (
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${
                              index === 0 ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white' :
                              index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-600 text-white' :
                              'bg-gradient-to-br from-amber-700 to-amber-900 text-white'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full">
                              {item.category || 'अन्तर्वार्ता'}
                            </span>
                          </div>
                          <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-600 truncate">{item.person}</p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span className="flex items-center gap-0.5">
                                <Eye className="w-2.5 h-2.5" /> {item.views || '0'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Quote & Stats (static for now) */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-blue-900 to-emerald-900 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Quote className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">आजको उक्ति</h4>
                    <p className="text-xs opacity-90">विशेष व्यक्तित्वबाट</p>
                  </div>
                </div>
                <blockquote className="text-sm italic leading-relaxed mb-4">
                  "सफलताको लागि केवल कठोर परिश्रम मात्रै होइन, सही दिशा र दृढ इच्छाशक्ति पनि आवश्यक हुन्छ।"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">डा. युवराज खतिवडा</p>
                    <p className="text-xs opacity-90">अर्थमन्त्री, नेपाल</p>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-5">
                <h4 className="text-lg font-bold text-slate-900 mb-5">तथ्याङ्क</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">कुल अन्तर्वार्ता</span>
                    <span className="text-xl font-bold text-blue-600">{interviews.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">औसत हेराइ</span>
                    <span className="text-xl font-bold text-purple-600">~9.5k</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </>
  );
}