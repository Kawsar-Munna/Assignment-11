const VolunteerStory = () => {
    return (
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto relative flex flex-col md:flex-row items-center gap-10">
          {/* Left Vertical Title Bar */}
          <div className="flex flex-col items-start justify-center w-full md:w-1/3">
            <h2 className="text-4xl font-extrabold text-[#ffbd59] mb-4 leading-tight">
              Volunteer<br />Stories
            </h2>
            <div className="w-16 h-1 bg-indigo-500 rounded mb-4" />
            <p className="text-sm text-black dark:text-white leading-relaxed">
              Inspiring real-world impact from volunteers around the globe.
            </p>
          </div>
  
          {/* Right Image & Content Card */}
          <div className="relative w-full md:w-2/3 group">
            {/* Background Image */}
            <img
              src="/images/b.jpg"
              alt="Sophia"
              className="w-full h-[400px] object-cover rounded-2xl shadow-xl group-hover:scale-105 transition duration-500"
            />
  
            {/* Floating Story Card */}
            <div className="absolute bottom-6 left-6 bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-xl shadow-xl w-[90%] md:w-[75%]">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sophia’s Journey: Making a Difference
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                Sophia shares her story of volunteering at a local hospital and the life-changing impact it had on her. From small tasks to emotional connections — her story is one of purpose and discovery.
              </p>
              <a
                href="#"
                className="text-sm text-indigo-600 font-medium hover:underline inline-flex items-center"
              >
                Read Full Story <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default VolunteerStory;
  