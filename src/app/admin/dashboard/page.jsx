"use client";

import { useState, useEffect } from "react";
import AdminRoute from "@/app/components/auth/AdminRoute";
import Card from "@/app/components/ui/Card";
import {
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiSearch,
} from "react-icons/fi";

function AdminDashboardContent() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const [notification, setNotification] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    setUpdatingId(bookingId);
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setPayments((prev) =>
          prev.map((p) =>
            p._id === bookingId ? { ...p, status: newStatus } : p
          )
        );
        setNotification({
          type: "success",
          message: `Booking updated to ${newStatus}`,
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to update status",
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      setNotification({
        type: "error",
        message: "An error occurred",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Helper to close dropdown after selection (using activeElement blur)
  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments");
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    let colorClass = "bg-gray-100 text-gray-700 border-gray-200";
    let icon = <FiClock className="mr-1" />;

    if (status === "Confirmed" || status === "Paid") {
      colorClass = "bg-green-100 text-green-700 border-green-200";
      icon = <FiCheckCircle className="mr-1" />;
    } else if (status === "Cancelled") {
      colorClass = "bg-red-100 text-red-700 border-red-200";
      icon = <FiXCircle className="mr-1" />;
    } else if (status === "Pending") {
      colorClass = "bg-yellow-100 text-yellow-700 border-yellow-200";
      icon = <FiClock className="mr-1" />;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}
      >
        {icon}
        {status}
      </span>
    );
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "All") return matchesSearch;
    return matchesSearch && payment.status === filter;
  });

  const totalRevenue = payments
    .filter((p) => p.status === "Confirmed" || p.status === "Completed")
    .reduce((sum, p) => sum + p.totalCost, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Notification Toast */}
          {notification && (
            <div className="fixed top-24 right-4 z-50 animate-in fade-in slide-in-from-right-5 duration-300">
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
                  notification.type === "success"
                    ? "bg-white border-green-200 text-green-700"
                    : "bg-white border-red-200 text-red-700"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    notification.type === "success"
                      ? "bg-green-100"
                      : "bg-red-100"
                  }`}
                >
                  {notification.type === "success" ? (
                    <FiCheckCircle />
                  ) : (
                    <FiXCircle />
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">
                    {notification.type === "success" ? "Success" : "Error"}
                  </p>
                  <p className="text-xs opacity-90">{notification.message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-500">
                Overview of all system bookings and payments
              </p>
            </div>

            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                <FiDollarSign size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Total Revenue
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ৳{totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <Card className="mb-8 p-4!">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by user, email, or service..."
                  className="input input-bordered pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {["All", "Pending", "Confirmed", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`btn btn-sm ${
                      filter === status
                        ? "btn-primary text-white"
                        : "btn-ghost bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Table */}
          <Card className="overflow-hidden p-0!">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th>User</th>
                    <th>Service Info</th>
                    <th>Location</th>
                    <th>Booking Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        <div className="flex justify-center">
                          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredPayments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-20 text-gray-500"
                      >
                        No records found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <tr
                        key={payment._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                              {payment.userName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold">
                                {payment.userName}
                              </div>
                              <div className="text-sm opacity-50">
                                {payment.userEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-medium text-gray-900">
                            {payment.serviceName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {payment.duration.value} {payment.duration.unit}
                          </div>
                        </td>
                        <td>
                          <div className="text-sm">
                            <div className="font-medium">
                              {payment.location.city}
                            </div>
                            <div className="text-xs text-gray-500 text-ellipsis overflow-hidden max-w-[150px] whitespace-nowrap">
                              {payment.location.area}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FiCalendar />
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-indigo-600">
                            ৳{payment.totalCost}
                          </div>
                        </td>
                        <td>
                          <div className="dropdown dropdown-end">
                            <div
                              tabIndex={0}
                              role="button"
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              {getStatusBadge(payment.status)}
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-1 menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100"
                            >
                              <li className="menu-title px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Change Status
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleUpdateStatus(
                                      payment._id,
                                      "Confirmed"
                                    );
                                    closeDropdown();
                                  }}
                                  className={
                                    payment.status === "Confirmed"
                                      ? "active text-white"
                                      : ""
                                  }
                                >
                                  <FiCheckCircle className="w-4 h-4" />{" "}
                                  Confirmed
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleUpdateStatus(
                                      payment._id,
                                      "Completed"
                                    );
                                    closeDropdown();
                                  }}
                                  className={
                                    payment.status === "Completed"
                                      ? "active text-white"
                                      : ""
                                  }
                                >
                                  <FiCheckCircle className="w-4 h-4" />{" "}
                                  Completed
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleUpdateStatus(
                                      payment._id,
                                      "Cancelled"
                                    );
                                    closeDropdown();
                                  }}
                                  className={
                                    payment.status === "Cancelled"
                                      ? "active bg-red-500 text-white"
                                      : "text-red-500 hover:bg-red-50"
                                  }
                                >
                                  <FiXCircle className="w-4 h-4" /> Cancelled
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminRoute>
      <AdminDashboardContent />
    </AdminRoute>
  );
}
