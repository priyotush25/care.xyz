// 404 Not Found Page
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-indigo-100 mb-4 animate-float select-none">
          404
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>
        <Link
          href="/"
          className="btn btn-lg btn-primary text-white shadow-xl shadow-indigo-200"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
