import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, githubProvider, facebookProvider } from "../firebase";
import Lottie from "lottie-react";
import animationData from "../assets/Login_Animation.json";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Helmet } from "react-helmet-async";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Placeholder for actual login logic
  //   if (form.email && form.password) {
  //     toast.success("✅ Logged in successfully!");
  //     navigate("/");
  //   } else {
  //     toast.error("❌ Invalid login credentials.");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    return toast.error("❌ Email and password required.");
  }

  try {
    const result = await signInWithEmailAndPassword(auth, form.email, form.password);
    const user = result.user;
    const token = await user.getIdToken(); // 🔐 Get JWT token from Firebase
    localStorage.setItem("access-token", token); // 💾 Store token locally

    toast.success("✅ Logged in successfully!");
    navigate("/");
  } catch (error) {
    console.error("Login error:", error.message);
    toast.error("❌ Invalid email or password.");
  }
};


  // const socialLogin = async (provider) => {
  //   try {
  //     await signInWithPopup(auth, provider);
  //     toast.success("🎉 Login successful!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Social login error:", error.message);
  //     toast.error("❌ Social login failed.");
  //   }
  // };
const socialLogin = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    localStorage.setItem("access-token", token);
    console.log(localStorage.getItem("access-token"));
    toast.success("🎉 Login successful!");
    navigate("/");
  } catch (error) {
    console.error("Social login error:", error.message);
    toast.error("❌ Social login failed.");
  }
};

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="dark:bg-[#070e22]">
      <Navbar />
      <section className="min-h-screen flex items-center justify-center dark:bg-gradient-to-br from-gray-100 to-indigo-100 px-4">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Illustration */}
          <div className="hidden md:block">
            <Lottie animationData={animationData} loop />
          </div>

          {/* Login Form */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="example@domain.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 transition"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center text-gray-600 mt-5">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                Register now
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-gray-400 text-sm">or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => socialLogin(googleProvider)}
                className="w-full bg-white border px-4 py-2 rounded shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition"
              >
                <FaGoogle className="text-red-500 text-xl" />
                <span className="text-sm font-medium text-gray-700">Continue with Google</span>
              </button>
              <button
                onClick={() => socialLogin(githubProvider)}
                className="w-full bg-gray-900 text-white px-4 py-2 rounded shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition"
              >
                <FaGithub className="text-xl" />
                <span className="text-sm font-medium">Continue with GitHub</span>
              </button>
              <button
                onClick={() => socialLogin(facebookProvider)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow-sm hover:shadow-md flex items-center justify-center gap-2 transition"
              >
                <FaFacebook className="text-xl" />
                <span className="text-sm font-medium">Continue with Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    </>
  );
};

export default Login;
