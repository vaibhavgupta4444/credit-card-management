import { Link } from "react-router";
import type { FC } from "react";


const NotFoundPage: FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-6">
            <div className="text-center max-w-lg">
                <h1 className="text-8xl font-extrabold text-purple-500 mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
                <p className="text-gray-400 mb-8">
                    Oops! The page you’re looking for doesn’t exist or was moved.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
export default NotFoundPage;