import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const AddVolunteerPost = () => {
  const { user } = useAuth();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleAddPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    const token = localStorage.getItem("access-token");
    console.log(token);

    const newPost = {
      thumbnail: form.thumbnail.value,
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      location: form.location.value,
      volunteersNeeded: parseInt(form.volunteersNeeded.value),
      deadline: deadline.toISOString(),
      organizerName: user?.displayName || "Unknown",
      organizerEmail: user?.email || "Unknown",
    };

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Post added successfully!");
        form.reset();
        setDeadline(new Date());
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Helmet>
      <title>Add Volunteer Post</title>
    </Helmet> 

    <div className="bg-white text-black dark:bg-[#070e22] dark:text-white ">
    <Navbar />
    <div className="max-w-3xl mt-4  mx-auto p-6 shadow-lg rounded-xl my-12 border border-gray-200 text-white dark:bg-[#070e22] dark:text-white ">
  
      <h2 className="text-3xl font-extrabold text-[#ffbd59] mb-6 text-center">
        Add Volunteer Need <span className="text-[#ffbd59]">Post</span>
      </h2>

      <form onSubmit={handleAddPost} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-[#ffbd59] mb-2">Thumbnail URL</label>
          <input name="thumbnail" placeholder="Enter image URL" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#ffbd59] mb-2">Post Title</label>
          <input name="title" placeholder="Enter title" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#ffbd59] mb-2">Description</label>
          <textarea name="description" rows="4" placeholder="Enter description..." className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#ffbd59] mb-2">Category</label>
          <select name="category" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required>
            <option value="">Select a category</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Social Service</option>
            <option>Animal Welfare</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-[#ffbd59] mb-2">Location</label>
            <input name="location" placeholder="Enter location" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required />
          </div>

          <div>
            <label className="block text-lg font-medium text-[#ffbd59] mb-2">No. of Volunteers Needed</label>
            <input name="volunteersNeeded" type="number" placeholder="e.g. 5" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg" required />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-[#ffbd59] mb-2">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black text-lg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-medium text-[#ffbd59] mb-2">Organizer Name</label>
            <input value={user?.displayName || ""} readOnly className="w-full px-4 py-2 bg-gray-100 border rounded text-black text-lg" />
          </div>
          <div>
            <label className="block text-lg font-medium text-[#ffbd59] mb-2">Organizer Email</label>
            <input value={user?.email || ""} readOnly className="w-full px-4 py-2 bg-gray-100 border rounded text-black text-lg" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ffbd59] hover:bg-yellow-400 text-[#070e22] font-semibold py-3 rounded transition"
        >
          {loading ? "Adding..." : "Add Post"}
        </button>
      </form>
    </div>
    <Footer />
      </div>
      </>
      );
      
};

export default AddVolunteerPost;
