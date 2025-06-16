import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const ManageMyPosts = () => {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
  try {
    const token = localStorage.getItem("access-token");

    const [postRes, requestRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_BASE_URL}/my-posts?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${import.meta.env.VITE_API_BASE_URL}/my-requests?email=${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    if (postRes.status === 401 || postRes.status === 403 || requestRes.status === 401 || requestRes.status === 403) {
      Swal.fire("Unauthorized!", "Please login again.", "error");
      return;
    }

    const postData = await postRes.json();
    const requestData = await requestRes.json();
    setMyPosts(postData);
    setMyRequests(requestData);
  } catch (error) {
    Swal.fire("Oops!", "Failed to load your data. Please try again.", "error");
  } finally {
    setLoading(false);
  }
};


  const handleCancel = async (id) => {
    const token = localStorage.getItem("access-token");
    Swal.fire({
      title: "Cancel Request?",
      text: "Are you sure you want to cancel this volunteer request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("access-token");
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/requests/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
          fetchData();
        }
      }
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access-token");
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your post has been deleted.", "success");
          fetchData();
        }
      }
    });
  };

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;

  return (
    <>
    <Helmet>
      <title>Manage My Posts</title>
    </Helmet>
    <div className="dark:bg-[#070e22]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* My Posts Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-[#070e22]">
              My <span className="text-[#ffbd59]">Volunteer Need Posts</span>
            </h2>
            <p className="text-gray-500 mt-2">Manage or update your created posts</p>
          </div>

          {myPosts.length === 0 ? (
            <div className="text-center text-gray-500 py-6 bg-white rounded shadow">
              You haven’t created any posts yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#070e22] text-white uppercase">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Volunteers</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post, idx) => (
                    <tr key={post._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4">{post.title}</td>
                      <td className="p-4">{post.category}</td>
                      <td className="p-4">{post.volunteersNeeded}</td>
                      <td className="p-4 space-x-2">
                        <Link to={`/update-post/${post._id}`}>
                          <button className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 text-sm font-medium">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* My Requests Section */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-[#070e22]">
              My <span className="text-[#ffbd59]">Volunteer Requests</span>
            </h2>
            <p className="text-gray-500 mt-2">Track and manage your request history</p>
          </div>

          {myRequests.length === 0 ? (
            <div className="text-center text-gray-500 py-6 bg-white rounded shadow">
              You haven’t submitted any volunteer requests yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded shadow">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-[#070e22] text-white uppercase">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Organizer</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map((req, idx) => (
                    <tr key={req._id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4">{req.title}</td>
                      <td className="p-4">{req.organizerName}</td>
                      <td className="p-4 capitalize text-blue-600">{req.status}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleCancel(req._id)}
                          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default ManageMyPosts;
