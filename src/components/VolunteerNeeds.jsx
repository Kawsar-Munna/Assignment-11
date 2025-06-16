import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthProvider";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

const VolunteerNeeds = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/volunteer-posts`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setPosts(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching volunteer posts:", err);
        toast.error("Failed to load volunteer posts.");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <Spinner />;

  if (!posts.length)
    return <p className="text-center py-10 text-gray-500">No volunteer needs found.</p>;

  return (
    <section className="py-10 px-5">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#ffbd59] mb-2">
          Volunteer Needs
          </h2>
          <p className="text-black dark:text-white md:text-lg">
            Here’s how you can contribute to local communities through volunteering.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 6).map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg border overflow-hidden transition-all"
            >
              {/* Image */}
              <motion.div
                className="relative h-64 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <motion.img
                  src={post.thumbnail || "/images/default.jpg"}
                  alt={post.title}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#070e22] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-md">
                  {post.category}
                </span>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center p-16 pt-[160px]">
                  <h3 className="absolute bottom-0 left-0 text-white text-xl font-bold uppercase text-[#ffbd59] px-4 py-1 w-full text-center">
                    {post.title}
                  </h3>
                </div>
              </motion.div>

              {/* Info Section */}
              <div className="bg-[#070e22] px-4 py-4 space-y-4 text-sm text-white h-full">
                {post.description && (
                  <p className="text-lg mt-1 line-clamp-2 text-[#ffbd59]">{post.description}</p>
                )}
                <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
                {post.time && <p><strong>Time:</strong> {post.time}</p>}
                <p><strong>Location:</strong> {post.location}</p>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (!post._id) {
                        toast.error("Invalid post ID.");
                        return;
                      }
                      if (!user) {
                        toast.warning("You must be logged in to view post details.");
                        return navigate("/login");
                      }
                      navigate(`/posts/${post._id}`);
                    }}
                    className="text-[#ffbd59] font-semibold hover:underline transition text-sm"
                  >
                    View Details →
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const today = new Date();
                      const deadline = new Date(post.deadline);
                      if (deadline >= today) {
                        navigate(`/be-a-volunteer/${post._id}`);
                      } else {
                        toast.error("This post's deadline has passed. You cannot volunteer.");
                      }
                    }}
                    className="bg-gray-900 text-[#ffbd59] px-3 py-2 rounded hover:bg-gray-800 transition text-sm"
                  >
                    Volunteer Today
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Button */}
        {posts.length > 6 && (
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/all-posts")}
              className="bg-[#ffbd59] text-black px-6 py-2 rounded hover:bg-yellow-500 font-semibold transition"
            >
              See All
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default VolunteerNeeds;
