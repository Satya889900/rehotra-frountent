import React, { useState } from "react";
import { ArrowLeft, Calendar, Building2, FileText, RefreshCcw } from "lucide-react";

const Notifications = () => {
  const [filter, setFilter] = useState("All");

  const notifications = [
    {
      id: 1,
      name: "Alice Johnson",
      ownerId: "RO12348970",
      date: "7/20/2024",
      building: "Grand Tower Residences",
      receipt: "Rental Receipts",
      status: "Pending",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Bob Williams",
      ownerId: "RO12348970",
      date: "7/19/2024",
      building: "City View Apartments",
      receipt: "Service Payment Receipt",
      status: "Approved",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: 3,
      name: "Catherine Davis",
      ownerId: "RO12348970",
      date: "7/18/2024",
      building: "Oakwood Condominiums",
      receipt: "Rental Receipt",
      status: "Denied",
      image: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      id: 4,
      name: "Alice Johnson",
      ownerId: "RO12348970",
      date: "7/20/2024",
      building: "Grand Tower Residences",
      receipt: "Rental Receipts",
      status: "Pending",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Denied":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.status === filter);

  return (
    <div className="bg-[#f6f9f3] min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer hover:text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
      </div>

      {/* Subheader */}
      <p className="text-gray-600 text-sm mb-5">
        Manage download requests for Owner rental and service payment receipts.
      </p>

      {/* Filter Bar */}
      <div className="flex justify-between items-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>

        <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border hover:bg-gray-50 transition">
          <RefreshCcw className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Refresh</span>
        </button>
      </div>

      {/* Notification Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={n.image}
                alt={n.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {n.name}{" "}
                  <span className="text-gray-500 text-xs">({n.ownerId})</span>
                </p>
                <p className="text-xs text-gray-500">Receipt Download Request</p>
              </div>
            </div>

            {/* Status */}
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${getStatusColor(
                n.status
              )}`}
            >
              {n.status}
            </span>

            {/* Details */}
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" /> {n.date}
              </p>
              <p className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" /> {n.building}
              </p>
              <p className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" /> {n.receipt}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                className={`px-4 py-1.5 text-sm font-medium rounded border ${
                  n.status === "Denied"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-red-600 border-red-200 hover:bg-red-50"
                }`}
              >
                Deny
              </button>
              <button
                className={`px-4 py-1.5 text-sm font-medium rounded ${
                  n.status === "Approved"
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;