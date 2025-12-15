import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Social = () => {
  const [activeCategory, setActiveCategory] = useState('खेलकुद');
  const [newsData, setNewsData] = useState([]);
  const [gridNewsData, setGridNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/social')
      .then(res => res.json())
      .then(data => {
        // Map API data to newsData format (first 6 items for list)
        const mappedNews = data.slice(0, 6).map(item => ({
          id: item.id,
          image: `http://localhost:5000${item.image}`,
          title: item.title_np,
          summary: item.subtitle_np || item.description_np?.substring(0, 100) + '...',
          time: getTimeAgo(item.publishedAt)
        }));
        
        // Map remaining items for grid (next 6 items)
        const mappedGrid = data.slice(6, 12).map(item => ({
          id: item.id,
          image: `http://localhost:5000${item.image}`,
          title: item.title_np,
          summary: item.subtitle_np || item.description_np?.substring(0, 80) + '...',
          time: getTimeAgo(item.publishedAt)
        }));

        setNewsData(mappedNews);
        setGridNewsData(mappedGrid);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Helper function to calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const published = new Date(date);
    const diffMs = now - published;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} मिनेट अगाडि`;
    if (diffHours < 24) return `${diffHours} घण्टा अगाडि`;
    return `${diffDays} दिन अगाडि`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">लोड हुँदैछ...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white py-4 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            मुख्य समाचार
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* ============ 첫 번째 섹션 (리스트 형태) ============ */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Left - List Style */}
          <div className="flex-1 lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              {newsData.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group cursor-pointer"
                >
                  <div className="flex gap-4 p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-24 md:w-40 md:h-28 rounded-lg overflow-hidden">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 mb-2 line-clamp-2">
                        {news.summary}
                      </p>
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                  {index < newsData.length - 1 && (
                    <div className="border-b border-gray-200 mx-4"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - 광고 */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-6 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="text-center p-6">
                    <p className="text-gray-600 font-semibold mb-2">विज्ञापन</p>
                    <p className="text-sm text-gray-500">300 x 250</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=250&fit=crop"
                    alt="Ad"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="relative w-full h-64 flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-300">
                  <div className="text-center p-6">
                    <p className="text-gray-700 font-semibold mb-2">विज्ञापन स्थान</p>
                    <p className="text-sm text-gray-600">300 x 250</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ============ 새 섹션: 2행 × 3열 그리드 + 오른쪽 사이드바 ============ */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            ट्रेन्डिङ समाचार
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left - 2×3 Grid */}
            <div className="flex-1 lg:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridNewsData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {item.summary}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-6 space-y-6">
                {/* 광고 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="relative w-full h-72 flex items-center justify-center bg-gradient-to-br from-purple-200 to-purple-300">
                    <div className="text-center p-6">
                      <p className="text-gray-700 font-bold text-xl">विज्ञापन</p>
                      <p className="text-sm text-gray-600 mt-2">300 × 600</p>
                    </div>
                  </div>
                </motion.div>

               
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                    सबैभन्दा बढी पढिएको
                  </h3>
                  <ul className="space-y-3">
                    {newsData.slice(0, 6).map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700 hover:text-red-600 cursor-pointer transition">
                        <span className="text-red-600 font-bold mr-2">{i + 1}.</span>
                        <span className="line-clamp-1">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;