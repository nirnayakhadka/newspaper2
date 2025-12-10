import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Clock, Tag, Eye, Share2, Bookmark, Search, Menu } from 'lucide-react';

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');
  const contentRef = useRef(null);
  
  const categories = ['All', 'National', 'Technology', 'Sports', 'Health', 'Business', 'Culture'];
  
  // Expanded news data
  const allNewsData = [
    { id: 1, image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800', title: 'Breaking: Major Economic Reform Announced', subtitle: 'Government unveils comprehensive new policy framework for sustainable growth', tags: ['Economy', 'Politics'], category: 'National', date: '2 hours ago', views: '12.5K', trending: true },
    { id: 2, image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800', title: 'Tech Innovation Summit 2024', subtitle: 'Industry leaders gather to discuss the future of artificial intelligence', tags: ['AI', 'Innovation'], category: 'Technology', date: '3 hours ago', views: '8.3K', trending: true },
    { id: 3, image: 'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800', title: 'Sports Championship Finals Begin', subtitle: 'Teams prepare for the most anticipated match of the season', tags: ['Sports'], category: 'Sports', date: '5 hours ago', views: '15.2K' },
    { id: 4, image: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800', title: 'Healthcare Breakthrough Announced', subtitle: 'Revolutionary new treatment shows remarkable promise in clinical trials', tags: ['Health', 'Science'], category: 'Health', date: '6 hours ago', views: '6.7K' },
    { id: 5, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', title: 'Global Climate Action Summit', subtitle: 'Nations unite with ambitious commitments to carbon neutrality goals', tags: ['Environment'], category: 'National', date: '8 hours ago', views: '9.1K' },
    { id: 6, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', title: 'Business Expansion Plans Unveiled', subtitle: 'Major corporations announce aggressive growth strategies for next quarter', tags: ['Business'], category: 'Business', date: '10 hours ago', views: '5.4K' },
    { id: 7, image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', title: 'Education Reform Initiative Launched', subtitle: 'New comprehensive curriculum standards released nationwide', tags: ['Education'], category: 'National', date: '12 hours ago', views: '4.2K' },
    { id: 8, image: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=800', title: 'Cultural Festival Makes Grand Return', subtitle: 'Celebrating rich diversity and cherished traditional heritage', tags: ['Culture'], category: 'Culture', date: '14 hours ago', views: '7.8K' },
    { id: 9, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', title: 'Startup Success Stories', subtitle: 'New ventures making significant waves in the industry', tags: ['Business'], category: 'Business', date: '1 day ago', views: '11.3K', trending: true },
    { id: 10, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', title: 'Urban Development Projects', subtitle: 'City modernization initiative continues with new infrastructure', tags: ['Infrastructure'], category: 'National', date: '1 day ago', views: '3.9K' },
    { id: 11, image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800', title: 'AI Revolution in Manufacturing', subtitle: 'Advanced automation transforms traditional manufacturing processes', tags: ['Technology'], category: 'Technology', date: '1 day ago', views: '10.5K' },
    { id: 12, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', title: 'Fitness Trends 2024', subtitle: 'New wellness approaches emerge in health and fitness industry', tags: ['Health'], category: 'Health', date: '2 days ago', views: '8.7K' },
    { id: 13, image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=800', title: 'Travel Industry Rebounds Strong', subtitle: 'Tourism sector sees unprecedented record-breaking numbers', tags: ['Travel'], category: 'Business', date: '2 days ago', views: '6.2K' },
    { id: 14, image: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800', title: 'Fashion Week Highlights', subtitle: 'Top designers showcase innovative seasonal collections', tags: ['Fashion'], category: 'Culture', date: '2 days ago', views: '9.4K' },
    { id: 15, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', title: 'Beach Conservation Efforts', subtitle: 'Local communities unite to protect precious coastlines', tags: ['Environment'], category: 'National', date: '3 days ago', views: '5.8K' },
    { id: 16, image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800', title: 'Smart Home Technology Boom', subtitle: 'IoT devices rapidly gain mainstream popularity', tags: ['Technology'], category: 'Technology', date: '3 days ago', views: '13.1K', trending: true },
    { id: 17, image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', title: 'Food Industry Innovation Wave', subtitle: 'Sustainable farming practices widely adopted across sector', tags: ['Food'], category: 'Business', date: '3 days ago', views: '4.6K' },
    { id: 18, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', title: 'Community Development Success', subtitle: 'Local grassroots initiatives show impressive results', tags: ['Society'], category: 'National', date: '4 days ago', views: '7.3K' },
    { id: 19, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800', title: 'Renewable Energy Breakthrough', subtitle: 'Solar technology efficiency reaches new milestone', tags: ['Energy'], category: 'Technology', date: '4 days ago', views: '11.9K' },
    { id: 20, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', title: 'Financial Markets Rally', subtitle: 'Stock indices reach all-time highs amid optimism', tags: ['Finance'], category: 'Business', date: '4 days ago', views: '14.2K' },
    { id: 21, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', title: 'Space Exploration Mission', subtitle: 'New satellite launch marks milestone achievement', tags: ['Space'], category: 'Technology', date: '5 days ago', views: '16.7K' },
    { id: 22, image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800', title: 'Women in Leadership Forum', subtitle: 'Empowering next generation of female executives', tags: ['Leadership'], category: 'Business', date: '5 days ago', views: '5.1K' },
    { id: 23, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800', title: 'Digital Learning Revolution', subtitle: 'Online education platforms transform traditional learning', tags: ['Education'], category: 'Technology', date: '5 days ago', views: '8.9K' },
    { id: 24, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800', title: 'Culinary Arts Renaissance', subtitle: 'Chef innovations blend tradition with modern techniques', tags: ['Food'], category: 'Culture', date: '6 days ago', views: '6.5K' }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(allNewsData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = allNewsData.slice(startIndex, startIndex + itemsPerPage);
  
  const featuredNews = currentNews.slice(0, 2);
  const regularNews = currentNews.slice(2);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const totalHeight = element.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentNews]);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50" ref={contentRef}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Navigation Bar */}
      <div className="sticky top-0 bg-white shadow-sm z-40 border-b border-gray-100">
      </div>

      {/* Main Container with White Space */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main Content Area */}
          <div className="flex-1 max-w-[900px]">
            {/* Featured News */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
                </div>
                <div className="flex items-center gap-2 text-red-500 text-sm font-semibold">
                  <TrendingUp size={18} />
                  <span>Trending</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      {news.trending && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                          <TrendingUp size={12} />
                          TRENDING
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block text-white/90 text-xs font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {news.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {news.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {news.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Bookmark size={16} className="text-gray-400" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Share2 size={16} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest News */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
              </div>
              <div className="space-y-5">
                {regularNews.map((news) => (
                  <div 
                    key={news.id} 
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex border border-gray-100"
                  >
                    <div className="w-72 relative overflow-hidden flex-shrink-0">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {news.trending && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                          <TrendingUp size={12} />
                          HOT
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                          {news.category}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock size={12} />
                          {news.date}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                        {news.subtitle}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye size={13} />
                            {news.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Bookmark size={15} className="text-gray-400 hover:text-blue-600" />
                          </button>
                          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                            <Share2 size={15} className="text-gray-400 hover:text-blue-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3">
              <button 
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-100 transition-all font-medium shadow-sm"
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPage(idx + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      currentPage === idx + 1
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-100 transition-all font-medium shadow-sm"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Premium Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold mb-2">Stay Informed</h3>
                <p className="text-blue-100 text-sm mb-4">Get daily news delivered to your inbox</p>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2.5 rounded-lg text-gray-900 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="w-full bg-white text-blue-600 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-md">
                  Subscribe Now
                </button>
              </div>

              {/* Trending Topics */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-red-500" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {['Technology', 'Politics', 'Health', 'Climate', 'Sports'].map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <span className="text-sm font-medium text-gray-700">#{topic}</span>
                      <span className="text-xs text-gray-500">{Math.floor(Math.random() * 50 + 10)}K</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advertisement */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Advertise Here</h3>
                <p className="text-purple-100 text-sm mb-4">Reach 100K+ readers daily</p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors w-full">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default News;