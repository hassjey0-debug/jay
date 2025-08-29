import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaPaintBrush, FaServer } from 'react-icons/fa';
import { IoSpeedometer } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
  whatsappLink: string;
}

const ServiceCard = ({ icon, title, description, isDark, whatsappLink }: ServiceCardProps) => (
  <motion.a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className={`block p-6 rounded-2xl backdrop-blur-lg transition-all duration-300 group hover:scale-105 cursor-pointer ${
      isDark
        ? 'bg-white/5 hover:bg-white/10 border border-white/10'
        : 'bg-white/70 hover:bg-white/90 border border-gray-200 hover:shadow-xl'
    }`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-colors ${
      isDark
        ? 'bg-white/5 text-purple-400 group-hover:bg-white/10'
        : 'bg-purple-50 text-purple-500 group-hover:bg-purple-100'
    }`}>
      {icon}
    </div>
    <h3 className={`text-xl font-semibold mb-3 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {title}
    </h3>
    <p className={`${
      isDark ? 'text-gray-400' : 'text-gray-600'
    }`}>
      {description}
    </p>
  </motion.a>
);

interface ServicesProps {
  isDark: boolean;
}

const Services = ({ isDark }: ServicesProps) => {
  const services = [
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    },
    {
      icon: <FaMobileAlt className="w-7 h-7" />,
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps for iOS and Android.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    },
    {
      icon: <FaPaintBrush className="w-7 h-7" />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces that enhance user experience.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    },
    {
      icon: <FaServer className="w-7 h-7" />,
      title: "Backend Development",
      description: "Scalable and secure server-side solutions for your applications.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    },
    {
      icon: <IoSpeedometer className="w-7 h-7" />,
      title: "Performance Optimization",
      description: "Speed up your applications for better user engagement.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    },
    {
      icon: <MdSecurity className="w-7 h-7" />,
      title: "Security Solutions",
      description: "Protect your digital assets with our comprehensive security measures.",
      whatsappLink: "https://api.whatsapp.com/message/6IDRYRG7MWRMJ1?autoload=1&app_absent=0"
    }
  ];

  return (
    <section id="services" className={`py-20 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Our Services
          </h2>
          <p className={`max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We offer a comprehensive range of digital solutions to help your business thrive in the modern world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 