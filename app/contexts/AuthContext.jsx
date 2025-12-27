"use client";

// Authentication context using NextAuth
import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
