"use client";

// Location selector with cascading dropdowns
import { useState, useEffect } from "react";
import { locationData } from "@/lib/data/sampleData";

export default function LocationSelector({ onChange }) {
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);

  useEffect(() => {
    onChange(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleDivisionChange = (value) => {
    setLocation({
      division: value,
      district: "",
      city: "",
      area: "",
      address: "",
    });
    setAvailableDistricts(locationData.districts[value] || []);
    setAvailableCities([]);
    setAvailableAreas([]);
  };

  const handleDistrictChange = (value) => {
    setLocation((prev) => ({
      ...prev,
      district: value,
      city: "",
      area: "",
    }));
    setAvailableCities(locationData.cities[value] || []);
    setAvailableAreas([]);
  };

  const handleCityChange = (value) => {
    setLocation((prev) => ({
      ...prev,
      city: value,
      area: "",
    }));
    setAvailableAreas(locationData.areas[value] || []);
  };

  const selectClassName =
    "w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400 appearance-none";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Division */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Division <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={location.division}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className={selectClassName}
              required
            >
              <option value="">Select Division</option>
              {locationData.divisions.map((div) => (
                <option key={div.value} value={div.value}>
                  {div.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* District */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            District <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={location.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className={selectClassName}
              required
              disabled={!location.division}
            >
              <option value="">Select District</option>
              {availableDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={location.city}
              onChange={(e) => handleCityChange(e.target.value)}
              className={selectClassName}
              required
              disabled={!location.district}
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Area */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Area <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={location.area}
              onChange={(e) =>
                setLocation((prev) => ({ ...prev, area: e.target.value }))
              }
              className={selectClassName}
              required
              disabled={!location.city}
            >
              <option value="">Select Area</option>
              {availableAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Complete Address <span className="text-red-500">*</span>
        </label>
        <textarea
          value={location.address}
          onChange={(e) =>
            setLocation((prev) => ({ ...prev, address: e.target.value }))
          }
          placeholder="Enter house no, road no, flat no, etc."
          rows="3"
          className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none placeholder:text-gray-400"
          required
        />
      </div>
    </div>
  );
}
