import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Clock, Calendar, TrendingUp, 
  Bookmark, Share2, Eye, User, Briefcase, Target, Globe, 
  Headphones, Zap 
} from 'lucide-react';
import axios from 'axios';

export default function Mukhya() {
  const scrollContainerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [mainNews, setMainNews] = useState(null);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [secondaryNews, setSecondaryNews] = useState([]);
  const [carouselNews, setCarouselNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);

  const API_BASE = 'http://localhost:5000/api/main'; // Change port if needed

  // Fetch all news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}`);
        let articles = res.data;

        if (!articles || articles.length === 0) {
          setError("कुनै समाचार उपलब्ध छैन।");
          setLoading(false);
          return;
        }

        // Sort by date (latest first)
        articles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Helper: Format Nepali date and time ago
        const formatNepaliDate = (dateStr) => {
          return new Date(dateStr).toLocaleDateString('ne-NP');
        };

        const timeAgo = (dateStr) => {
          const now = new Date();
          const past = new Date(dateStr);
          const diffMs = now - past;
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMs / 3600000);
          const diffDays = Math.floor(diffMs / 86400000);

          if (diffMins < 60) return `${diffMins} मिनेट अघि`;
          if (diffHours < 24) return `${diffHours} घण्टा अघि`;
          if (diffDays < 7) return `${diffDays} दिन अघि`;
          return formatNepaliDate(dateStr);
        };

        const getImageUrl = (img) => img ? `http://localhost:5000${img}` : "https://images.unsplash.com/photo-1504711437106-49d2247f5800?w=800&h=600&fit=crop";

        // 1. Main Featured Story (Latest)
        if (articles[0]) {
          setMainNews({
            title: articles[0].title_np || "शीर्षक उपलब्ध छैन",
            excerpt: (articles[0].description_np || "").substring(0, 250) + "...",
            category: articles[0].tag_np || "समाचार",
            date: formatNepaliDate(articles[0].date),
            readTime: "५ मिनेट",
            author: "मुख्य समाचार टोली",
            image: getImageUrl(articles[0].image),
            tags: (articles[0].tag_np || "").split(",").map(t => t.trim()).filter(Boolean),
            views: "१५.८k"
          });
        }

        // 2. Featured / Trending (4 items)
        setFeaturedNews(articles.slice(1, 5).map((art, i) => ({
          title: art.title_np,
          category: art.tag_np || "समाचार",
          time: timeAgo(art.date),
          views: `${(Math.random() * 4 + 1).toFixed(1)}k`,
          trending: i < 2,
          breaking: i === 0,
          image: getImageUrl(art.image)
        })));

        // 3. Secondary News (3 cards)
        setSecondaryNews(articles.slice(5, 8).map(art => ({
          title: art.title_np,
          excerpt: (art.description_np || "").substring(0, 140) + "...",
          category: art.tag_np || "समाचार",
          time: timeAgo(art.date),
          image: getImageUrl(art.image),
          author: "समाचारदाता",
          views: `${(Math.random() * 7 + 2).toFixed(1)}k`
        })));

        // 4. Carousel News (12 items)
        setCarouselNews(articles.slice(0, 12).map(art => ({
          title: art.title_np,
          category: art.tag_np || "समाचार",
          readTime: "४ मिनेट",
          time: timeAgo(art.date),
          image: getImageUrl(art.image)
        })));

        // 5. Popular News Sidebar (4 most viewed - simulate or use real views later)
        setPopularNews(articles.slice(0, 4).map((art, i) => ({
          title: art.title_np,
          category: art.tag_np || "समाचार",
          views: `${(12 - i * 2).toFixed(1)}k`,
          time: timeAgo(art.date),
          image: getImageUrl(art.image)
        })));

        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("समाचार लोड गर्न असफल भयो। कृपया पछि फेरि प्रयास गर्नुहोस्।");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Auto carousel slide
  useEffect(() => {
    if (carouselNews.length <= 3) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % Math.ceil(carouselNews.length / 3));
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselNews.length]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const width = 320 * 3 + 24;
    const slide = Math.round(scrollLeft / width);
    setActiveSlide(slide);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-2xl font-bold text-slate-700">समाचार लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <p className="text-red-600 text-2xl font-bold mb-4">त्रुटि</p>
          <p className="text-slate-700 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Content - Left */}
          <main className="lg:col-span-8 space-y-12">

            {/* Main Featured Story */}
            {mainNews && (
              <motion.article 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 hover:shadow-3xl transition-all duration-500 group"
              >
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 8 }}
                    src={mainNews.image}
                    alt={mainNews.title}
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
                        {mainNews.category}
                      </span>
                    </div>
                    <h1 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight">
                      {mainNews.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{mainNews.date}</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{mainNews.readTime}</span>
                      <span className="flex items-center gap-2"><Eye className="w-4 h-4" />{mainNews.views}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 lg:p-8">
                  <p className="text-slate-700 text-lg leading-relaxed mb-6">{mainNews.excerpt}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {mainNews.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <motion.button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-xl transition-all">
                      <Bookmark className="w-5 h-5" /> पूरा पढ्नुहोस्
                    </motion.button>
                    <div className="flex gap-3">
                      <motion.button whileHover={{ scale: 1.2 }} className="p-3 hover:bg-slate-100 rounded-full"><Bookmark className="w-5 h-5 text-slate-600" /></motion.button>
                      <motion.button whileHover={{ scale: 1.2 }} className="p-3 hover:bg-slate-100 rounded-full"><Share2 className="w-5 h-5 text-slate-600" /></motion.button>
                    </div>
                  </div>
                </div>
              </motion.article>
            )}

            {/* Trending News */}
            <section className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ट्रेन्डिङ समाचार</h3>
                    <p className="text-sm text-slate-600">सबैभन्दा बढी पढिएका खबरहरू</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featuredNews.map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 5 }} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        {i < 3 && <div className="absolute top-2 left-2 w-7 h-7 bg-gradient-to-br from-red-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</div>}
                      </div>
                      <div className="flex-1">
                        {item.breaking && <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">ब्रेकिङ</span>}
                        <h4 className="font-semibold text-slate-900 mt-2 group-hover:text-blue-600 line-clamp-2">{item.title}</h4>
                        <div className="flex items-center justify-between mt-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{item.time}</span>
                          <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{item.views}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Secondary News Grid */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">अन्य महत्त्वपूर्ण समाचार</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryNews.map((item, i) => (
                  <motion.article key={i} whileHover={{ y: -8 }} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 cursor-pointer group">
                    <div className="h-56 overflow-hidden relative">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur text-white text-sm font-bold rounded-full">{item.category}</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{item.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">{item.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{item.time}</span>
                        <span className="flex items-center gap-2"><Eye className="w-4 h-4" />{item.views}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Carousel Section */}
            <section className="mt-16">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">ताजा अपडेटहरू</h2>
                  <p className="text-slate-600">नयाँ तथा लोकप्रिय समाचारहरू</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => scrollContainerRef.current?.scrollBy({ left: -960, behavior: 'smooth' })} className="p-3 hover:bg-slate-100 rounded-xl border"><ChevronLeft /></button>
                  <button onClick={() => scrollContainerRef.current?.scrollBy({ left: 960, behavior: 'smooth' })} className="p-3 hover:bg-slate-100 rounded-xl border"><ChevronRight /></button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl">
                <div ref={scrollContainerRef} onScroll={handleScroll} className="flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar pb-4">
                  {carouselNews.map((news, i) => (
                    <motion.div key={i} whileHover={{ y: -8 }} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                      <div className="h-48 overflow-hidden">
                        <img src={news.image} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">{news.category}</span>
                        <h3 className="mt-3 font-bold text-slate-900 line-clamp-2">{news.title}</h3>
                        <div className="mt-4 flex justify-between text-sm text-slate-500">
                          <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{news.time}</span>
                          <span className="flex items-center gap-2"><Bookmark className="w-4 h-4" />{news.readTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(carouselNews.length / 3) }).map((_, i) => (
                  <button key={i} onClick={() => scrollContainerRef.current?.scrollTo({ left: i * 960, behavior: 'smooth' })} 
                    className={`h-2 rounded-full transition-all ${activeSlide === i ? 'bg-blue-600 w-10' : 'bg-slate-300 w-2'}`} />
                ))}
              </div>
            </section>

          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8 sticky top-24">

            {/* Popular News */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <TrendingUp className="w-6 h-6" /> लोकप्रिय समाचार
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {popularNews.map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute top-2 left-2 w-7 h-7 bg-gradient-to-br from-blue-600 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{i + 1}</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 line-clamp-2 text-sm">{item.title}</h4>
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views}</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-900 to-emerald-900 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">न्यूजलेटरमा सामेल हुनुहोस्</h3>
              <p className="text-slate-300 mb-6">हरेक दिन ताजा समाचार तपाईंको इमेलमा</p>
              <input type="email" placeholder="तपाईंको इमेल" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-white/50" />
              <motion.button whileHover={{ scale: 1.05 }} className="w-full mt-4 bg-white text-blue-900 font-bold py-3.5 rounded-xl">सदस्य बन्नुहोस्</motion.button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}