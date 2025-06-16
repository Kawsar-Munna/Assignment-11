// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
const NotFound = () => {
  return (
    <>
    <Helmet>
      <title>404 Not Found</title>
    </Helmet>
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <p className="text-md text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all">
        Go Back Home
      </Link>
    </div>
    </>
  );
};

export default NotFound;
