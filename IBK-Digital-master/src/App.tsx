import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { HiOutlinePlay, HiArrowRight } from 'react-icons/hi';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen font-['DM_Sans'] transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Hero isDark={isDark} toggleTheme={toggleTheme} />
      <Services isDark={isDark} />
      <Projects isDark={isDark} />
      <Testimonials isDark={isDark} />
      
      {/* Entertainment Hub Section */}
      <section className={`py-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={`inline-block px-4 py-2 rounded-full mb-4 ${
                isDark
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-purple-400'
                  : 'bg-purple-50 text-purple-600'
              }`}>
                Entertainment Hub
              </span>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                Premium Entertainment
              </h2>
              <p className={`text-lg mb-8 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Discover our premium streaming packages and unlock a world of unlimited entertainment. Experience the best in movies, shows, sports, and more.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/entertainment"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Packages <HiArrowRight className="w-5 h-5" />
                </motion.a>
                
                <motion.button
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border-2 ${
                    isDark
                      ? 'border-gray-700 hover:border-purple-500 text-gray-300'
                      : 'border-gray-200 hover:border-purple-500 text-gray-600'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Demo <HiOutlinePlay className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={`relative rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-800/50' : 'bg-white/50'
              } backdrop-blur-lg border ${
                isDark ? 'border-gray-700/50' : 'border-gray-200'
              }`}>
                <img
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Entertainment Preview"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                
                {/* Feature Cards */}
                <div className="absolute bottom-0 left-0 right-0 p-6 grid grid-cols-2 gap-4">
                  {[
                    { title: "4K Quality", value: "Ultra HD" },
                    { title: "Content Library", value: "10,000+" },
                    { title: "Live Channels", value: "200+" },
                    { title: "Languages", value: "Multiple" }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className={`p-4 rounded-xl backdrop-blur-sm ${
                        isDark
                          ? 'bg-gray-800/50 border border-gray-700/50'
                          : 'bg-white/50 border border-gray-200'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {feature.title}
                      </p>
                      <p className="text-lg font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                        {feature.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full blur-2xl opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer isDark={isDark} />
    </div>
  );
}

export default App;