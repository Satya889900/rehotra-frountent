import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar, Phone, Mail, MapPin, Briefcase, CreditCard } from "lucide-react";

const TenantDetails = () => {
  const { state: tenant } = useLocation();
  const navigate = useNavigate();

  const payments = [
    {
      id: 1,
      amount: "₹15000",
      service: "Maintenance & Other (Kitchen Sink Repair)",
      payable: "₹17500",
      paid: "₹0",
      dueDate: "03 Mar 2025",
      mode: "-",
      paidDate: "Pending",
      status: "pending",
    },
    {
      id: 2,
      amount: "₹15000",
      service: "Rent + Maintenance",
      payable: "₹16000",
      paid: "₹16000",
      dueDate: "03 Feb 2025",
      mode: "UPI (Gpay)",
      paidDate: "04 Feb 2025",
      status: "paid",
    },
    {
      id: 3,
      amount: "₹15000",
      service: "Advance Amount",
      payable: "₹15000",
      paid: "₹15000",
      dueDate: "03 Dec 2024",
      mode: "Cash",
      paidDate: "04 Dec 2024",
      status: "paid",
    },
  ];

  return (
    <div className="bg-[#f6f9f3] min-h-screen p-6">
      {/* Header */}
      <div onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-6 cursor-pointer">
        <ArrowLeft className="w-4 h-4" />
        <span>Tenant Management</span>
        <span className="text-gray-400">›</span>
        <span className="text-gray-800 font-semibold">Tenant Details</span>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tenant Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <img
            src={tenant.avatar}
            alt="Tenant"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700">
            <p><User className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.name}</p>
            <p><Calendar className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.dob ?? 'N/A'}</p>
            <p><Calendar className="inline w-4 h-4 mr-1 text-indigo-500" /> Joined: {tenant.moveIn}</p>
            <p><Phone className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.mobile}</p>
            <p><Mail className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.email ?? 'N/A'}</p>
            <p><Briefcase className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.course ?? 'N/A'}</p>
            <p><MapPin className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.address ?? 'N/A'}</p>
            <p><User className="inline w-4 h-4 mr-1 text-indigo-500" /> Owner: {tenant.owner ?? 'N/A'}</p>
            <p><Phone className="inline w-4 h-4 mr-1 text-indigo-500" /> {tenant.ownerPhone ?? 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rent and Other Payment</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm text-gray-600">
                <th className="p-3 text-left">Rent Amount</th>
                <th className="p-3 text-left">Maintenance & Other Services</th>
                <th className="p-3 text-left">Total Payable</th>
                <th className="p-3 text-left">Paid</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Transaction Mode</th>
                <th className="p-3 text-left">Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{p.amount}</td>
                  <td className="p-3">{p.service}</td>
                  <td className="p-3">{p.payable}</td>
                  <td className="p-3">{p.paid}</td>
                  <td className="p-3">{p.dueDate}</td>
                  <td className="p-3">{p.mode}</td>
                  <td className="p-3">
                    {p.status === "pending" ? (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                        {p.paidDate}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
