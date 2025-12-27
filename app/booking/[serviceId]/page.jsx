"use client";

// Booking Page - Protected Route
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/app/components/auth/PrivateRoute";
import DurationSelector from "@/app/components/booking/DurationSelector";
import LocationSelector from "@/app/components/booking/LocationSelector";

import { servicesData } from "@/lib/data/sampleData";

function BookingPageContent({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [duration, setDuration] = useState({ value: 1, unit: "hours" });
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Find service
    const foundService = servicesData.find(
      (s) => s.slug === params.serviceId || s._id === params.serviceId
    );
    if (foundService) {
      setService(foundService);
    }
  }, [params.serviceId]);

  const calculateTotalCost = () => {
    if (!service) return 0;
    if (duration.unit === "hours") {
      return duration.value * service.hourlyRate;
    } else {
      return duration.value * service.dailyRate;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !location.division ||
      !location.district ||
      !location.city ||
      !location.area ||
      !location.address
    ) {
      setError("Please fill in all location fields");
      return;
    }

    setLoading(true);

    try {
      // 1. Create booking in database
      const bookingData = {
        userId: session.user.id,
        userEmail: session.user.email,
        userName: session.user.name,
        serviceId: service._id,
        serviceName: service.name,
        duration,
        location,
        totalCost: calculateTotalCost(),
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking record");
      }

      const newBooking = await response.json();

      // 2. Create Stripe Checkout Session
      const stripeResponse = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId: newBooking._id,
          serviceName: service.name,
          amount: calculateTotalCost(),
          email: session.user.email,
        }),
      });

      const stripeData = await stripeResponse.json();

      if (!stripeResponse.ok) {
        throw new Error(stripeData.error || "Failed to initiate payment");
      }

      // 3. Redirect to Stripe
      if (stripeData.url) {
        window.location.href = stripeData.url;
      } else {
        throw new Error("No payment URL returned");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.message || "Failed to process booking. Please try again.");
      setLoading(false);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Service Not Found
          </h2>
          <p className="text-gray-500">The requested service does not exist.</p>
          <button
            className="btn btn-primary mt-6 text-white"
            onClick={() => router.push("/#services")}
          >
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <div className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2">
              New Booking
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Book {service.name}
            </h1>
            <p className="text-gray-500 text-lg">
              Complete the details below to schedule your care service
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-4xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 space-y-10"
              >
                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium animate-pulse">
                    {error}
                  </div>
                )}

                {/* Duration Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">
                      1
                    </span>
                    Select Duration
                  </h3>
                  <div className="pl-10">
                    <DurationSelector
                      onChange={setDuration}
                      hourlyRate={service.hourlyRate}
                      dailyRate={service.dailyRate}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Location Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm">
                      2
                    </span>
                    Service Location
                  </h3>
                  <div className="pl-10">
                    <LocationSelector onChange={setLocation} />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-full h-14 text-lg shadow-xl shadow-indigo-200 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Confirm & Pay"
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    By confirming, you agree to our Terms of Service regarding
                    cancellations and refunds.
                  </p>
                </div>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-indigo-600 text-white rounded-4xl shadow-2xl p-8 sticky top-24 overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <h3 className="text-xl font-bold mb-6 relative z-10 border-b border-white/20 pb-4">
                  Booking Summary
                </h3>

                <div className="space-y-5 relative z-10">
                  <div>
                    <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                      Service
                    </div>
                    <div className="font-bold text-xl">{service.name}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                        Rate
                      </div>
                      <div className="font-medium">
                        ৳
                        {duration.unit === "hours"
                          ? service.hourlyRate
                          : service.dailyRate}
                        <span className="text-xs text-indigo-200 ml-1">
                          /{duration.unit === "hours" ? "hr" : "day"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-1">
                        Duration
                      </div>
                      <div className="font-medium">
                        {duration.value} {duration.unit}
                      </div>
                    </div>
                  </div>

                  {location.division && (
                    <div className="bg-white/10 rounded-xl p-4 mt-2">
                      <div className="flex items-start gap-2">
                        <div className="pt-1">📍</div>
                        <div className="text-sm leading-relaxed">
                          <span className="font-bold block mb-1">
                            Location Set
                          </span>
                          {location.area}, {location.city}
                          <br />
                          <span className="text-indigo-200 text-xs">
                            {location.district}, {location.division}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 mt-2 border-t border-white/20">
                    <div className="flex justify-between items-end">
                      <span className="font-medium text-indigo-200 mb-1">
                        Total Cost
                      </span>
                      <span className="text-4xl font-bold">
                        ৳{calculateTotalCost()}
                      </span>
                    </div>
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

export default function BookingPage({ params }) {
  const unwrappedParams = use(params);
  return (
    <PrivateRoute>
      <BookingPageContent params={unwrappedParams} />
    </PrivateRoute>
  );
}
