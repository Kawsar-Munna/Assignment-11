import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [deadline, setDeadline] = useState(new Date());

  // Fetch post data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setDeadline(new Date(data.deadline));
      })
      .catch((error) => {
        console.error("Error loading post:", error);
        toast.error("Failed to load post");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const token = localStorage.getItem("access-token");

    if (!token) {
      toast.error("You're not logged in. Please login again.");
      navigate("/login");
      return;
    }

    const updatedPost = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline.toISOString(),
      organizerName: user.displayName,
      organizerEmail: user.email,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("✅ Post updated successfully!");
        navigate("/my-posts");
      } else {
        toast.info("No changes made.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("❌ Failed to update post.");
    }
  };

  if (!post) return <div className="text-center py-20 text-lg font-semibold">Loading...</div>;

  return (
    <>
      <Helmet>
        <title>Update Post</title>
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-[#f9fafb] py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-[#070e22] mb-8">
            Update <span className="text-[#ffbd59]">Volunteer Need Post</span>
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <Input name="thumbnail" label="Thumbnail URL" defaultValue={post.thumbnail} />
            <Input name="title" label="Post Title" defaultValue={post.title} />
            <Textarea name="description" label="Description" defaultValue={post.description} />

            <div>
              <label className="block mb-1 font-medium text-[#070e22]">Category</label>
              <select
                name="category"
                defaultValue={post.category}
                className="w-full px-4 py-2 border rounded text-black focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option>Healthcare</option>
                <option>Education</option>
                <option>Social Service</option>
                <option>Animal Welfare</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="location" label="Location" defaultValue={post.location} />
              <Input name="volunteersNeeded" label="Volunteers Needed" type="number" defaultValue={post.volunteersNeeded} />
            </div>

            <div>
              <label className="block mb-1 font-medium text-[#070e22]">Deadline</label>
              <DatePicker
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                className="w-full px-4 py-2 border rounded text-black focus:ring-2 focus:ring-yellow-400"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReadOnlyInput label="Organizer Name" value={user?.displayName || ""} />
              <ReadOnlyInput label="Organizer Email" value={user?.email || ""} />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#ffbd59] hover:bg-yellow-400 text-[#070e22] font-bold rounded shadow transition"
            >
              Update Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const Input = ({ name, label, defaultValue, type = "text" }) => (
  <div>
    <label className="block mb-1 font-medium text-[#070e22]">{label}</label>
    <input
      name={name}
      type={type}
      defaultValue={defaultValue}
      className="w-full px-4 py-2 border rounded text-black focus:ring-2 focus:ring-yellow-400"
      required
    />
  </div>
);

const Textarea = ({ name, label, defaultValue }) => (
  <div>
    <label className="block mb-1 font-medium text-[#070e22]">{label}</label>
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows="4"
      className="w-full px-4 py-2 border rounded text-black focus:ring-2 focus:ring-yellow-400"
      required
    ></textarea>
  </div>
);

const ReadOnlyInput = ({ label, value }) => (
  <div>
    <label className="block mb-1 font-medium text-[#070e22]">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full px-4 py-2 bg-gray-100 border rounded text-black"
    />
  </div>
);

export default UpdatePost;
