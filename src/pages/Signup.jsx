import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Lottie from "lottie-react";
import animationData from "../assets/SignUp.json"; // update path if needed
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, photoURL } = form;

    if (!/[A-Z]/.test(password)) return setError("Password must include at least one uppercase letter.");
    if (!/[a-z]/.test(password)) return setError("Password must include at least one lowercase letter.");
    if (password.length < 6) return setError("Password must be at least 6 characters long.");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || "",
      });
      toast.success("✅ Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("❌ Failed to create account.");
    }
  };

  return (
    <>
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <Navbar />  
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-0">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Lottie Animation */}
        <div className="hidden md:block">
          <Lottie animationData={animationData} loop />
        </div>

        {/* Registration Form */}
        <div className="bg-white p-8 rounded-xl shadow-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>

          {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                placeholder="example@domain.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                value={form.photoURL}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                placeholder="https://your-photo-link.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </section>
    </> 
  );
};

export default Signup;
