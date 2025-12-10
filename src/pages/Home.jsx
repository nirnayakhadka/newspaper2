import React from 'react';
import { ChevronRight } from 'lucide-react';

function Mukhya() {
  // Sample related mukhya (main) articles - EXACT 4 CARDS
  const relatedMukhya = [
    { 
      id: 1, 
      title: 'Political Analysis: Upcoming Elections Impact',
      category: 'Politics',
      color: 'from-blue-100 to-blue-200',
      textColor: 'text-blue-700'
    },
    { 
      id: 2, 
      title: 'Market Trends and Stock Analysis Report',
      category: 'Business',
      color: 'from-green-100 to-green-200',
      textColor: 'text-green-700'
    },
    { 
      id: 3, 
      title: 'Cultural Festival Highlights and Gallery',
      category: 'Culture',
      color: 'from-purple-100 to-purple-200',
      textColor: 'text-purple-700'
    },
    { 
      id: 4, 
      title: 'Technology Breakthroughs 2024 Review',
      category: 'Technology',
      color: 'from-orange-100 to-orange-200',
      textColor: 'text-orange-700'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mukhya</h1>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Big Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Background Image */}
              <div 
                className="h-96 bg-gradient-to-r from-blue-900 to-purple-900"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1586769852044-692eb57d1f87?auto=format&fit=crop&q=80")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                
                {/* Content on Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                      Featured Story
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    Breaking News: Major Development Announced
                  </h2>
                  
                  <h3 className="text-xl md:text-2xl text-gray-200 mb-4 font-medium">
                    A Game-Changing Innovation That Will Transform Industries
                  </h3>
                  
                  <p className="text-gray-300 mb-6 max-w-2xl leading-relaxed">
                    In a landmark announcement today, leaders from around the world gathered to unveil 
                    a revolutionary initiative that promises to reshape the future of technology and 
                    sustainable development across multiple sectors.
                  </p>
                  
                  {/* Overlay Actions */}
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                      Read Full Article
                    </button>
                    <button className="px-6 py-3 bg-transparent text-white border-2 border-white/40 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                      Save for Later
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Mukhya Section - EXACT 4 CARD LAYOUT */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 inline-block">
                  Related Mukhya
                </h2>
                <div className="h-px bg-gray-200 mt-2"></div>
              </div>
              
              {/* EXACT 4 CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedMukhya.map((item) => (
                  <div 
                    key={item.id} 
                    className="group cursor-pointer border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4">
                      {/* Left: Number Badge */}
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <span className={`text-2xl font-bold ${item.textColor}`}>
                            {item.id}
                          </span>
                        </div>
                      </div>
                      
                      {/* Right: Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category Badge */}
                        <div className="mb-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${item.textColor} bg-opacity-20 ${item.color.split(' ')[0].replace('from-', 'bg-')}`}>
                            {item.category}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        
                        {/* Bottom line with arrow */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">
                            Read more
                          </span>
                          <div className={`p-1 rounded-full ${item.color.split(' ')[0].replace('from-', 'bg-')} bg-opacity-20`}>
                            <ChevronRight size={16} className={item.textColor} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Button */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  View All Related Articles
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Latest News */}
          <div className="space-y-8">
            
            {/* Latest News Panel */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">News</h2>
                <div className="h-px bg-gray-200 mt-2"></div>
              </div>
              
              {/* Latest News Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Latest News</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              </div>
              
              {/* News List */}
              <div className="space-y-4">
                {[
                  'Global Economic Summit Concludes with Major Agreements',
                  'Tech Giant Unveils Revolutionary AI Assistant',
                  'New Policy Changes Announced for Education Sector',
                  'Major Sports Event Breaks All Previous Records',
                  'Healthcare Initiative Launched Across Multiple Cities'
                ].map((title, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* See All News Button */}
              <div className="mt-6">
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  See all news
                </button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest news delivered to your inbox
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========== NEW SECTION: See all news =========== */}
        
        <div className="mt-12">
          {/* Section Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">See all news</h1>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-12">
            
            {/* Trending Interview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Interview</h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Interview title</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">Overlay Title</h4>
                      <h5 className="text-md font-medium text-blue-700 mb-3">Subtitle</h5>
                    </div>
                    <p className="text-gray-700">Description(short)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arts and culture */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Arts and culture</h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Arts or culture Title</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="w-full h-48 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-100 p-6 rounded-xl">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-purple-900 mb-2">Overlay Title</h4>
                      <h5 className="text-md font-medium text-purple-700 mb-3">Subtitle</h5>
                    </div>
                    <p className="text-gray-700">Description(short)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Arts/culture */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Arts/culture</h2>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Latest Arts/volume</h3>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Latest Arts/volume</h3>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-1">Latest Arts/volume</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        {/* =========== END NEW SECTION =========== */}
      </div>
    </div>
  );
}

export default Mukhya;