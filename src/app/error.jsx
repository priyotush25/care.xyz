"use client";

// Global error boundary

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md text-center px-4">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Something Went Wrong
        </h1>
        <p className="text-gray-500 mb-8">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="btn btn-primary text-white shadow-lg shadow-indigo-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
