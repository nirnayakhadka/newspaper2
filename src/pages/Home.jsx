import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

function Mukhya() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // ४ वटा मात्र सम्बन्धित मुख्य समाचार
  const relatedMukhya = [
    {
      id: 1,
      title: 'आगामी निर्वाचनको प्रभाव र राजनीतिक विश्लेषण',
      category: 'राजनीति',
      color: 'from-blue-100 to-blue-200',
      textColor: 'text-blue-700',
    },
    {
      id: 2,
      title: 'बजार प्रवृत्ति तथा शेयर विश्लेषण प्रतिवेदन',
      category: 'अर्थ/व्यवसाय',
      color: 'from-green-100 to-green-200',
      textColor: 'text-green-700',
    },
    {
      id: 3,
      title: 'सांस्कृतिक उत्सवका झलकहरू र फोटो ग्यालरी',
      category: 'संस्कृति',
      color: 'from-purple-100 to-purple-200',
      textColor: 'text-purple-700',
    },
    {
      id: 4,
      title: 'सन् २०२४ का प्रविधि क्षेत्रका ठूला सफलताहरू',
      category: 'प्रविधि',
      color: 'from-orange-100 to-orange-200',
      textColor: 'text-orange-700',
    },
  ];

  // विविध कारुसल आइटमहरू
  const carouselItems = [
    {
      id: 1,
      title: 'हिमाली जीवन',
      image: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      title: 'नेपाली खाना',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'यात्रा गन्तव्य',
      image: 'https://images.pexels.com/photos/3581365/pexels-photo-3581365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 font-nepali">

        {/* मुख्य समाचार हेडर */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900">मुख्य समाचार</h1>
          <div className="h-1 w-32 bg-blue-600 rounded-full mt-3"></div>
        </div>

        {/* मुख्य + सम्बन्धित मुख्य */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
          {/* बायाँ ठूलो समाचार */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[540px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 p-10 text-white">
                <span className="inline-block px-4 py-1 bg-red-600 text-sm font-bold mb-4 rounded">ब्रेकिङ</span>
                <h2 className="text-5xl font-bold leading-tight">राष्ट्रिय सभाको निर्वाचन नजिकिँदै</h2>
                <p className="mt-4 text-xl text-gray-200">दलहरूबीच तालमेल र उम्मेदवारी दर्ताको चटारो, निर्वाचन आयोगले मिति सार्वजनिक गर्ने</p>
              </div>
            </div>
          </div>

          {/* दायाँ सम्बन्धित मुख्य */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-[540px] p-6 flex flex-col">
              <h2 className="text-2xl font-bold mb-4">सम्बन्धित मुख्य समाचार</h2>
              <div className="h-px bg-gray-300 mb-5"></div>
              <div className="space-y-5 overflow-y-auto flex-1 pr-2">
                {relatedMukhya.map((item) => (
                  <div key={item.id} className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-gray-400 transition">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.textColor} ${item.color.split(' ')[0].replace('from-', 'bg-')}`}>
                      {item.category}
                    </span>
                    <h3 className="mt-3 font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* पहिलो ताजा समाचार (मुख्य पेजमा) */}
{/* पहिलो ताजा समाचार (मुख्य पेजमा) – अब तस्विरसहित */}
<div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-16">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-gray-900">ताजा समाचार</h2>
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
      <span className="text-red-600 font-bold text-lg">LIVE</span>
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        title: 'काठमाडौँ उपत्यकामा भारी वर्षा : बागमती करिडोर डुबानमा',
        time: '१५ मिनेट अघि',
        image: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        title: 'नेप्सेमा नयाँ कीर्तिमान, लगानीकर्तामा उत्साह',
        time: '४५ मिनेट अघि',
        image: 'https://images.pexels.com/photos/6801872/pexels-photo-6801872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        title: 'चीनसँगको व्यापार समझदारी : ५ अर्बको नयाँ सम्झौता',
        time: '१ घण्टा २० मिनेट अघि',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ].map((news, i) => (
      <div
        key={i}
        className="group cursor-pointer bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
      >
        {/* तस्विर */}
        <div
          className="h-52 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${news.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-bold">
            ब्रेकिङ
          </span>
        </div>

        {/* कन्टेन्ट */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {news.title}
          </h3>
          <div className="flex items-center justify-between mt-5">
            <span className="text-sm font-medium text-red-600">{news.time}</span>
            <ChevronRight className="text-blue-600 group-hover:translate-x-2 transition-transform" size={22} />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

        {/* ट्रेन्डिङ अन्तर्वार्ता */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg")' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-red-600 px-4 py-1 rounded text-sm font-bold">ट्रेन्डिङ</span>
                <h3 className="text-4xl font-bold mt-4">प्रधानमन्त्रीसँग विशेष कुराकानी</h3>
                <p className="mt-3 text-lg">आर्थिक सुधार, विदेश नीति र युवा रोजगारी</p>
              </div>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg")' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <span className="bg-yellow-500 text-black px-4 py-1 rounded text-sm font-bold">अन्तर्वार्ता</span>
                <h3 className="text-4xl font-bold mt-4">युवा उद्यमीको सफलता कथा</h3>
                <p className="mt-3 text-lg">नेपाली स्टार्टअपको नयाँ युग</p>
              </div>
            </div>
          </div>
        </div>

        {/* कला र संस्कृति सेक्सन */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">कला र संस्कृति</h1>
          <div className="h-1 w-32 bg-purple-600 rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[540px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg")' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 p-10 text-white">
                  <span className="inline-block px-4 py-1 bg-purple-600 text-sm font-bold mb-4 rounded">विशेष फोटो फिचर</span>
                  <h2 className="text-5xl font-bold leading-tight">दशैंको रौनक : नेपालभरिका रंगहरू</h2>
                  <p className="mt-4 text-xl text-gray-200">विजया दशमीको उत्साह, टीका, जमरा र मिठाईका तस्बिरहरू</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 h-[540px] p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-4">सम्बन्धित समाचार</h2>
                <div className="h-px bg-gray-300 mb-5"></div>
                <div className="space-y-5 overflow-y-auto flex-1">
                  {relatedMukhya.map((item) => (
                    <div key={item.id} className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${item.textColor} ${item.color.split(' ')[0].replace('from-', 'bg-')}`}>
                        {item.category}
                      </span>
                      <h4 className="mt-3 font-semibold text-gray-800 line-clamp-3">{item.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* कला र संस्कृति पछिको नयाँ ताजा समाचार */}
          <div className="mt-16 bg-white rounded-2xl shadow-2xl border border-gray-200 p-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">ताजा समाचार</h2>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-600 font-bold text-lg">LIVE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'काठमाडौँ उपत्यकामा फेरि भारी वर्षा, सडक डुबान',
                  time: '१५ मिनेट अघि',
                  image: 'https://images.pexels.com/photos/235621/pexels-photo-235621.jpeg',
                },
                {
                  title: 'नेपाली क्रिकेट टोली टी-२० विश्वकपको सेमिफाइनल नजिक',
                  time: '४५ मिनेट अघि',
                  image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
                },
                {
                  title: 'लुम्बिनीमा बुद्ध जयन्तीको भव्य तयारी',
                  time: '१ घण्टा अघि',
                  image: 'https://images.pexels.com/photos/3581365/pexels-photo-3581365.jpeg',
                },
              ].map((news, i) => (
                <div key={i} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition border">
                  <div className="h-52 bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }}></div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="flex justify-between items-center mt-5">
                      <span className="text-sm font-medium text-red-600">{news.time}</span>
                      <ChevronRight className="text-purple-600 group-hover:translate-x-2 transition" size={22} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* विविध सेक्सन */}
        <div className="mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">विविध</h1>
          <div className="h-1 w-32 bg-indigo-600 rounded-full"></div>

          <div className="mt-10 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-96">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg")' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white max-w-2xl">
                <h2 className="text-5xl font-bold leading-tight">हिमालको काखमा लुकेका रहस्यमयी गाउँहरू</h2>
                <p className="mt-5 text-xl">अन्नपूर्ण क्षेत्रका दुर्गम बस्तीहरूको दुर्लभ फोटो यात्रा</p>
              </div>
            </div>

            {/* विविध कारुसल */}
            <div className="bg-gray-100 p-10">
              <h3 className="text-2xl font-bold mb-8 text-gray-800">थप रोचक सामग्री</h3>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${currentSlide * (100 / 3)}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {carouselItems.flatMap((item) =>
                      [1, 2, 3].map((i) => (
                        <div key={`${item.id}-${i}`} className="w-full flex-shrink-0 px-3" style={{ width: "33.333%" }}>
                          <div
                            className="h-72 rounded-xl bg-cover bg-center shadow-lg hover:scale-105 transition-transform duration-300"
                            style={{ backgroundImage: `url(${item.image})` }}
                          >
                            <div className="h-full bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-6">
                              <p className="text-white font-bold text-lg">{item.title}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </motion.div>
                </div>

                <motion.button onClick={prevSlide} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ChevronLeft className="text-gray-800" />
                </motion.button>

                <motion.button onClick={nextSlide} className="absolute right-5 top-1/2 -translate-y1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <ChevronRight className="text-gray-800" />
                </motion.button>
              </div>

              <div className="flex justify-center gap-3 mt-10">
                {carouselItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-3 rounded-full transition-all ${currentSlide === i ? "bg-indigo-600 w-12" : "bg-gray-400 w-3"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Mukhya;