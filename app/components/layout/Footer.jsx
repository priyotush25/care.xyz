"use client";

import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
} from "react-icons/fi";

export default function FooterNew() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-indigo-50 via-white to-indigo-100 text-gray-700">
      <div className="container mx-auto px-6 pt-20 pb-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                C
              </div>
              <span className="text-2xl font-extrabold text-gray-900">
                Care<span className="text-indigo-600">.xyz</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Trusted and compassionate care services for families across
              Bangladesh. We connect you with verified caregivers you can rely
              on.
            </p>

            <div className="flex items-center gap-3 mt-6 text-sm text-gray-500">
              <FiHeart className="text-pink-500" />
              <span>Care with responsibility & love</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              {[
                ["Home", "/"],
                ["Services", "/#services"],
                ["About", "/#about"],
                ["My Bookings", "/my-bookings"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Care Services</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Baby & Child Care",
                "Elderly Assistance",
                "Patient Support",
                "Special Needs Care",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-900 mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FiMail className="text-indigo-500 mt-0.5" />
                support@care.xyz
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-indigo-500 mt-0.5" />
                +880 1234-567890
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-indigo-500 mt-0.5" />
                Gulshan-1, Dhaka
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {year} Care.xyz. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-indigo-600">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
