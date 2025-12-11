import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Menu,
  X,
} from 'lucide-react';

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Full 24 news items (you can expand this list)
  const allNewsData = [
    { id: 1, title: 'Breaking: Major Economic Reform Announced', subtitle: 'Government unveils comprehensive new policy framework for sustainable growth', category: 'National', date: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80', date: '2 hours ago', views: '12.5K', trending: true },
    { id: 2, title: 'Tech Innovation Summit 2024', subtitle: 'Industry leaders gather to discuss the future of artificial intelligence', category: 'Technology', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80', date: '3 hours ago', views: '8.3K', trending: true },
    { id: 4, title: 'Healthcare Breakthrough Announced', subtitle: 'Revolutionary new treatment shows remarkable promise', category: 'Health', image: 'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=1200&q=80', date: '6 hours ago', views: '6.7K' },
    { id: 5, title: 'Global Climate Action Summit', subtitle: 'Nations unite with ambitious commitments', category: 'National', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80', date: '8 hours ago', views: '9.1K' },
    { id: 6, title: 'Business Expansion Plans Unveiled', subtitle: 'Major corporations announce aggressive growth strategies', category: 'Business', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80', date: '10 hours ago', views: '5.4K' },
    { id: 7, title: 'Education Reform Initiative Launched', subtitle: 'New curriculum standards released nationwide', category: 'National', image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80', date: '12 hours ago', views: '4.2K' },
    { id: 8, title: 'Cultural Festival Makes Grand Return', subtitle: 'Celebrating rich diversity and heritage', category: 'Culture', image: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=1200&q=80', date: '14 hours ago', views: '7.8K' },
    { id: 9, title: 'Startup Success Stories', subtitle: 'New ventures making waves', category: 'Business', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', date: '1 day ago', views: '11.3K', trending: true },
    { id: 10, title: 'Urban Development Projects', subtitle: 'City modernization continues', category: 'National', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', date: '1 day ago', views: '3.9K' },
    { id: 11, title: 'AI Revolution in Manufacturing', subtitle: 'Advanced automation transforms industry', category: 'Technology', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80', date: '1 day ago', views: '10.5K' },
    { id: 12, title: 'Fitness Trends 2024', subtitle: 'New wellness approaches emerge', category: 'Health', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=80', date: '2 days ago', views: '8.7K' },
    { id: 13, title: 'Travel Industry Rebounds Strong', subtitle: 'Tourism sees record-breaking numbers', category: 'Business', image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80', date: '2 days ago', views: '6.2K' },
    { id: 14, title: 'Fashion Week Highlights', subtitle: 'Top designers showcase collections', category: 'Culture', image: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=1200&q=80', date: '2 days ago', views: '9.4K' },
    { id: 15, title: 'Beach Conservation Efforts', subtitle: 'Communities protect coastlines', category: 'National', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80', date: '3 days ago', views: '5.8K' },
    { id: 16, title: 'Smart Home Technology Boom', subtitle: 'IoT devices go mainstream', category: 'Technology', image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80', date: '3 days ago', views: '13.1K', trending: true },
    { id: 17, title: 'Food Industry Innovation Wave', subtitle: 'Sustainable farming adopted widely', category: 'Business', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80', date: '3 days ago', views: '4.6K' },
    { id: 18, title: 'Community Development Success', subtitle: 'Grassroots initiatives show results', category: 'National', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', date: '4 days ago', views: '7.3K' },
    { id: 19, title: 'Renewable Energy Breakthrough', subtitle: 'Solar efficiency hits new milestone', category: 'Technology', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80', date: '4 days ago', views: '11.9K' },
    { id: 20, title: 'Financial Markets Rally', subtitle: 'Stock indices reach all-time highs', category: 'Business', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80', date: '4 days ago', views: '14.2K' },
    { id: 21, title: 'Space Exploration Mission', subtitle: 'New satellite launch success', category: 'Technology', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80', date: '5 days ago', views: '16.7K' },
    { id: 22, title: 'Women in Leadership Forum', subtitle: 'Empowering female executives', category: 'Business', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80', date: '5 days ago', views: '5.1K' },
    { id: 23, title: 'Digital Learning Revolution', subtitle: 'Online education transforms learning', category: 'Technology', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80', date: '5 days ago', views: '8.9K' },
    { id: 24, title: 'Culinary Arts Renaissance', subtitle: 'Tradition meets modern techniques', category: 'Culture', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80', date: '6 days ago', views: '6.5K' },
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(allNewsData.length / itemsPerPage);
  const currentNews = allNewsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const featuredNews = currentNews.slice(0, 2);
  const regularNews = currentNews.slice(2);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min((window.scrollY / total) * 100, 100));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentNews]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* Featured Stories */}
            <section className="mb-12 lg:mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1.5 h-10 bg-gradient-to-b from-red-500 to-orange-500 rounded-full" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Featured Stories</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {featuredNews.map((news) => (
                  <a
                    key={news.id}
                    href="#"
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    <div className="relative aspect-[16/9] lg:aspect-[16/9] overflow-hidden bg-gray-200">
                      <img
                        src={news.image}
                        alt={news.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {news.trending && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                          <TrendingUp size={16} /> TRENDING
                        </div>
                      )}
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 hidden lg:block mb-4">{news.subtitle}</p>
                      <div className="flex items-center gap-5 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Clock size={16} /> {news.date}</span>
                        <span className="flex items-center gap-1"><Eye size={16} /> {news.views}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Latest Updates - Perfect Uniform Cards */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Updates</h2>
              </div>

              <div className="space-y-6">
                {regularNews.map((news) => (
                  <a
                    key={news.id}
                    href="#"
                    className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 
                               max-w-md sm:max-w-none mx-auto sm:mx-0 hover:-translate-y-1"
                  >
                    {/* Fixed Aspect Ratio Image - Same height everywhere */}
                    <div className="relative w-full sm:w-64 lg:w-96 xl:w-[420px] aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={news.image}
                        alt={news.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {news.trending && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                          <TrendingUp size={13} /> HOT
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold">
                            {news.category}
                          </span>
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock size={15} /> {news.date}
                          </span>
                        </div>

                        <h3 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                          {news.title}
                        </h3>

                        {/* Subtitle only on desktop */}
                        <p className="text-gray-600 mt-4 line-clamp-3 hidden lg:block">
                          {news.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Eye size={16} /> {news.views}
                        </span>
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2.5 hover:bg-gray-100 rounded-full transition">
                            <Bookmark size={20} className="text-gray-600" />
                          </button>
                          <button className="p-2.5 hover:bg-gray-100 rounded-full transition">
                            <Share2 size={20} className="text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 flex-wrap mt-12">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-8 py-4 rounded-2xl font-semibold bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-3"
              >
                <ChevronLeft size={22} /> Previous
              </button>

              <div className="flex gap-3">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`w-14 h-14 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl scale-110'
                        : 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:scale-105'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-8 py-4 rounded-2xl font-semibold bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-3"
              >
                Next <ChevronRight size={22} />
              </button>
            </div>
          </main>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0 sticky top-24 self-start space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-3">Stay Informed</h3>
              <p className="text-blue-100 mb-6">Get daily news delivered to your inbox</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-4 rounded-xl text-gray-900 mb-4 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:bg-blue-50 transition shadow-lg">
                Subscribe Now
              </button>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="text-red-500" size={28} /> Trending Topics
              </h3>
              {['AI Revolution', 'Climate Crisis', 'Market Rally', 'Health Tech', 'Sports Drama'].map((topic, i) => (
                <div key={i} className="py-3 border-b last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">#{topic}</span>
                    <span className="text-gray-500">{45 + i * 12}K</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-10 text-center text-white shadow-2xl">
              <div className="text-6xl mb-4">Target</div>
              <h4 className="text-2xl font-bold mb-3">Advertise Here</h4>
              <p className="mb-6 opacity-90">Reach millions of readers daily</p>
              <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl w-full hover:bg-purple-50 transition">
                Learn More
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default News;