import React, { useState } from "react";
import { Search, Filter, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const servicesData = [
{ id: 1, name: "Priyanka", phone: "+91 8907654321", service: "Electrician", verified: true, avatar: "https://i.pravatar.cc/150?img=1" },
{ id: 2, name: "Neha", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=2" },
{ id: 3, name: "Abhishek", phone: "+91 8907654321", service: "Carpenter", verified: true, avatar: "https://i.pravatar.cc/150?img=3" },
{ id: 4, name: "Rahul", phone: "+91 8907654321", service: "Painter", verified: true, avatar: "https://i.pravatar.cc/150?img=4" },
{ id: 5, name: "Amit", phone: "+91 8907654321", service: "Electrician", verified: true, avatar: "https://i.pravatar.cc/150?img=5" },
{ id: 6, name: "Ankita", phone: "+91 8907654321", service: "Carpenter", verified: false, avatar: "https://i.pravatar.cc/150?img=6" },
{ id: 7, name: "Ashish", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=7" },
{ id: 8, name: "Deepak", phone: "+91 8907654321", service: "Electrician", verified: false, avatar: "https://i.pravatar.cc/150?img=8" },
{ id: 9, name: "Anjali", phone: "+91 8907654321", service: "Plumber", verified: false, avatar: "https://i.pravatar.cc/150?img=9" },
{ id: 10, name: "Rohit", phone: "+91 8907654321", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=10" },
{ id: 11, name: "Ajay KS", phone: "+91 7412435678", service: "Plumber", verified: true, avatar: "https://i.pravatar.cc/150?img=11" },
];

const ServicesPage = () => {
const [search, setSearch] = useState("");
const navigate = useNavigate();

const filtered = servicesData.filter(
(item) =>
item.name.toLowerCase().includes(search.toLowerCase()) ||
item.phone.includes(search) ||
item.service.toLowerCase().includes(search.toLowerCase()) ||
(item.verified ? "verified" : "not verified").includes(search.toLowerCase())
);

return (
<div className="p-6 bg-gray-50 min-h-screen">
{/* Page Header */}
<div className="flex items-center justify-between mb-6">
<h1 className="text-2xl font-bold text-gray-800">Services</h1>

    {/* Search Bar */}
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center bg-white border border-gray-200 rounded-md shadow-sm px-3 py-2 w-96">
        <Filter className="w-5 h-5 text-gray-400 mr-2 cursor-pointer" />
        <input
          type="text"
          placeholder="Search By Name, Number, Profession, verified"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-gray-700 outline-none placeholder-gray-400"
        />
        <Search className="w-5 h-5 text-gray-400 ml-2" />
      </div>
    </div>
  </div>

  {/* Table Card */}
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-gray-100 text-gray-600 text-sm font-medium">
        <tr>
          <th className="py-3 px-5">Sl No</th>
          <th className="py-3 px-5">Name</th>
          <th className="py-3 px-5">Phone Number</th>
          <th className="py-3 px-5">Service</th>
          <th className="py-3 px-5">Verification</th>
          <th className="py-3 px-5">Action</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((item, index) => (
          <tr
            key={item.id}
            className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td className="py-3 px-5 text-gray-700">{index + 1}</td>
            <td className="py-3 px-5 flex items-center space-x-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-gray-800 font-medium">{item.name}</span>
            </td>
            <td className="py-3 px-5 text-gray-700">{item.phone}</td>
            <td className="py-3 px-5">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                {item.service}
              </span>
            </td>
            <td className="py-3 px-5">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.verified
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {item.verified ? "Verified" : "Not Verified"}
              </span>
            </td>
            <td className="py-3 px-5 text-gray-600 text-center">
              <button
                onClick={() => navigate(`/service-details/${item.id}`)}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Pagination */}
  <div className="flex justify-center items-center mt-6 space-x-1">
    <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
      &lt;
    </button>
    {[1, 2, 3, 4, 5].map((num) => (
      <button
        key={num}
        className={`px-3 py-1 rounded-md font-medium ${
          num === 1
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {num}
      </button>
    ))}
    <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200">
      &gt;
    </button>
  </div>
</div>


);
};

export default ServicesPage;