import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../contexts/AuthProvider";
import { ThemeContext } from "../contexts/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navLinks = (
    <>
      <NavLink to="/" className="nav-link hover:text-[#ffbd59] transition">Home</NavLink>
      <NavLink to="/all-posts" className="nav-link hover:text-[#ffbd59] transition">All Posts</NavLink>
      <NavLink to="/contact" className="nav-link hover:text-[#ffbd59] transition">Contact</NavLink>
    </>
  );

  return (
    <nav className="bg-white dark:bg-[#070e22] dark:text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={darkMode ? "/images/Logo.svg" : "/images/logo2.svg"}
            alt="logo"
            className="w-auto h-[50px]"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12 items-center font-medium text-[#070e22] dark:text-white">
          {navLinks}
        </div>

        {/* Right Side (Theme + Auth) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-xl text-gray-700 dark:text-yellow-300 hover:scale-110 transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          {!user ? (
            <div className="flex gap-4">
              <Link to="/signup" className="btn-primary text-[#070e22] dark:text-white hover:text-[#ffbd59] transition">Sign Up</Link>
              <Link to="/login" className="btn-outline text-[#070e22] dark:text-white hover:text-[#ffbd59] transition">Login</Link>
            </div>
          ) : (
            <div className="relative group">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-blue-300 cursor-pointer"
              />
              <div className="absolute hidden group-hover:block right-0 mt-0.5 w-52 bg-white dark:bg-[#1a1a2e] border rounded shadow-md z-50 p-3">
                <p className="mb-2 text-sm text-gray-800 dark:text-white font-semibold">
                  {user.displayName || "Anonymous"}
                </p>
                <Link to="/add-post" className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Add Volunteer Post
                </Link>
                <Link to="/my-posts" className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Manage My Posts
                </Link>
                <button
                  onClick={logout}
                  className="text-red-500 text-sm hover:underline mt-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        {/* <div className="md:hidden text-2xl cursor-pointer text-[#ffbd59]" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div> */}
        <div className="md:hidden flex items-center gap-4 text-2xl text-[#ffbd59]">
  <button
    onClick={toggleTheme}
    className="text-xl text-gray-700 dark:text-yellow-300 hover:scale-110 transition"
    aria-label="Toggle Theme"
  >
    {darkMode ? <FiSun /> : <FiMoon />}
  </button>
  <div className="cursor-pointer" onClick={toggleMenu}>
    {menuOpen ? <FiX /> : <FiMenu />}
  </div>
</div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#070e22] border-t border-[#ffbd59] px-4 pb-4 flex flex-col gap-3 text-[#070e22] dark:text-white font-medium">
          <NavLink to="/" className="block py-1" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/all-posts" className="block py-1" onClick={() => setMenuOpen(false)}>All Posts</NavLink>
          <NavLink to="/contact" className="block py-1" onClick={() => setMenuOpen(false)}>Contact</NavLink>

          {/* Theme Toggle */}
          {/* <button
            onClick={() => { toggleTheme(); setMenuOpen(false); }}
            className="flex items-center gap-2 mt-2"
          >
            {darkMode ? <FiSun /> : <FiMoon />} <span>Toggle Theme</span>
          </button> */}

          {!user ? (
            <>
              <Link to="/signup" className="block btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              <Link to="/login" className="block btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
            </>
          ) : (
            <>
              <Link to="/add-post" className="block py-1" onClick={() => setMenuOpen(false)}>Add Post</Link>
              <Link to="/my-posts" className="block py-1" onClick={() => setMenuOpen(false)}>Manage My Posts</Link>
              <button onClick={() => { logout(); setMenuOpen(false); }} className="text-[#ffbd59] py-1 border border-[#ffbd59] text-center">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
