import React from "react";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Home,
  Building,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const navigate = useNavigate();
  const floorDetails = [
    { floor: "1st Floor", flatType: "2BHK (3)" },
    { floor: "2nd Floor", flatType: "3BHK (2)" },
    { floor: "3rd Floor", flatType: "2BHK (3)" },
    { floor: "4th Floor", flatType: "3BHK (2)" },
    { floor: "5th Floor", flatType: "4BHK (1)" },
    { floor: "6th Floor", flatType: "4BHK (1)" },
  ];

  return (
    <div className="bg-[#f5f7f1] min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <ArrowLeft
          onClick={() => navigate(-1)}
          className="w-5 h-5 text-gray-700 cursor-pointer"
        />
        <h1 className="text-xl font-semibold text-gray-900">
          Grand View Residency
        </h1>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Image Section */}
        <div className="col-span-1 lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1505691938895-1758d7feb511"
              alt="Property"
              className="w-full h-56 object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              Fully Furnished
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Grand View Residency
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-gray-500" /> 123, Celestial
              Heights, Bangalore, Karnataka 560001, India
            </p>
            <p className="text-sm text-gray-500 mt-1">Apartment</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Length:</span> 40 ft.
            </p>
            <p>
              <span className="font-semibold">Width:</span> 38 ft.
            </p>
            <p>
              <span className="font-semibold">Built-Up Area:</span> 1500 sq.ft.
            </p>
            <p>
              <span className="font-semibold">Carpet Area:</span> 1125 sq.ft.
            </p>
            <p>
              <span className="font-semibold">Direction:</span> North-East
              Facing
            </p>
            <p>
              <span className="font-semibold">Expected Price:</span> ₹1.85 Cr
            </p>
            <p>
              <span className="font-semibold">Price/sq.ft:</span> ₹12,333
            </p>
            <p>
              <span className="font-semibold">Maintenance:</span> ₹15,000
            </p>
          </div>
        </div>

        {/* Features & Owner Info */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Features & Amenities
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <p>🏢 Dedicated Parking</p>
              <p>💪 High-Speed Weights</p>
              <p>🛡️ 24/7 Security</p>
              <p>🌳 Landscaped Garden</p>
              <p>🏋️‍♂️ Fitness Gym</p>
              <p>🏠 Clubhouse</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Owner Information
            </h3>
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-gray-900">
                  Mr. Rajesh Kumar (RO123456789012)
                </p>
                <p className="text-blue-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" /> +91 98765 43210
                </p>
              </div>
              <div className="text-right text-gray-600">
                <p className="text-xs">Added on</p>
                <p className="text-sm font-medium">13 Aug 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        {/* Floor Details */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center justify-between">
            Floor-wise Flat Details
            <span className="text-blue-600 text-sm cursor-pointer">✎</span>
          </h3>
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Floor</th>
                <th className="text-left py-2">Flat Type</th>
              </tr>
            </thead>
            <tbody>
              {floorDetails.map((item, idx) => (
                <tr key={idx} className="border-b last:border-none">
                  <td className="py-2">{item.floor}</td>
                  <td className="py-2">{item.flatType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nearby Landmarks */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Nearby Landmarks
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex justify-between">
              <span>🏫 Schools</span> <span>2500 mtr</span>
            </li>
            <li className="flex justify-between">
              <span>🏥 Hospitals</span> <span>900 mtr</span>
            </li>
            <li className="flex justify-between">
              <span>🎓 Colleges</span> <span>3100 mtr</span>
            </li>
          </ul>
        </div>

        {/* Additional Property Details */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Additional Property Details
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p>
              <strong>Year of Construction:</strong> 2022
            </p>
            <p>
              <strong>Owner Type:</strong> Single / Joint / Builder
            </p>
            <p>
              <strong>Property Age:</strong> 2 Years / Ready to Move
            </p>
            <p>
              <strong>Facing:</strong> South-West
            </p>
            <p>
              <strong>Vastu Compliance:</strong> Yes
            </p>
            <p>
              <strong>Renovation History:</strong> Recently renovated (2023),
              Kitchen upgraded, Bathroom remodeled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;