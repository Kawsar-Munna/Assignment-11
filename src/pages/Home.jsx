import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import VolunteerNeeds from "../components/VolunteerNeeds";
import UpcomingEvents from "../components/UpcomingEvents";
import FeaturedOrganizations from "../components/FeaturedOrganizations";
import ImpactSection from "../components/ImpactSection";
import VolunteerStory from "../components/VolunteerStory";
import Footer from "../components/Footer";

const verticalFadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Kind&Connect</title>
      </Helmet>

      <div className="bg-white text-black dark:bg-[#070e22] min-h-screen">
        <Navbar />

        {/* Banner - animate on load only */}
        {/* <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Banner />
        </motion.div> */}
        <motion.div
  initial={{ opacity: 0, y: 100, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.8,
    type: "spring",
    stiffness: 80,
    damping: 12,
    bounce: 0.3,
  }}
>
  <Banner />
</motion.div>

        {/* All other sections scroll into view vertically */}
        <motion.div
          variants={verticalFadeIn(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <VolunteerNeeds />
        </motion.div>

        <motion.div
          variants={verticalFadeIn(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <UpcomingEvents />
        </motion.div>

        <motion.div
          variants={verticalFadeIn(0.3)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <FeaturedOrganizations />
        </motion.div>

        <motion.div
          variants={verticalFadeIn(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <ImpactSection />
        </motion.div>

        <motion.div
          variants={verticalFadeIn(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <VolunteerStory />
        </motion.div>

        <motion.div
          variants={verticalFadeIn(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Footer />
        </motion.div>
      </div>
    </>
  );
};

export default Home;
