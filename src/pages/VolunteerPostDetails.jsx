import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";
const VolunteerPostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`)
      
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        toast.error("Failed to load post details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!post) return <div className="text-center py-20 text-red-600">Post not found.</div>;

  const deadline = new Date(post.deadline);
  const isExpired = deadline < new Date();

  return (
    <>
    <Helmet>
      <title>Volunteer Post Details</title>
    </Helmet>
    <div className="bg-[#070e22]">
      <Navbar />
      <section className="max-w-4xl mx-auto p-6 my-10 bg-[#070e22] border border-gray-200 rounded-lg shadow-md">
        <img
          src={post.thumbnail || "/images/default.jpg"}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        <div className="space-y-4 ">
          <h2 className="text-3xl font-extrabold text-[#ffbd59]">
            {post.title}
          </h2>
          <p className="text-white text-lg">{post.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white mt-4  ">
            <p className="border p-2"><strong className="text-white">Category:</strong> <span className="text-[#ffbd59]"> {post.category}</span></p>
            <p className="border p-2"><strong className="text-white">Location:</strong> <span className="text-[#ffbd59]"> {post.location}</span></p>
            <p className="border p-2"><strong className="text-white">Deadline:</strong> <span className="text-[#ffbd59]"> {deadline.toLocaleDateString()}</span></p>
            <p className="border p-2"><strong className="text-white">Volunteers Needed: </strong> <span className="text-[#ffbd59]"> {post.volunteersNeeded}</span></p>
            <p className="border p-2"><strong className="text-white">Organizer Name: </strong> <span className="text-[#ffbd59]"> {post.organizerName}</span></p>
            <p className="border p-2"><strong className="text-white">Organizer Email: </strong> <span className="text-[#ffbd59]"> {post.organizerEmail}</span></p>
          </div>
        </div>

        <div className="mt-8 text-center">
          {isExpired ? (
            <p className="text-red-600 font-semibold">
              ⛔ This opportunity is closed. Deadline has passed.
            </p>
          ) : (
            <button
              onClick={() => navigate(`/be-a-volunteer/${post._id}`)}
              className="bg-[#ffbd59] hover:bg-yellow-400 text-[#070e22] font-semibold px-6 py-3  shadow transition w-full"
            >
              Be a Volunteer
            </button>
          )}
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default VolunteerPostDetails;
