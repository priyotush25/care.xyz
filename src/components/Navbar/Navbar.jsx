"use client";

// Navigation bar with NextAuth authentication
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiCalendar,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    setUserMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#about", label: "About" },
  ];

  if (session) {
    navLinks.push({ href: "/my-bookings", label: "My Bookings" });
  }

  const isActive = (href) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm"
          : "bg-white/50 backdrop-blur-sm border-b border-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group z-50">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="font-bold text-xl text-white">C</span>
            </div>
            <span
              className={`text-2xl font-bold tracking-tight font-display transition-colors ${
                scrolled ? "text-gray-900" : "text-gray-900"
              }`}
            >
              Care<span className="text-indigo-600">.xyz</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-white/50 backdrop-blur-md shadow-sm ring-1 ring-black/5 mx-auto absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-indigo-700 bg-indigo-50 shadow-sm"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-white/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4 z-50">
            {status === "loading" ? (
              <div className="w-10 h-10 animate-pulse rounded-full bg-gray-200"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 pl-1 pr-3 py-1 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full hover:shadow-md transition-all group ring-1 ring-gray-100"
                >
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm ring-2 ring-white">
                    <span className="font-semibold text-sm">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="font-medium text-sm text-gray-700 max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                  <FiChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-72 bg-white/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl shadow-indigo-900/10 border border-white/50 origin-top-right ring-1 ring-black/5"
                    >
                      <div className="px-4 py-4 bg-linear-to-br from-indigo-50 to-purple-50 rounded-xl mb-2 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm font-bold border border-indigo-100">
                          {session.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-900 truncate">
                            {session.user?.name}
                          </p>
                          <p
                            className="text-xs text-gray-500 truncate"
                            title={session.user?.email}
                          >
                            {session.user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/my-bookings"
                          className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white text-gray-600 hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <FiCalendar />
                          </div>
                          <span className="font-medium">My Bookings</span>
                        </Link>

                        {session.user?.role === "admin" && (
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-white text-gray-600 hover:text-indigo-600 hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                              <FiShield />
                            </div>
                            <span className="font-medium">Admin Dashboard</span>
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors group mt-2"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <FiLogOut />
                          </div>
                          <span className="font-medium">Log out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-5 py-2.5 font-bold text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="btn btn-md btn-primary text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors z-50 bg-white/50 backdrop-blur-md rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-2xl border-t border-gray-100 absolute top-full left-0 w-full shadow-2xl rounded-b-3xl"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between text-lg font-bold py-3 border-b border-gray-50 transition-colors ${
                        isActive(link.href)
                          ? "text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <div className="h-4" />

                {session ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold shadow-sm">
                        {session.user?.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>

                    {session.user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="w-full py-4 flex items-center justify-center space-x-2 text-purple-600 bg-purple-50/50 border border-purple-100 rounded-xl font-bold active:scale-95 transition-transform hover:bg-purple-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FiShield size={20} />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-4 flex items-center justify-center space-x-2 text-red-500 bg-red-50/50 border border-red-100 rounded-xl font-bold active:scale-95 transition-transform hover:bg-red-50"
                    >
                      <FiLogOut />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/login"
                      className="flex items-center justify-center py-4 font-bold text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-md btn-primary text-white shadow-lg w-full h-full"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
