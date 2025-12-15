import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function Mukhya() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Backend API URL - Update this to match your backend URL
  const API_URL = 'http://localhost:5000/api/home';

  // Fetch data from backend
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        setHomeData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching home data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Filter data by category/tag
  const getDataByTag = (tag) => {
    return homeData.filter(item => 
      item.tag_np?.includes(tag) || item.tag_en?.toLowerCase().includes(tag.toLowerCase())
    );
  };

  // Get main news (first item or items tagged as main)
  const mainNews = homeData.find(item => item.tag_np === 'मुख्य' || item.tag_en === 'Main') || homeData[0];
  
  // Get related news (next 4 items)
  const relatedMukhya = homeData.slice(1, 5);

  // Get fresh/breaking news
  const freshNews = getDataByTag('ताजा').slice(0, 3);

  // Get trending/interview news
  const trendingNews = getDataByTag('ट्रेन्डिङ').slice(0, 2);

  // Get culture news
  const cultureNews = getDataByTag('संस्कृति').slice(0, 1);

  // विविध कारुसल आइटमहरू
  const carouselItems = getDataByTag('विविध').slice(0, 3);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % (carouselItems.length || 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + (carouselItems.length || 1)) % (carouselItems.length || 1));

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
          <p className="text-xl text-red-600">त्रुटि: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            पुन: प्रयास गर्नुहोस्
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!homeData.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <p className="text-xl text-gray-600">कुनै समाचार उपलब्ध छैन</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* मुख्य समाचार हेडर */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">मुख्य समाचार</h1>
          <div className="h-1 w-32 bg-blue-600 rounded-full mt-3"></div>
        </div>

        {/* मुख्य + सम्बन्धित मुख्य */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* बायाँ ठूलो समाचार */}
          <div className="lg:col-span-3">
            {mainNews && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[540px]">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url("${mainNews.image || 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-10 text-white">
                  <span className="inline-block px-4 py-1 bg-red-600 text-sm font-bold mb-4 rounded">
                    {mainNews.tag_np || 'ब्रेकिङ'}
                  </span>
                  <h2 className="text-5xl font-bold leading-tight">{mainNews.title_np}</h2>
                  <p className="mt-4 text-xl text-gray-200">{mainNews.subtitle_np || mainNews.description_np?.substring(0, 100)}</p>
                </div>
              </div>
            )}
          </div>

          {/* दायाँ सम्बन्धित मुख्य */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-[540px] p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-4">सम्बन्धित मुख्य समाचार</h2>
              <div className="h-px bg-gray-300 mb-5"></div>
              <div className="space-y-5 overflow-y-auto flex-1 pr-2">
                {relatedMukhya.map((item) => (
                  <div key={item.id} className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      {item.tag_np || item.category}
                    </span>
                    <h3 className="mt-3 font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-3">
                      {item.title_np}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ताजा समाचार */}
        {freshNews.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">ताजा समाचार</h2>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-600 font-bold text-lg">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {freshNews.map((news) => (
                <div
                  key={news.id}
                  className="group cursor-pointer bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
                >
                  <div
                    className="h-52 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${news.image || 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg'})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
                      {news.tag_np || 'ब्रेकिङ'}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {news.title_np}
                    </h3>
                    <div className="flex items-center justify-between mt-5">
                      <span className="text-sm font-medium text-red-600">{news.date}</span>
                      <ChevronRight className="text-blue-600 group-hover:translate-x-2 transition-transform" size={22} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ट्रेन्डिङ अन्तर्वार्ता */}
        {trendingNews.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {trendingNews.map((trending) => (
              <div key={trending.id} className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 transition-transform duration-300 hover:scale-105">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url("${trending.image || 'https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg'}")` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="bg-red-600 px-4 py-1 rounded text-sm font-bold">{trending.tag_np}</span>
                    <h3 className="text-4xl font-bold mt-4">{trending.title_np}</h3>
                    <p className="mt-3 text-lg">{trending.subtitle_np}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* कला र संस्कृति सेक्सन */}
        {cultureNews.length > 0 && (
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">कला र संस्कृति</h1>
            <div className="h-1 w-32 bg-purple-600 rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[540px]">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url("${cultureNews[0].image || 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'}")` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 p-10 text-white">
                    <span className="inline-block px-4 py-1 bg-purple-600 text-sm font-bold mb-4 rounded">
                      {cultureNews[0].tag_np}
                    </span>
                    <h2 className="text-5xl font-bold leading-tight">{cultureNews[0].title_np}</h2>
                    <p className="mt-4 text-xl text-gray-200">{cultureNews[0].subtitle_np}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-[540px] p-6 flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">सम्बन्धित समाचार</h2>
                  <div className="h-px bg-gray-300 mb-5"></div>
                  <div className="space-y-5 overflow-y-auto flex-1">
                    {relatedMukhya.slice(0, 4).map((item) => (
                      <div key={item.id} className="bg-purple-50 rounded-xl p-5 border border-purple-200 hover:border-purple-400 transition-colors cursor-pointer">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-100">
                          {item.tag_np}
                        </span>
                        <h4 className="mt-3 font-semibold text-gray-800 line-clamp-3">{item.title_np}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* विविध सेक्सन */}
        {carouselItems.length > 0 && (
          <div className="mb-20">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">विविध</h1>
            <div className="h-1 w-32 bg-indigo-600 rounded-full"></div>

            <div className="mt-10 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative h-96">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url("${carouselItems[currentSlide]?.image || 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg'}")` }} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                  <h2 className="text-5xl font-bold leading-tight">{carouselItems[currentSlide]?.title_np}</h2>
                  <p className="mt-5 text-xl">{carouselItems[currentSlide]?.subtitle_np}</p>
                </div>
              </div>

              {/* विविध कारुसल */}
              <div className="bg-gray-100 p-10">
                <h3 className="text-2xl font-bold mb-8 text-gray-800">थप रोचक सामग्री</h3>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl">
                    <div
                      className="flex transition-transform duration-600 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 33.333}%)` }}
                    >
                      {carouselItems.map((item) => (
                        <div key={item.id} className="w-full flex-shrink-0 px-3" style={{ width: "33.333%" }}>
                          <div
                            className="h-72 rounded-xl bg-cover bg-center shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                            style={{ backgroundImage: `url(${item.image})` }}
                          >
                            <div className="h-full bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-6">
                              <p className="text-white font-bold text-lg">{item.title_np}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {carouselItems.length > 1 && (
                    <>
                      <button 
                        onClick={prevSlide} 
                        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform" 
                      >
                        <ChevronLeft className="text-gray-800" />
                      </button>

                      <button 
                        onClick={nextSlide} 
                        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform" 
                      >
                        <ChevronRight className="text-gray-800" />
                      </button>
                    </>
                  )}
                </div>

                {carouselItems.length > 1 && (
                  <div className="flex justify-center gap-3 mt-10">
                    {carouselItems.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-3 rounded-full transition-all ${currentSlide === i ? "bg-indigo-600 w-12" : "bg-gray-400 w-3"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Mukhya;