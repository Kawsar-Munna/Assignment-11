import CountUp from 'react-countup';
import {
  FaUsers,
  FaHandsHelping,
  FaRegSmile,
  FaTasks,
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaUsers className="text-white text-2xl" />,
    value: 1500,
    label: 'Registered Volunteers',
    bg: 'bg-blue-500',
  },
  {
    icon: <FaHandsHelping className="text-white text-2xl" />,
    value: 120,
    label: 'Successful Campaigns',
    bg: 'bg-green-500',
  },
  {
    icon: <FaTasks className="text-white text-2xl" />,
    value: 300,
    label: 'Ongoing Projects',
    bg: 'bg-purple-500',
  },
  {
    icon: <FaRegSmile className="text-white text-2xl" />,
    value: 2000,
    label: 'Lives Touched',
    bg: 'bg-yellow-400',
  },
];

const ImpactSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="md:flex justify-between items-start mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-extrabold text-[#ffbd59] leading-snug">
              Our Impact
              <span className="block w-16 h-1 bg-indigo-500 mt-2 rounded-full" />
            </h2>
            <p className="mt-2 text-black dark:text-white max-w-md">
              Here’s how Helping Hands is making a difference in communities through volunteering.
            </p>
          </div>
          <blockquote className="mt-6 md:mt-0 text-black dark:text-white italic max-w-sm text-right">
            “We’ve been able to connect with hundreds of volunteers and donors.”
            <footer className="mt-2 text-[#ffbd59] font-semibold not-italic">
              — Project Outreach Team
            </footer>
          </blockquote>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl shadow-md p-6 text-center transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${item.bg} shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-gray-800 mb-1">
                <CountUp end={item.value} duration={2} />+
              </h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
