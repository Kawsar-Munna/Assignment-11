import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { FaTh, FaThList } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isTableLayout, setIsTableLayout] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading posts:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
    <Helmet>
      <title>All Posts</title>
    </Helmet>
    <div className="dark:bg-[#070e22]">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 py-10 ">
        {/* Header + Search + Layout Toggle */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#ffbd59]">
              All Volunteer Need Posts
            </h2>
            <p className="text-white mt-2 md:mt-1 max-w-2xl">
              Discover upcoming opportunities to make a difference in your community.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <input
              type="text"
              placeholder="Search by post title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-2 rounded shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={() => setIsTableLayout(!isTableLayout)}
              className="bg-[#070e22] text-[#ffbd59] px-4 py-2 rounded shadow hover:bg-[#1a1f38] transition items-center flex"
            >
              {isTableLayout ? (
                <FaThList className="inline-block mr-2" />
              ) : (
                <FaTh className="inline-block mr-2" />
              )}
              {isTableLayout ? "Card Layout" : "Table Layout"}
            </button>
          </div>
        </div>

        {/* Posts Layout */}
        {isTableLayout ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-left">
              <thead className="bg-[#070e22] text-[#ffbd59]">
                <tr>
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post._id} className="border-t">
                      <td className="py-2 px-4">
                        <img
                          src={post.thumbnail || "/images/default.jpg"}
                          alt={post.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>
                      <td className="py-2 px-4 font-semibold">{post.title}</td>
                      <td className="py-2 px-4">{post.category}</td>
                      <td className="py-2 px-4">{new Date(post.deadline).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{post.location}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => {
                            if (!post._id) {
                              toast.error("Invalid post.");
                              return;
                            }
                            if (!user) {
                              toast.warning("Please login to view details.");
                              navigate("/login");
                            } else {
                              navigate(`/posts/${post._id}`);
                            }
                          }}
                          className="bg-[#ffbd59] hover:bg-yellow-400 text-[#070e22] font-semibold py-1 px-3 rounded transition"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 font-semibold text-[#070e22]">
                      No posts matched your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.015]"
                >
                  <img
                    src={post.thumbnail || "/images/default.jpg"}
                    alt={post.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs bg-[#070e22] text-[#ffbd59] px-3 py-1 rounded-full uppercase font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Deadline: {new Date(post.deadline).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#070e22]">{post.title}</h3>
                    <p className="text-sm text-[#070e22]">Location: {post.location}</p>

                    <button
                      onClick={() => {
                        if (!post._id) {
                          toast.error("Invalid post.");
                          return;
                        }
                        if (!user) {
                          toast.warning("Please login to view details.");
                          navigate("/login");
                        } else {
                          navigate(`/posts/${post._id}`);
                        }
                      }}
                      className="mt-4 w-full bg-[#ffbd59] hover:bg-yellow-400 text-[#070e22] font-semibold py-2 px-4 rounded transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full text-white text-lg font-semibold">
                No posts matched your search.
              </div>
            )}
          </div>
        )}
      </section>
      <Footer />
    </div>
    </>
  );
};

export default AllPosts;
