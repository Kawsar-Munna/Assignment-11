import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/k.svg',
    title: 'Make a Difference Today',
    subtitle: 'Explore opportunities that match your skills and interests.',
    button: 'Explore Opportunities',
    link: '/opportunities',
  },
  {
    image: '/images/new-2.svg',
    title: 'Join Hands for a Better Tomorrow',
    subtitle: 'Your time can change someone’s life.',
    button: 'Get Started',
    link: '/get-started',
  },
  {
    image: '/images/new.svg',
    title: 'Be the Change You Wish to See',
    subtitle: 'Contribute to community growth and service.',
    button: 'See Projects',
    link: '/projects',
  },
  {
    image: '/images/new-1.svg',
    title: 'Empower Through Volunteering',
    subtitle: 'Discover events near you.',
    button: 'Find Events',
    link: '/events',
  },
];

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="rounded-2xl shadow-lg border-white border-[1px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-auto min-h-[550px] md:h-[550px] bg-gradient-to-r from-[#070e22] to-[#1a2b45] rounded-2xl flex flex-col-reverse md:flex-row items-center justify-between overflow-hidden px-4 md:px-12 py-8">

                {/* Background Glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffbd59]/40 via-transparent to-transparent z-0"
                />

                {/* Left: Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  className="w-full md:w-1/2 z-10 text-white text-center md:text-left p-4 md:p-10"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 leading-tight text-[#ffbd59]">
                    {slide.title}
                    <span className="block w-24 h-1 bg-[#ffbd59] mt-4 rounded-full mx-auto md:mx-0" />
                  </h2>
                  <p className="text-base md:text-lg mb-6 max-w-md mx-auto md:mx-0">
                    {slide.subtitle}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to={slide.link}
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-[0_0_10px_#ffbd59] transition"
                    >
                      {slide.button}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right: Image Section */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                  className="w-full md:w-1/2 flex items-center justify-center z-10"
                >
                  <motion.img
                    src={slide.image}
                    alt={slide.title}
                    className="w-5/6 sm:w-3/4 md:w-full max-h-[300px] md:max-h-full object-contain drop-shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
