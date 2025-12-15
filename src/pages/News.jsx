import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  Share2,
  Bookmark,
} from 'lucide-react';
import axios from 'axios';

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 8;
  const API_BASE = 'http://localhost:5000/api/news'; // Change port if needed

  // Fetch all news from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE);
        let fetchedNews = response.data;

        if (!fetchedNews || fetchedNews.length === 0) {
          setError('No news available at the moment.');
          setLoading(false);
          return;
        }

        // Sort by publishedAt (latest first)
        fetchedNews = fetchedNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Format data for frontend
        const formattedNews = fetchedNews.map((item) => ({
          id: item.id,
          title: item.title || 'Untitled News',
          subtitle: item.subtitle || 'No description available',
          category: item.category || 'General',
          image: item.image
            ? `http://localhost:5000${item.image.startsWith('/') ? '' : '/'}${item.image}`
            : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
          date: formatTimeAgo(item.publishedAt),
          views: generateFakeViews(), // You can add a real views column later
          trending: Math.random() > 0.7, // Randomly mark some as trending (replace with real logic later)
        }));

        setNewsData(formattedNews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Helper: Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return past.toLocaleDateString();
  };

  // Fake views (replace with real data later)
  const generateFakeViews = () => {
    const views = Math.floor(Math.random() * 15 + 1);
    return views > 10 ? `${views.toFixed(1)}K` : `${views}K`;
  };

  // Pagination logic
  const totalPages = Math.ceil(newsData.length / itemsPerPage);
  const currentNews = newsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const featuredNews = currentNews.slice(0, 2);
  const regularNews = currentNews.slice(2);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentNews]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-xl font-semibold text-gray-700">Loading latest news...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <p className="text-red-600 text-2xl font-bold mb-4">Error</p>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
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
                    href={`/news/${news.id}`} // Optional: link to single page
                    className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-gray-200">
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

            {/* Latest Updates */}
            <section className="mb-16">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1.5 h-10 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Latest Updates</h2>
              </div>

              <div className="space-y-6">
                {regularNews.map((news) => (
                  <a
                    key={news.id}
                    href={`/news/${news.id}`}
                    className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 max-w-md sm:max-w-none mx-auto sm:mx-0 hover:-translate-y-1"
                  >
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
            {totalPages > 1 && (
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
            )}
          </main>

          {/* Sidebar (same as before - static for now) */}
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
              {['Politics', 'Technology', 'Health', 'Business', 'Sports'].map((topic, i) => (
                <div key={i} className="py-3 border-b last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">#{topic}</span>
                    <span className="text-gray-500">{45 + i * 12}K</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default News;