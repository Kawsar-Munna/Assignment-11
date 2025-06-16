import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-[#ffbd59] py-10 px-6 dark:text-white">
      <div className="max-w-7xl mx-auto h-[1px] bg-gray-200 mb-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 text-white md:items-center md:justify-between">
        {/* Logo & Tagline */}
        <div className="text-[#ffbd59]">
          {/* Dynamic logo based on theme */}
          <div className="mb-2">
            <img
              src="/images/Logo.svg"
              alt="logo"
              className="w-auto h-[50px] p-0 dark:block hidden"
            />
            <img
              src="/images/logo2.svg"
              alt="logo-light"
              className="w-auto h-[50px] p-0 dark:hidden block"
            />
          </div>

          <h3 className="text-2xl font-bold">Kind & Connect</h3>
          <p className="text-sm mt-2 text-black dark:text-white">
            Connecting volunteers with causes that matter.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-[#ffbd59] hover:text-indigo-600">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-[#ffbd59] hover:text-indigo-600">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-[#ffbd59] hover:text-indigo-600">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-[#ffbd59] hover:text-indigo-600">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-sm font-semibold text-[#ffbd59] mb-3 uppercase tracking-wide">
            Explore
          </h4>
          <ul className="space-y-2 text-sm dark:text-white text-black">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/organizations" className="hover:underline">Organizations</a></li>
            <li><a href="/stories" className="hover:underline">Volunteer Stories</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold text-[#ffbd59] mb-3 uppercase tracking-wide">
            Stay Connected
          </h4>
          <p className="text-sm text-black dark:text-white mb-4">
            Subscribe to our newsletter for volunteer stories and updates.
          </p>
          <form className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 text-sm rounded-md hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 border-t pt-6 text-xs text-gray-400 text-center">
        &copy; {new Date().getFullYear()} HelpingHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
