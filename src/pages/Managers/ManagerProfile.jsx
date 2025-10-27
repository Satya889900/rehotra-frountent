import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

export default function ManagerProfile() {
const { state: manager } = useLocation()
const navigate = useNavigate()

const data = [
{ name: 'Total Rent', value: 100 },
{ name: 'Discounts Given', value: 16.2 },
{ name: 'Rent Received', value: 82.8 },
{ name: 'Rent Balance', value: 1 },
]

const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#ef4444']

return (
<div className="p-6">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2 text-gray-600">
<button onClick={() => navigate(-1)} className="text-indigo-600 font-semibold hover:underline">
← Back to Manager List
</button>
<span className="text-gray-400"> / Manager Profile</span>
</div>
</div>

  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">Manager Profile</h2>
    <div className="flex flex-wrap items-start gap-6">
      <img src={manager.avatar} alt={manager.name} className="w-32 h-32 rounded-full object-cover" />
      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <p className="font-semibold text-gray-900">{manager.name}</p>
          <p>{manager.managerId}</p>
          <p>{manager.phone}</p>
          <p>{manager.email}</p>
          <p>{manager.address}</p>
        </div>
        <div>
          <p><strong>DOB:</strong> {manager.dob}</p>
          <p><strong>Joined:</strong> {manager.joinDate}</p>
          <p><strong>Gender:</strong> {manager.gender}</p>
          <p><strong>Religion:</strong> {manager.religion}</p>
          <p><strong>Education:</strong> {manager.education}</p>
        </div>
      </div>
    </div>

    {/* Analytics Section */}
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Buildings Analytics</h3>
      <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Total Assigned Buildings</p>
          <p className="text-2xl font-bold text-indigo-600">4</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Total Flats</p>
          <p className="text-2xl font-bold text-indigo-600">40</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Total Occupied Flats</p>
          <p className="text-2xl font-bold text-green-600">29</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Total Tenants</p>
          <p className="text-2xl font-bold text-rose-600">160</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="font-semibold text-gray-700">Current Month Total Rent</p>
          <p className="text-xl font-bold text-gray-900 mb-2">₹ XXXXX</p>

          <p className="font-semibold text-orange-600">Discounts Given</p>
          <p className="text-xl font-bold mb-2">₹ XXXXX</p>

          <p className="font-semibold text-green-600">Current Month Rent Received</p>
          <p className="text-xl font-bold mb-2">₹ XXXXX</p>

          <p className="font-semibold text-red-600">Current Month Rent Balance</p>
          <p className="text-xl font-bold mb-2">₹ XXXXX</p>
        </div>

        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-red-600 text-sm mt-2 font-semibold">
            Access blocked to see rental amount
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


)
}

