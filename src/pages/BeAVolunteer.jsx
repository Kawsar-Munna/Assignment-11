import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const BeAVolunteer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post details
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch post:", err);
        toast.error("Failed to load post");
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const suggestion = form.suggestion.value;

    if (post.volunteersNeeded <= 0) {
      toast.warning("No more volunteers needed for this post.");
      return;
    }

    const volunteerRequest = {
      postId: id,
      title: post.title,
      thumbnail: post.thumbnail,
      description: post.description,
      category: post.category,
      location: post.location,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion,
      status: "requested",
    };

    try {
      const token = localStorage.getItem("access-token");

      if (!token) {
        toast.error("You're not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(volunteerRequest),
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorized! Please login again.");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Your volunteer request has been submitted!");
        form.reset();
        setTimeout(() => navigate("/all-posts"), 1500);
      } else {
        toast.error(data.message || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  if (!post) return <div className="text-center mt-10 text-red-600">Post not found.</div>;

  return (
    <>
    <Helmet>
      <title>Be a Volunteer</title>
    </Helmet>
    <div className="bg-[#070e22] py-0 h-auto">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 rounded-xl shadow-lg my-2 border border-gray-200 bg-[#070e22] border-b-2 border-gray-600 mb-16">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center">
          Be a Volunteer for: <span className="text-[#ffbd59]">{post.title}</span>
        </h2>

        {post.volunteersNeeded <= 0 ? (
          <div className="text-red-500 font-semibold text-center py-6">
            ❌ No more volunteers needed for this post.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
            {/* Left Column */}
            <div className="space-y-4">
              <Input label="Post Title" value={post.title} />
              <Input label="Category" value={post.category} />
              <Input label="Location" value={post.location} />
              <Input label="Volunteers Needed" value={post.volunteersNeeded} />
              <Input label="Deadline" value={new Date(post.deadline).toLocaleDateString()} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <Input label="Your Name" value={user?.displayName} />
              <Input label="Your Email" value={user?.email} />
              <Input label="Organizer Name" value={post.organizerName} />
              <Input label="Organizer Email" value={post.organizerEmail} />
              <div>
                <label className="text-lg font-semibold text-[#ffbd59]">
                  Why do you want to volunteer?
                </label>
                <textarea
                  name="suggestion"
                  required
                  placeholder="Tell us why you're interested..."
                  className="w-full mt-1 px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 text-center mt-4">
              <button
                type="submit"
                className="bg-[#ffbd59] hover:bg-yellow-500 text-[#070e22] font-bold px-8 py-3 rounded shadow-md transition"
              >
                Submit Volunteer Request
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
};

const Input = ({ label, value }) => (
  <div>
    <label className="text-lg font-semibold text-[#ffbd59]">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded focus:outline-none"
    />
  </div>
);

export default BeAVolunteer;
