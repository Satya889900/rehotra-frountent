import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";

const OwnerProfile = () => {
  const navigate = useNavigate();

  const data = [
    { name: "Rent Received", value: 240000, color: "#16a34a" },
    { name: "Rent Balance", value: 47100, color: "#ef4444" },
    { name: "Discounts Given", value: 2900, color: "#f59e0b" },
  ];

  return (
    <div className="min-h-screen bg-green-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Owner Management</h2>
          <p className="text-gray-500 text-sm mt-1">Owner Profile Details</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>

      {/* Owner Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Owner Profile</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src="https://randomuser.me/api/portraits/men/11.jpg"
            alt="Owner"
            className="w-36 h-36 rounded-lg object-cover border"
          />
          <div className="grid md:grid-cols-2 gap-3 w-full text-gray-700">
            <p><strong>Name:</strong> Alex Miller</p>
            <p><strong>Owner ID:</strong> RO213132349876</p>
            <p><strong>DOB:</strong> 26/11/2002</p>
            <p><strong>Date of Joined:</strong> 26/11/2002</p>
            <p><strong>Gender:</strong> Male</p>
            <p><strong>Religion:</strong> Hindu</p>
            <p><strong>Role:</strong> Project Manager</p>
            <p><strong>Qualification:</strong> B.E. (Computer Science)</p>
            <p><strong>Email:</strong> alex.thompson@rehotra.com</p>
            <p><strong>Phone:</strong> +1 (555) 987-6543</p>
            <p className="md:col-span-2"><strong>Address:</strong> #123, 3rd flr, 4th cross, 5th main, RR Nagar, Bengaluru 560068</p>
          </div>
        </div>
      </div>

      {/* Buildings Analytics */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Buildings Analytics</h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded">
              <p className="text-gray-600">Total Buildings</p>
              <h4 className="text-2xl font-semibold text-blue-700">4</h4>
            </div>
            <div className="p-3 bg-indigo-50 rounded">
              <p className="text-gray-600">Total Flats</p>
              <h4 className="text-2xl font-semibold text-indigo-700">40</h4>
            </div>
            <div className="p-3 bg-green-50 rounded">
              <p className="text-gray-600">Total Occupied Flats</p>
              <h4 className="text-2xl font-semibold text-green-700">29</h4>
            </div>
            <div className="p-3 bg-yellow-50 rounded">
              <p className="text-gray-600">Total Empty Flats</p>
              <h4 className="text-2xl font-semibold text-yellow-700">11</h4>
            </div>
            <div className="p-3 bg-purple-50 rounded">
              <p className="text-gray-600">Total Managers</p>
              <h4 className="text-2xl font-semibold text-purple-700">2</h4>
            </div>
            <div className="p-3 bg-pink-50 rounded">
              <p className="text-gray-600">Total Tenants</p>
              <h4 className="text-2xl font-semibold text-pink-700">160</h4>
            </div>
          </div>

          {/* Rent Info */}
          <div className="md:col-span-2 flex flex-col md:flex-row justify-between items-center">
            <div className="space-y-2 text-gray-800">
              <p>
                <strong>Current Month Total Rent:</strong>{" "}
                <span className="text-blue-700 text-lg">₹ 290000</span>
              </p>
              <p>
                <strong>Discounts Given:</strong>{" "}
                <span className="text-yellow-600 text-lg">₹ 2900</span>
              </p>
              <p>
                <strong>Current Month Rent Received:</strong>{" "}
                <span className="text-green-700 text-lg">₹ 240000</span>
              </p>
              <p>
                <strong>Current Month Rent Balance:</strong>{" "}
                <span className="text-red-600 text-lg">₹ 47100</span>
              </p>
            </div>

            {/* Pie Chart */}
            <div className="mt-6 md:mt-0">
              <PieChart width={300} height={250}>
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
                <Legend />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
