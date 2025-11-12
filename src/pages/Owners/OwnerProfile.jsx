import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  UserCircle,
} from "lucide-react";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const owner = state?.owner;

  const data = [
     { name: "Total Rent", value: 290000, color: "#1E40AF" },
     { name: "Discounts", value: 2900, color: "#d97706" },
    { name: "Rent Received", value: 240000, color: "#16a34a" },
    { name: "Rent Balance", value: 47100, color: "#ef4444" },
    
  ];

  if (!owner) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 bg-green-50 p-6">
        <p className="mb-4 text-lg">
          ⚠️ Owner details not found. Please go back to the Owner Management page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const avatar =
    owner.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      owner.name || "Owner"
    )}&background=6B7280&color=fff&size=140`;

  return (
    <div className="min-h-screen bg-[#f5f9f3] p-6">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm mb-5 border">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Owner Management</h2>
          <div className="flex items-center text-sm text-gray-500 mt-1 gap-2">
            <span className="text-gray-600">Owner Management</span>
            <span className="text-gray-300">/</span>
            <span className="font-medium">{owner.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search building name..."
            className="border rounded-full px-4 py-1 text-sm w-56 focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
          <img src={avatar} alt="profile" className="w-9 h-9 rounded-full border" />
        </div>
      </div>

      {/* Owner Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          <img
            src={avatar}
            alt={owner.name}
            className="w-36 h-36 rounded-full object-cover border"
          />

          {/* Info Columns */}
          <div className="flex flex-col md:flex-row justify-between w-full gap-8 text-gray-800">
            {/* Column 1 */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-800" />
                <span>{owner.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-gray-800" />
                <span>{owner.id || "O-2025"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-800" />
                <span>{owner.mobile || "+91 9876543210"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-800" />
                <span>{owner.email || "owner@example.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-800" />
                <span>
                  {owner.address ||
                    "#123, 3rd flr, 4th cross, 5th main, RR Nagar, Bengaluru"}
                </span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-800" />
                <span>{owner.dob || "26/11/2002"}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-gray-800" />
                <span>{owner.gender || "Male"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-gray-800" />
                <span>{owner.religion || "Hindu"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-800" />
                <span>{owner.role || "Property Owner"}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-800" />
                <span>{owner.education || "B.E. (Computer Science)"}</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-800" />
                <span>{owner.dateOfJoining || "26/11/2022"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* 📊 Building Analytics Section */}
<div className="w-full bg-white p-6 rounded-xl shadow-md border mt-6">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">
    Building Analytics
  </h3> 
  <div className="flex flex-col md:flex-row justify-between w-full h-full gap-6">
    {/* 🏢 Left Side - Summary (25%) */}
    <div className="w-full md:w-1/4 bg-white rounded-xl border p-6 shadow-sm flex flex-col justify-between">
      {[
        { icon: "fa-city", label: "Total Buildings", value: "4", color: "text-indigo-700" },
        { icon: "fa-building", label: "Total Flats", value: "40", color: "text-blue-700" },
        { icon: "fa-house-user", label: "Total Occupied Flats", value: "29", color: "text-green-700" },
        { icon: "fa-door-open", label: "Total Empty Flats", value: "11", color: "text-red-600" },
        { icon: "fa-user-tie", label: "Total Managers", value: "2", color: "text-purple-700" },
        { icon: "fa-users", label: "Total Tenants", value: "160", color: "text-teal-700" },
      ].map((item, index) => (
        <div key={index} className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-gray-700">
            <i className={`fa-solid ${item.icon} text-gray-500`}></i>
            <span>{item.label}</span>
          </div>
          <span className={`${item.color} font-semibold text-lg`}>{item.value}</span>
        </div>
      ))}
    </div>

{/* 💰 Rent Info + Chart Section */}
<div className="w-full md:w-3/4 bg-white rounded-xl border p-6 shadow-sm flex flex-col md:flex-row justify-start items-center ">

  {/* 🧾 LEFT SIDE - Rent Info */}
  <div className="w-full md:w-1/2 flex flex-col justify-start space-y-4 text-gray-800">
    <div>
      <p className="font-medium text-gray-600">Current Month Total Rent</p>
      <p className="text-black text-lg font-semibold">₹ 2,90,000</p>
    </div>

    <div>
      <p className="font-medium text-gray-600">Discounts Given</p>
      <p className="text-orange-600 text-lg font-semibold">₹ 2,900</p>
    </div>

    <div>
      <p className="font-medium text-gray-600">Current Month Rent Received</p>
      <p className="text-green-600 text-lg font-semibold">₹ 2,40,000</p>
    </div>

    <div>
      <p className="font-medium text-gray-600">Current Month Rent Balance</p>
      <p className="text-red-600 text-lg font-semibold">₹ 47,100</p>
    </div>
  </div>

  {/* 🥧 RIGHT SIDE - Rent Collection Chart + Legend (Slightly left) */}
  <div className="w-full md:w-1/2 flex flex-col justify-center items-start mr-10">
    <h3 className="font-semibold text-gray-700 mb-5 ">Rent Collection</h3>
    
    <div className="flex items-center">
      {/* Chart */}
      <PieChart width={260} height={230}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Legend (to the right of the chart) */}
      <div className="flex flex-col gap-9 pl-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-700 text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
        </div>
  </div>
</div>

</div>
</div>
</div>
  );
};

export default OwnerProfile;
