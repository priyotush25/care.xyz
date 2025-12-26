// Service Detail Page
import Link from "next/link";
import { servicesData } from "@/lib/data/sampleData";

import { notFound } from "next/navigation";
import Image from "next/image"; // Assuming we have images setup or fallback

// Generate static params for all services
export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.name} | Care.xyz`,
    description: service.description,
    keywords: `${service.name}, ${service.category}, Bangladesh care services, professional caregivers`,
    openGraph: {
      title: service.name,
      description: service.description,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceIcons = {
    "baby-care": "👶",
    "elderly-care": "👴",
    "sick-care": "🏥",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-indigo-900 to-purple-900 text-white py-24 relative overflow-hidden">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-6xl mx-auto mb-8 shadow-xl border border-white/20 animate-float">
              {serviceIcons[service.category]}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              {service.name}
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features */}
              <div className="bg-white rounded-4xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-indigo-500 rounded-full"></span>
                  Service Features
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-gray-50 p-4 rounded-xl"
                    >
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 mr-3 shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-4xl p-8 lg:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-8 bg-pink-500 rounded-full"></span>
                  Why Choose This Service?
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                  <p>
                    Our {service.name.toLowerCase()} provides professional,
                    compassionate care tailored to your specific needs. All
                    caregivers are thoroughly vetted, trained, and experienced
                    in their field.
                  </p>
                  <p>
                    We understand the importance of trust and reliability when
                    it comes to caring for your loved ones. That&apos;s why we
                    carefully select caregivers who share our commitment to
                    excellence and compassion.
                  </p>
                  <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 mt-6">
                    <p className="font-semibold text-indigo-900 italic">
                      &quot;With flexible scheduling options and competitive
                      rates, you can get the care you need when you need it,
                      without breaking the bank.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Pricing & Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-4xl p-8 shadow-2xl shadow-indigo-100 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Pricing & Booking
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-50 hover:border-indigo-200 transition-colors group">
                    <div className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">
                      Hourly Rate
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-indigo-700">
                        ৳{service.hourlyRate}
                      </span>
                      <span className="text-sm text-gray-500 font-medium group-hover:text-indigo-500 transition-colors">
                        / hour
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-pink-50/50 rounded-2xl border border-pink-50 hover:border-pink-200 transition-colors group">
                    <div className="text-sm font-bold text-pink-400 uppercase tracking-wider mb-2">
                      Daily Rate
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-pink-700">
                        ৳{service.dailyRate}
                      </span>
                      <span className="text-sm text-gray-500 font-medium group-hover:text-pink-500 transition-colors">
                        / day
                      </span>
                    </div>
                  </div>
                </div>

                <Link href={`/booking/${service.slug}`} className="block">
                  <button className="btn btn-lg btn-primary w-full shadow-xl shadow-indigo-200 text-white py-6 text-lg">
                    Book Now
                  </button>
                </Link>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      💡
                    </span>
                    <span>Flexible scheduling available</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      🛡️
                    </span>
                    <span>All caregivers fully verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      📞
                    </span>
                    <span>24/7 Support included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
