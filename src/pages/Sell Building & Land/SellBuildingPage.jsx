import React, { useState, useMemo } from "react";
import { Search, Home, Layers, MapPin, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 1,
    name: "Sunrise Tower Residences",
    address: "123 Ocean View Ave, Cityville, CA 90210",
    units: 120,
    floors: 10,
    furnished: "Fully Furnished",
    furnishedColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    updated: "Updated 11 hours ago",
  },
  {
    id: 2,
    name: "Sunrise Tower Residences",
    address: "123 Ocean View Ave, Cityville, CA 90210",
    bhk: "3 BHK",
    sqft: "1500 sqft",
    floor: "10",
    furnished: "Non Furnished",
    furnishedColor: "bg-gray-100 text-gray-700",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    updated: "Updated 3 days ago",
  },
  {
    id: 3,
    name: "Innovation Hub Offices",
    address: "123 Ocean View Ave, Cityville, CA 90210",
    floor: "Ground",
    sqft: "5000 sqft",
    totalFloors: 3,
    furnished: "Semi Furnished",
    furnishedColor: "bg-yellow-100 text-yellow-700",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    updated: "Updated 15 Days ago",
  },
  {
    id: 4,
    name: "Rehotra Villa",
    address: "#10A, 3rd Cross, RR Nagar, Bengaluru, 560068",
    bhk: "3 BHK",
    sqft: "1500 sqft",
    floor: "10",
    furnished: "Non Furnished",
    furnishedColor: "bg-gray-100 text-gray-700",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    updated: "Updated 3 days ago",
  },
  {
    id: 5,
    name: "Glass Residency",
    address: "#10A, 3rd Cross, RR Nagar, Bengaluru, 560068",
    units: 120,
    floors: 10,
    furnished: "Semi Furnished",
    furnishedColor: "bg-yellow-100 text-yellow-700",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    updated: "Updated 7 days ago",
  },
  {
    id: 6,
    name: "Jasmin Residency",
    address: "#10A, 3rd Cross, RR Nagar, Bengaluru, 560068",
    bhk: "2 BHK",
    sqft: "900 sqft",
    floor: "3",
    furnished: "Fully Furnished",
    furnishedColor: "bg-green-100 text-green-700",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    updated: "Updated 9 days ago",
  },
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border cursor-pointer"
      onClick={() => navigate(`/property-details/${property.id}`)}
    >
    <div className="relative">
      <img
        src={property.image}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <span
        className={`absolute bottom-2 right-2 text-xs font-medium px-3 py-1 rounded-full ${property.furnishedColor}`}
      >
        {property.furnished}
      </span>
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-900 truncate">
        {property.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3 truncate">{property.address}</p>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mb-3">
        {property.units && (
          <div className="flex items-center gap-1.5">
            <Grid className="w-4 h-4 text-gray-500" />
            <span>{property.units} Units</span>
          </div>
        )}
        {property.floors && (
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-gray-500" />
            <span>{property.floors} Floors</span>
          </div>
        )}
        {property.bhk && (
          <div className="flex items-center gap-1.5">
            <Home className="w-4 h-4 text-gray-500" />
            <span>{property.bhk}</span>
          </div>
        )}
        {property.sqft && (
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-gray-500" />
            <span>{property.sqft}</span>
          </div>
        )}
        {property.floor && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Floor: {property.floor}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-green-600 font-medium mt-2">
        {property.updated}
      </p>
    </div>
  </div>
  );
};

const SellBuildingPage = () => {
  const [query, setQuery] = useState("");

  const filteredProperties = useMemo(() => {
    return properties.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="p-6 bg-[#f6f9f3] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">
          Sell Building & Land
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Property Cards */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-800">No Properties Found</h3>
          <p className="text-gray-500 mt-1">
            Your search for "{query}" did not match any properties.
          </p>
        </div>
      )}
    </div>
  );
};

export default SellBuildingPage;