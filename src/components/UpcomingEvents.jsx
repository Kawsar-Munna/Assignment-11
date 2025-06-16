const UpcomingEvents = () => {
    return (
      <section className="py-24px-4 md:px-8 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl  overflow-hidden grid md:grid-cols-2 ">
          {/* Left: Event Details */}
          <div className="p-8 md:p-10 flex flex-col justify-center bg-gray-50">
            {/* Floating Label */}
            <div className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold uppercase px-3 py-1 rounded-full w-max mb-4">
              Community Event
            </div>
  
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-800 leading-snug mb-4">
              Annual Charity Run
            </h2>
  
            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Step into change. Join hundreds in our annual charity run and
              support education, health, and shelter initiatives. Every step
              counts. Every stride matters.
            </p>
  
            {/* Stats (Optional) */}
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
              <span className="inline-flex items-center gap-1">
                🕓 <span>Sept 12, 2025 – 9:00 AM</span>
              </span>
              <span className="inline-flex items-center gap-1">
                📍 <span>Central Park, NY</span>
              </span>
            </div>
  
            {/* CTA */}
            <button className="w-max px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 hover:scale-105 transition duration-300 text-sm font-medium">
              Register Now
            </button>
          </div>
  
          {/* Right: Image Banner */}
          <div className="relative group overflow-hidden">
            <img
              src="/images/a.jpg"
              alt="Charity Event"
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
            />
            {/* Overlay gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            {/* Floating Tag on Image */}
            <div className="absolute bottom-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full shadow backdrop-blur-sm">
              🏃 5K Walk/Run
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default UpcomingEvents;
  