import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-lg mb-8">Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="text-teal-500 hover:underline">
            Go back to Home
          </Link>
        </div>
      );
};