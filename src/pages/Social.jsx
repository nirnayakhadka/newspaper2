import React, { useState } from 'react';
import { Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

/* ======== 기존 데이터 (첫 번째 리스트 섹션) ======== */
const newsData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
    title: 'नेपालले जित्यो टी-२० शृंखलाः भारतलाई हराउँदै इतिहास रच्यो',
    summary: 'काठमाडौंमा सम्पन्न खेलमा नेपालले भारतलाई ७ विकेटले पराजित गर्दै पहिलो पटक द्विपक्षीय शृंखला जितेको छ।',
    time: '१० मिनेट अगाडि'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1518186248747-73b9e1e7c2a6?w=600&h=400&fit=crop',
    title: 'काठमाडौंमा आजदेखि मेलम्चीको पानी',
    summary: 'लामो प्रतिक्षापछि सुन्दरीजलमा प्रशोधन केन्द्रबाट आज बिहानदेखि मेलम्चीको पानी वितरण सुरु भएको छ।',
    time: '३० मिनेट अगाडि'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1581092580490-4a9e0f2febb3?w=600&h=400&fit=crop',
    title: 'सरकारले ल्यायो नयाँ बजेट : १८ खर्बको सीमा',
    summary: 'अर्थमन्त्रीले आगामी आर्थिक वर्षका लागि १८ खर्ब ५० अर्बको बजेट सार्वजनिक गरेका छन्।',
    time: '१ घण्टा अगाडि'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    title: 'दशैंको टिकट बुकिङ खुल्यो, अनलाइनबाटै घर जान सकिने',
    summary: 'यातायात व्यवस्था विभागले दशैंको अग्रिम टिकट बुकिङ आजबाट खुला गरेको छ।',
    time: '२ घण्टा अगाडि'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1507678209232220-8e3e2e3de9d9?w=600&h=400&fit=crop',
    title: 'सगरमाथा क्षेत्रमा ११ टन फोहोर संकलन',
    summary: 'हिमाल सफाई अभियान २०२५ अन्तर्गत सगरमाथा आधारशिविरबाट ११ टन फोहोर संकलन गरिएको छ।',
    time: '३ घण्टा अगाडि'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
    title: 'नेपाल टेलिकमले ५जी सेवा विस्तार गर्ने',
    summary: 'काठमाडौं, पोखरा र विराटनगरमा आगामी महिनादेखि ५जी सेवा सुरु हुने भएको छ।',
    time: '४ घण्टा अगाडि'
  }
];

/* ======== 기존 피처드 뉴스 (사용되지 않음, 필요시 활용 가능) ======== */
const featuredNews = [
  // 필요하면 여기 채워넣으세요
];

/* ======== 카테고리별 뉴스 (현재 사용 안 함) ======== */
const categoryNews = {
  // 필요하면 채워넣으세요
};

/* ======== 새 섹션용 6개 그리드 카드 데이터 (이미 있음) ======== */
const gridNewsData = [
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
    title: 'स्टार्टअप नेपालको उडान',
    summary: 'नेपाली युवाहरूले सुरु गरेका स्टार्टअपहरूले अन्तर्राष्ट्रिय बजारमा स्थान बनाउँदै।',
    time: '१५ मिनेट अगाडि'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    title: 'ई-कमर्समा नयाँग्लो रेकर्ड',
    summary: 'दशैं-तिहारको बेला अनलाइन बजारमा ४०% ले बिक्री वृद्धि।',
    time: '१ घण्टा अगाडि'
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
    title: 'नेपालमा पहिलो रोबोटिक सर्जरी',
    summary: 'वीर अस्पतालमा सफलतापूर्वक रोबोटिक अपरेसन सम्पन्न।',
    time: '२ घण्टा अगाडि'
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    title: 'विद्युतीय गाडीको आयात दोब्बर',
    summary: 'सरकारको कर छुट नीतिपछि विद्युतीय सवारीको माग ह्वात्तै बढ्यो।',
    time: '३ घण्टा अगाडि'
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop',
    title: 'नेपाल टेलिकमले ५जी परीक्षण सफल',
    summary: 'काठमाडौं र पोखरामा ५जी नेटवर्कको सफल परीक्षण।',
    time: '४ घण्टा अगाडि'
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1498054-147a6935ad58?w=400&h=300&fit=crop',
    title: 'हिमाल सफाई अभियान २०२5',
    summary: 'सगरमाथा क्षेत्रबाट १० टन फोहोर संकलन गरियो।',
    time: '५ घण्टा अगाडि'
  }
];

const Social = () => {
  const [activeCategory, setActiveCategory] = useState('खेलकुद');

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
                    {[
                      'नेपालको नयाँ बजेट २०८२/८३',
                      'नेपालले भारतलाई हरायो',
                      '५जी सेवा नेपालमा सुरु',
                      'हिमाल सफाई अभियान सफल',
                      'विद्युतीय गाडीको आयात दोब्बर',
                      'रोबोटिक सर्जरी नेपालमा पहिलो पटक'
                    ].map((t, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-700 hover:text-red-600 cursor-pointer transition">
                        <span className="text-red-600 font-bold mr-2">{i + 1}.</span>
                        {t}
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