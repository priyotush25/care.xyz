"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

export default function NavbarClean() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "About" },
  ];

  if (session) nav.push({ href: "/my-bookings", label: "My Bookings" });

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-900">
          Care<span className="text-indigo-600">.xyz</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-semibold">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative pb-1 transition-colors ${
                isActive(n.href)
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              {n.label}
              {isActive(n.href) && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-semibold text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-md"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-gray-700"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg">Care.xyz</span>
              <button onClick={() => setOpen(false)}>
                <FiX size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-4 font-semibold text-gray-700">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`${
                    isActive(n.href)
                      ? "text-indigo-600"
                      : "hover:text-indigo-600"
                  }`}
                >
                  {n.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t pt-6">
              {session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 text-red-500 font-semibold"
                >
                  <FiLogOut /> Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="font-semibold"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
