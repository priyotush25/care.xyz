import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Care.xyz - Baby Sitting & Elderly Care Service Platform",
  description:
    "Professional and trusted care services for children, elderly, and family members. Book reliable caretakers for babysitting, elderly care, and home care services.",
  keywords:
    "baby care, elderly care, sick care, babysitting, home care, Bangladesh care services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased bg-white text-gray-900">
        <AuthProvider>
          {/* App Shell */}
          <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Main Content */}
            <main className="flex-1 w-full">{children}</main>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
