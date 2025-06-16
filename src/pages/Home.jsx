import Banner from "../components/Banner";
import VolunteerNeeds from "../components/VolunteerNeeds";
import FeaturedOrganizations from "../components/FeaturedOrganizations";
import UpcomingEvents from "../components/UpcomingEvents";
import VolunteerStory from "../components/VolunteerStory";  
import Footer from "../components/Footer";
import ImpactSection from "../components/ImpactSection";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";
const Home = () => {
  return (
    <>
    <Helmet>
      <title>Kind&Connect</title>
    </Helmet>
    <div className="bg-white text-black dark:bg-[#070e22] ">
      <Navbar />
      <Banner />
      <VolunteerNeeds />
      <UpcomingEvents />
      <FeaturedOrganizations />
      <ImpactSection />
      <VolunteerStory />
      <Footer />
      {/* Other sections go here */}
    </div>
    </>
  );
};

export default Home;
