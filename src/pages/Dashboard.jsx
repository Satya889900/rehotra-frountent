import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  Users,
  Building2,
  UserCog,
  Home,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function Dashboard() {
  const [owners, setOwners] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [managers, setManagers] = useState([]);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ownersRes, tenantsRes, managersRes, buildingsRes] =
          await Promise.all([
            api.get("/owners"),
            api.get("/tenants"),
            api.get("/managers"),
            api.get("/buildings"),
          ]);
        setOwners(ownersRes.data);
        setTenants(tenantsRes.data);
        setManagers(managersRes.data);
        setBuildings(buildingsRes.data);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      }
    };
    loadData();
  }, []);

  // Chart colors
  const PRIMARY_COLOR = "#2563eb"; // blue
  const SECONDARY_COLOR = "#22c55e"; // green
  const OCCUPIED_BAR = "oklch(40% 0.159 10.272)"; // Even darker gray (gray-700)
  const TOTAL_BAR = "#374151"; // gray-200

  const occupancyData = [
    { name: "Occupied", value: 70 },
    { name: "Empty", value: 30 },
  ];
  const occupancyPercentage = 70;

  const occupancyRateData = [
    { type: "1BHK", Occupied: 45, Total: 50 },
    { type: "2BHK", Occupied: 35, Total: 40 },
    { type: "3BHK", Occupied: 20, Total: 30 },
    { type: "RK", Occupied: 3, Total: 10 },
  ];

  const recentOwners = [
    { id: 1, name: "741119281", time: "3 mins ago" },
    { id: 2, name: "987654312", time: "5 days ago" },
    { id: 3, name: "9123456780", time: "9 days ago" },
    { id: 4, name: "9871236540", time: "15 days ago" },
    { id: 5, name: "768904321", time: "18 days ago" },
  ];

  return (
    <div className="p-6 bg-[#f4f9f1] min-h-screen space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Owners"
          value={owners.length || 125}
          diff="+10 since last month"
          Icon={Users}
          trend="up"
        />
        <SummaryCard
          title="Total Buildings"
          value={buildings.length || 250}
          diff="+17 since last month"
          Icon={Building2}
          trend="up"
        />
        <SummaryCard
          title="Total Managers"
          value={managers.length || 150}
          diff="−25 since last month"
          Icon={UserCog}
          trend="down"
        />
        <SummaryCard
          title="Total Tenants"
          value={tenants.length || 12500}
          diff="+520 since last month"
          Icon={Home}
          trend="up"
        />
      </div>

      {/* Charts and Recent Owners */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Donut Chart with Custom Legend */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold mb-3 text-gray-700">
              Overall Occupancy Distribution
            </h3>
            <div className="flex items-center h-[250px]">
              {/* Donut Chart */}
              <div className="w-2/3 h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={occupancyData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                      <Cell fill={PRIMARY_COLOR} />
                      <Cell fill={SECONDARY_COLOR} />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{occupancyPercentage}%</div>
                    <div className="text-sm text-gray-500">Occupied</div>
                  </div>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="w-1/3 space-y-2 pl-4">
                {occupancyData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: index === 0 ? PRIMARY_COLOR : SECONDARY_COLOR }}
                    ></div>
                    <div>
                      <div className="text-sm text-gray-500">{entry.name}</div>
                      <div className="font-bold">{entry.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recently Added Owners */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="font-semibold mb-3 text-gray-700">
              Recently Added Owners
            </h3>
            <ul className="divide-y">
              {recentOwners.map((owner) => (
                <li
                  key={owner.id}
                  className="flex justify-between py-2 text-gray-700 text-sm"
                >
                  <span>New Owner added by {owner.name}</span>
                  <span className="text-green-500 font-semibold">{owner.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-5">
          <div>
            <h3 className="font-semibold text-gray-700">Occupancy Rate</h3>
            <p className="text-sm text-gray-500 mb-3">Current occupancy across property types</p>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={occupancyRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Occupied" fill={OCCUPIED_BAR} barSize={35} />
              <Bar dataKey="Total" fill={TOTAL_BAR} barSize={35} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-12">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-700 mr-2"></div>
                <span>Occupied</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-200 mr-2 border"></div>
                <span>Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Summary Card Component */
function SummaryCard({ title, value, diff, Icon, trend }) {
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;
  const trendColor =
    trend === "up" ? "text-green-600" : "text-red-500";

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-lg text-gray-800">
          <Icon size={20} />
        </div>
        <h4 className="text-gray-600 font-medium">{title}</h4>
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <div className="grow"></div> {/* This will push the arrow to the right */}
          <div className={`flex items-center text-sm ${trendColor} ml-2`}>
            <TrendIcon size={24} />
          </div>
        </div>
        <p className="text-xs text-gray-500">{diff}</p>
      </div>
    </div>
  );
}