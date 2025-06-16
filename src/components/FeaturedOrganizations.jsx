const organizations = [
    {
      name: "Helping Hands Foundation",
      description: "Helping Hands supports underserved communities with education and food access.",
      image: "/images/A (1).jpg",
    },
    {
      name: "Green Earth Initiative",
      description: "Green Earth restores forests and promotes sustainability worldwide.",
      image: "/images/A (2).jpg",
    },
    {
      name: "Hope Shelter Network",
      description: "Hope Shelter provides housing and care to families in crisis.",
      image: "/images/A (3).jpg",
    },
    {
      name: "Ocean Protectors",
      description: "Ocean Protectors keeps coastlines clean and educates about marine conservation.",
      image: "/images/A (4).jpg",
    },
  ];
  
  const FeaturedOrganizations = () => {
    return (
      <section className="py-20 px-6  ">
        {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Organizations
        </h2> */}
        {/* <div className="text-left mb-12 max-w-7xl mx-auto">
  <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
    Featured <br /> Organizations
  </h2>
  <div className="w-16 h-1 bg-indigo-500 mt-2 rounded" />
  <p className="text-sm text-gray-500 mt-2">
    Discover the missions and impact of inspiring organizations around the world.
  </p>
  
</div> */}
<div className="grid grid-cols-1 md:grid-cols-2 items-center mb-12 max-w-7xl mx-auto px-4">
  {/* Left: Heading */}
  <div>
    <h2 className="text-4xl font-extrabold text-[#ffbd59] mb-2">
      Featured <br /> Organizations
    </h2>
    <div className="w-16 h-1 bg-indigo-500 mb-2 rounded" />
    <p className="text-sm text-black dark:text-white">
      Discover the missions and impact of inspiring organizations around the world.
    </p>
  </div>

  {/* Right: Tag filters or stat or button */}
  <div className="mt-6 md:mt-0 flex lg:justify-end justify-center">
    {/* Insert one of the ideas here */}
    <div className="text-sm italic text-black dark:text-white max-w-xs text-center">
  “Being featured here helped us reach more people and raise more support.”
  <br /> <span className="font-medium text-[#ffbd59]">— Hope Shelter Team</span>
</div>

  </div>
</div>

  
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {organizations.map((org, idx) => (
            <div key={idx} className="relative bg-white rounded-xl shadow-md overflow-hidden">
              {/* Image */}
              <img
                src={org.image}
                alt={org.name}
                className="w-full h-60 object-cover"
              />
  
              {/* Text Box */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {org.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{org.description}</p>
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturedOrganizations;
  