"use client";

// Footer component
import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/50 group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Care<span className="text-indigo-400">.xyz</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Providing reliable and trusted care services for your loved ones.
              Making caregiving easy, secure, and accessible for everyone in
              Bangladesh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Our Services", href: "/#services" },
                { label: "About Us", href: "/#about" },
                { label: "My Bookings", href: "/my-bookings" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium hover:translate-x-1 block duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                "Baby Care & Sitter",
                "Elderly & Senior Care",
                "Sick Patient Support",
                "Special Needs Care",
              ].map((service) => (
                <li
                  key={service}
                  className="text-slate-400 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <FiMail size={18} className="text-indigo-400 mt-0.5" />
                <span>support@care.xyz</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <FiPhone size={18} className="text-indigo-400 mt-0.5" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <FiMapPin size={18} className="text-indigo-400 mt-0.5" />
                <span>
                  House 12, Road 5,
                  <br />
                  Gulshan 1, Dhaka
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Care.xyz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
