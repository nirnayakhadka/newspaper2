import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Calendar, TrendingUp, Bookmark, Share2, Eye, User, Mail, Zap, Phone, MapPin, Headphones, Globe, Target, Briefcase } from 'lucide-react';

export default function Mukhya() {
  const scrollContainerRef = useRef(null);
  const mainContentRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("सबै");

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const nextSlide = (activeSlide + 1) % 2; // Only 2 slides (3 cards each)
        const scrollPosition = nextSlide * 320 * 3;
        scrollContainerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        setActiveSlide(nextSlide);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollPosition = scrollContainerRef.current.scrollLeft;
      const slideWidth = 320 * 3;
      const slideIndex = Math.round(scrollPosition / slideWidth);
      setActiveSlide(slideIndex);
    }
  };

  // Featured News Data with Images
  const featuredNews = [
    { 
      title: "राष्ट्रपतिद्वारा संसदको अधिवेशन आह्वान", 
      category: "राजनीति", 
      time: "२ घण्टा अघि",
      views: "१.२k",
      trending: true,
      breaking: true,
      image: "https://images.unsplash.com/photo-1551135049-8a33b2f2cc9b?w=400&h-300&fit=crop&q=80"
    },
    { 
      title: "नेपालले जित्यो दक्षिण एसियाली खेलकुदमा स्वर्ण", 
      category: "खेलकुद", 
      time: "५ घण्टा अघि",
      views: "२.४k",
      trending: true,
      breaking: false,
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop&q=80"
    },
    { 
      title: "काठमाडौंमा वायु गुणस्तरमा सुधार", 
      category: "वातावरण", 
      time: "१० मिनेट अघि",
      views: "८९०",
      trending: false,
      breaking: true,
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&q=80"
    },
    { 
      title: "नयाँ शिक्षा नीति जारी", 
      category: "शिक्षा", 
      time: "१ घण्टा अघि",
      views: "९५०",
      trending: true,
      breaking: false,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&q=80"
    },
  ];

  const mainNews = {
    title: "सरकारले ल्यायो नयाँ आर्थिक सुधार प्याकेज",
    excerpt: "अर्थमन्त्रीले संसदमा प्रस्तुत गरेको प्याकेजले कर छुट र लगानी प्रोत्साहनमा जोड दिएको छ। यसले अगामी आर्थिक वर्षको लागि ७% वृद्धिको लक्ष्य राखेको छ।",
    category: "अर्थ",
    date: "२०८२ मंसिर २२",
    readTime: "३ मिनेट",
    author: "राम बहादुर",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&h=900&fit=crop",
    tags: ["अर्थतन्त्र", "सुधार", "निवेश"],
    views: "१०.५k"
  };

  const secondaryNews = [
    {
      title: "काठमाडौं उपत्यकामा ट्राफिक सुधारका लागि नयाँ योजना",
      excerpt: "स्मार्ट ट्राफिक लाइट र एकतर्फी सडक व्यवस्थापनको तयारी, यातायात समस्या समाधानका लागि ५ वर्षे योजना।",
      category: "राजधानी",
      time: "४५ मिनेट अघि",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      author: "सुनिता श्रेष्ठ",
      views: "२.३k"
    },
    {
      title: "नेपाली क्रिकेट टोलीको ऐतिहासिक जित",
      excerpt: "टी-२० सिरिजको फाइनलमा भारतलाई हराउँदै इतिहास रच्यो नेपालले, यसले विश्वकप छनोटमा ठाउँ सुनिश्चित गर्यो।",
      category: "खेलकुद",
      time: "२ घण्टा अघि",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop",
      author: "अनिल केसी",
      views: "५.७k"
    },
    {
      title: "डिजिटल नेपाल: प्रविधिमा अग्रगामी",
      excerpt: "सरकारले डिजिटलाइजेशनलाई गति दिँदै नयाँ योजना सार्वजनिक गरेको छ, सबै सरकारी सेवा अनलाइन पुग्ने।",
      category: "प्रविधि",
      time: "३ घण्टा अघि",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
      author: "सरस्वती पौडेल",
      views: "३.१k"
    }
  ];

  const carouselNews = [
    { 
      title: "नयाँ नीति तथा कार्यक्रम सार्वजनिक", 
      category: "राजनीति", 
      readTime: "४ मिनेट", 
      image: "https://images.unsplash.com/photo-1551135049-8a33b2f2cc9b?w=400&h=300&fit=crop&q=80", 
      time: "३ घण्टा अघि" 
    },
    { 
      title: "नेपालको अर्थतन्त्रमा सुधारका संकेत", 
      category: "अर्थ", 
      readTime: "५ मिनेट", 
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop&q=80", 
      time: "५ घण्टा अघि" 
    },
    { 
      title: "शिक्षा ऐन संशोधनको मस्यौदा तयार", 
      category: "शिक्षा", 
      readTime: "३ मिनेट", 
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&q=80", 
      time: "७ घण्टा अघि" 
    },
    { 
      title: "स्वास्थ्य सेवामा नवीनतम प्रविधि", 
      category: "स्वास्थ्य", 
      readTime: "४ मिनेट", 
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&q=80", 
      time: "९ घण्टा अघि" 
    },
    { 
      title: "पर्यटन उद्योगमा वृद्धिको प्रवृत्ति", 
      category: "पर्यटन", 
      readTime: "३ मिनेट", 
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&q=80", 
      time: "११ घण्टा अघि" 
    },
    { 
      title: "डिजिटल नेपाल कार्यक्रमको प्रगति", 
      category: "प्रविधि", 
      readTime: "५ मिनेट", 
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&q=80", 
      time: "१३ घण्टा अघि" 
    },
  ];

  const categories = [
    { name: 'राजनीति', count: 24, color: 'bg-red-100 text-red-700', icon: <Briefcase className="w-4 h-4" /> },
    { name: 'अर्थ', count: 18, color: 'bg-green-100 text-green-700', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'खेलकुद', count: 32, color: 'bg-blue-100 text-blue-700', icon: <Target className="w-4 h-4" /> },
    { name: 'विज्ञान', count: 12, color: 'bg-purple-100 text-purple-700', icon: <Globe className="w-4 h-4" /> },
    { name: 'स्वास्थ्य', count: 21, color: 'bg-pink-100 text-pink-700', icon: <Headphones className="w-4 h-4" /> },
    { name: 'शिक्षा', count: 15, color: 'bg-amber-100 text-amber-700', icon: <Bookmark className="w-4 h-4" /> },
    { name: 'मनोरञ्जन', count: 28, color: 'bg-indigo-100 text-indigo-700', icon: <User className="w-4 h-4" /> },
    { name: 'प्रविधि', count: 19, color: 'bg-cyan-100 text-cyan-700', icon: <Zap className="w-4 h-4" /> },
  ];

  const popularNews = [
    { 
      title: "महानगरको बजेट घोषणा", 
      category: "स्थानीय शासन", 
      views: "९.७k", 
      time: "१ हप्ता अघि",
      image: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=300&h=200&fit=crop&q=80"
    },
    { 
      title: "नयाँ विद्यालय निर्माण योजना", 
      category: "शिक्षा", 
      views: "८.९k", 
      time: "२ हप्ता अघि",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop&q=80"
    },
    { 
      title: "खेल स्टेडियम निर्माण", 
      category: "खेलकुद", 
      views: "११.२k", 
      time: "३ हप्ता अघि",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop&q=80"
    },
    { 
      title: "पर्यावरण संरक्षण अभियान", 
      category: "पर्यावरण", 
      views: "७.८k", 
      time: "१ महिना अघि",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-900 py-12 md:py-16"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              मुख्य समाचार
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-6 max-w-2xl mx-auto">
              विश्वसनीय र तीव्र समाचारको प्रमुख स्रोत
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                १२:४५ PM
              </span>
              <span>•</span>
              <span>कुल समाचार: २८५</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Categories Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900">समाचार श्रेणीहरू</h2>
            <span className="text-slate-600 text-sm">कुल ८ श्रेणीहरू</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.name)}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md border border-slate-200'
                }`}
              >
                {category.icon}
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  activeCategory === category.name
                    ? 'bg-white/30'
                    : category.color.split(' ')[0] + ' ' + category.color.split(' ')[1]
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Left (8 columns) */}
          <main className="lg:col-span-8 space-y-12">
            {/* Featured Story */}
            <motion.article 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 hover:shadow-3xl transition-all duration-500 group"
            >
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8 }}
                  whileHover={{ scale: 1.05 }}
                  src={mainNews.image}
                  alt="मुख्य समाचार"
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
                    <span className="text-sm opacity-90">मुख्य समाचार</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                    {mainNews.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {mainNews.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {mainNews.readTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {mainNews.author}
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {mainNews.views}
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
                    <h4 className="font-bold text-xl text-slate-900">{mainNews.author}</h4>
                    <p className="text-slate-600">वरिष्ठ पत्रकार</p>
                  </div>
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                  {mainNews.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  {mainNews.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                      <Bookmark className="w-5 h-5" />
                      पूरा पढ्नुहोस्
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Bookmark className="w-5 h-5 text-slate-600" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="p-2.5 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-slate-600" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Trending News with Images */}
            <section className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ट्रेन्डिङ समाचार</h3>
                    <p className="text-sm text-slate-600">आजका सबैभन्दा चर्चित खबरहरू</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featuredNews.map((item, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-300">
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <motion.img 
                              whileHover={{ scale: 1.1 }}
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            {index < 3 && (
                              <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {index + 1}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {item.breaking && (
                              <span className="text-xs font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                                ब्रेकिङ
                              </span>
                            )}
                            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                              {item.category}
                            </span>
                          </div>
                          
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                            {item.title}
                          </h4>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                              <Clock className="w-4 h-4" />
                              <span>{item.time}</span>
                            </div>
                            <span className="text-sm text-slate-500 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              {item.views}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            {/* Secondary News */}
            <section>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">अन्य समाचार</h3>
                <p className="text-slate-600">ताजा र महत्वपूर्ण समाचारहरू</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryNews.map((item, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          {item.category}
                        </span>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {item.views}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h4 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.author}</p>
                          <p className="text-xs text-slate-500">पत्रकार</p>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <span className="text-sm text-slate-500 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.time}
                        </span>
                        
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1 group/btn"
                        >
                          पढ्नुहोस्
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Carousel Section */}
            <section className="mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">सम्बन्धित समाचारहरू</h2>
                  <p className="text-slate-600">तपाईंले पढ्न रुचाउने समाचारहरू</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const prevSlide = activeSlide - 1;
                      const scrollPosition = Math.max(prevSlide, 0) * 320 * 3;
                      scrollContainerRef.current?.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                      });
                      setActiveSlide(Math.max(prevSlide, 0));
                    }}
                    className="p-3 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const nextSlide = activeSlide + 1;
                      const maxSlide = Math.ceil(carouselNews.length / 3) - 1;
                      const scrollPosition = Math.min(nextSlide, maxSlide) * 320 * 3;
                      scrollContainerRef.current?.scrollTo({
                        left: scrollPosition,
                        behavior: 'smooth'
                      });
                      setActiveSlide(Math.min(nextSlide, maxSlide));
                    }}
                    className="p-3 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </motion.button>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-6 pb-6 scroll-smooth"
                    style={{
                      scrollBehavior: 'smooth',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none'
                    }}
                  >
                    {carouselNews.map((news, i) => (
                      <div 
                        key={i} 
                        className="flex-shrink-0 w-[calc(33.333%-16px)]"
                      >
                        <motion.article 
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300 group"
                        >
                          <div className="h-48 overflow-hidden relative">
                            <motion.img 
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.7 }}
                              src={news.image}
                              alt={news.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-3">
                              <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-semibold rounded-full shadow-sm">
                                {news.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <h3 className="font-bold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors text-base">
                              {news.title}
                            </h3>
                            
                            <div className="flex items-center justify-between text-sm text-slate-500">
                              <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {news.time}
                              </span>
                              <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                                <Bookmark className="w-4 h-4" />
                                {news.readTime}
                              </span>
                            </div>
                          </div>
                        </motion.article>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: Math.ceil(carouselNews.length / 3) }).map((_, dot) => (
                    <motion.button
                      key={dot}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        const scrollPosition = dot * 320 * 3;
                        scrollContainerRef.current?.scrollTo({
                          left: scrollPosition,
                          behavior: 'smooth'
                        });
                        setActiveSlide(dot);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeSlide === dot 
                          ? 'bg-gradient-to-r from-blue-600 to-emerald-600 w-8' 
                          : 'bg-slate-300 w-2 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${dot + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Advertisement 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900/90 to-slate-900 shadow-2xl p-6"
              >
                <div className="text-center">
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-widest mb-4">
                    <span className="px-3 py-1.5 bg-blue-500/20 rounded-lg">प्रायोजित</span>
                  </p>
                  <h4 className="text-xl font-bold text-white mb-3">
                    व्यवसायको डिजिटल रूपान्तरण
                  </h4>
                  <p className="text-sm text-slate-300 mb-6">
                    नेपालको अग्रणी डिजिटल समाधान प्रदायक
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold py-3.5 rounded-xl text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    थप जानकारी
                  </motion.button>
                </div>
              </motion.div>

              {/* Popular News with Images */}
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">लोकप्रिय समाचार</h3>
                      <p className="text-sm text-slate-600">धेरै पढिएका समाचारहरू</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {popularNews.map((item, index) => (
                    <motion.article
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <motion.img 
                              whileHover={{ scale: 1.1 }}
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-blue-600 to-emerald-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                              {item.category}
                            </span>
                          </div>
                          
                          <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2 text-sm">
                            {item.title}
                          </h4>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <Eye className="w-3 h-3" />
                              <span>{item.views}</span>
                            </div>
                            <span className="text-xs text-slate-500">{item.time}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>

              {/* Advertisement 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800/90 to-slate-900 shadow-2xl p-6"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-md">
                    <TrendingUp className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">विशेष अफर</p>
                    <h4 className="text-xl font-bold text-white">नयाँ लगानी योजना</h4>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-6">
                  प्रतिवर्ष १२% ब्याज दर, सुरक्षित र लाभदायक लगानी
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-slate-900 font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-all duration-300 shadow-md"
                >
                  अभी लगानी गर्नुहोस्
                </motion.button>
              </motion.div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-blue-900 to-emerald-900 rounded-2xl p-6 text-white shadow-xl">
                <h4 className="text-xl font-bold mb-4">न्यूजलेटर सदस्यता</h4>
                <p className="text-sm text-slate-300 mb-5">
                  दैनिक समाचार र अपडेट प्राप्त गर्नुहोस्
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="तपाईंको ईमेल" 
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-white text-slate-900 font-semibold py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-all duration-300"
                  >
                    सदस्यता लिनुहोस्
                  </motion.button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}