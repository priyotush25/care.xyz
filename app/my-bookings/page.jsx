"use client";

// My Bookings Page - Protected Route
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import PrivateRoute from "@/app/components/auth/PrivateRoute";
import Card from "@/app/components/ui/Card";

import Modal from "@/app/components/ui/Modal";
import {
  FiCalendar,
  FiMapPin,
  FiClock,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

function MyBookingsContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const response = await fetch(`/api/bookings?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchBookings();
    }
  }, [session, fetchBookings]);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (response.ok) {
        fetchBookings(); // Refresh bookings
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Confirmed":
        return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              My Bookings
            </h1>
            <p className="text-gray-500 text-lg">
              View and manage your care service bookings
            </p>
          </div>

          {success && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-3xl text-green-700 flex items-center gap-4 shadow-sm animate-fade-in">
              <FiCheckCircle size={24} className="shrink-0" />
              <div>
                <p className="font-bold text-lg">Booking Successful!</p>
                <p>We&apos;ll be in touch shortly to confirm your caregiver.</p>
              </div>
            </div>
          )}

          {canceled && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-3xl text-red-700 flex items-center gap-4 shadow-sm animate-fade-in">
              <FiX size={24} className="shrink-0" />
              <div>
                <p className="font-bold text-lg">Payment Cancelled</p>
                <p>
                  The payment process was cancelled. You can try booking again.
                </p>
              </div>
            </div>
          )}

          {bookings.length === 0 ? (
            <Card className="text-center py-24 bg-white shadow-sm border-gray-100">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
                📋
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Bookings Yet
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                You haven&apos;t made any bookings. Start by exploring our
                professional care services!
              </p>
              <button
                onClick={() => (window.location.href = "/#services")}
                className="btn btn-primary shadow-lg shadow-indigo-200 text-white"
              >
                Browse Services
              </button>
            </Card>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <Card
                  key={booking._id}
                  className="hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-gray-900">
                            {booking.serviceName}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-right md:text-left hidden md:block">
                          <div className="text-2xl font-bold text-indigo-600">
                            ৳{booking.totalCost}
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-8 text-sm">
                        <div className="flex items-center text-gray-500">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 mr-3">
                            <FiClock size={16} />
                          </div>
                          <span>
                            <span className="block text-xs font-semibold text-gray-400 uppercase">
                              Duration
                            </span>
                            {booking.duration.value} {booking.duration.unit}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 mr-3">
                            <FiMapPin size={16} />
                          </div>
                          <span
                            className="truncate max-w-[150px]"
                            title={`${booking.location.area}, ${booking.location.city}`}
                          >
                            <span className="block text-xs font-semibold text-gray-400 uppercase">
                              Location
                            </span>
                            {booking.location.area}, {booking.location.city}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 mr-3">
                            <FiCalendar size={16} />
                          </div>
                          <span>
                            <span className="block text-xs font-semibold text-gray-400 uppercase">
                              Date
                            </span>
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Mobile Price View */}
                      <div className="mt-4 pt-4 border-t border-gray-100 md:hidden flex justify-between items-center">
                        <span className="font-semibold text-gray-500">
                          Total Cost
                        </span>
                        <span className="text-xl font-bold text-indigo-600">
                          ৳{booking.totalCost}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-3 justify-end border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                      <button
                        className="btn btn-sm bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 flex-1 md:flex-none"
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowModal(true);
                        }}
                      >
                        Details
                      </button>
                      {booking.status === "Pending" && (
                        <button
                          className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-100 border-none flex-1 md:flex-none"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Booking Details Modal */}
          {selectedBooking && (
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title="Booking Details"
            >
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                      Service
                    </div>
                    <div className="font-bold text-gray-900 text-lg">
                      {selectedBooking.serviceName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase mb-1">
                      Status
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                        selectedBooking.status
                      )}`}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Booking Date</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(selectedBooking.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold text-gray-900">
                      {selectedBooking.duration.value}{" "}
                      {selectedBooking.duration.unit}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500 mb-2">Location</span>
                    <div className="font-semibold text-gray-900 text-sm leading-relaxed text-right md:text-left">
                      {selectedBooking.location.address}
                      <br />
                      {selectedBooking.location.area},{" "}
                      {selectedBooking.location.city}
                      <br />
                      {selectedBooking.location.district},{" "}
                      {selectedBooking.location.division}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm font-medium text-gray-500">
                    Total Payment
                  </div>
                  <div className="text-3xl font-bold text-indigo-600">
                    ৳{selectedBooking.totalCost}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <PrivateRoute>
      <MyBookingsContent />
    </PrivateRoute>
  );
}
