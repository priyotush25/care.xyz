"use client";

// Higher-order component to protect routes requiring authentication
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PrivateRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Store the intended destination
      const currentPath = window.location.pathname;
      sessionStorage.setItem("redirectAfterLogin", currentPath);
      router.push("/login");
    }
  }, [status, router]);

  // Show loading spinner while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Only render children if user is authenticated
  return status === "authenticated" ? children : null;
}
