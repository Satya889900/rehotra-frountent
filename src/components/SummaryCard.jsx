import React from 'react'
import { TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCard({ title, value, diff, Icon, trend }) {
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