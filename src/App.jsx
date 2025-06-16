import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import AddVolunteerPost from "./pages/AddVolunteerPost";
import AllPosts from "./pages/AllPosts";
import VolunteerPostDetails from "./pages/VolunteerPostDetails";
import BeAVolunteer from "./pages/BeAVolunteer";
import ManageMyPosts from "./pages/ManageMyPosts";
import UpdatePost from "./pages/UpdatePost";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-post" element={<PrivateRoute><AddVolunteerPost /></PrivateRoute>} />
      <Route path="/all-posts" element={<AllPosts />} />
      <Route path="/posts/:id" element={<PrivateRoute><VolunteerPostDetails /></PrivateRoute>} />
      <Route path="/be-a-volunteer/:id" element={<PrivateRoute><BeAVolunteer /></PrivateRoute>} />
      <Route path="/my-posts" element={<PrivateRoute><ManageMyPosts /></PrivateRoute>} />
      <Route path="/update-post/:id" element={<PrivateRoute><UpdatePost /></PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;
