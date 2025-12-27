"use client";

// Duration selector component for booking
import { useState } from "react";
import { FiClock } from "react-icons/fi";

export default function DurationSelector({ onChange, hourlyRate, dailyRate }) {
  const [duration, setDuration] = useState({ value: 1, unit: "hours" });

  const handleChange = (field, value) => {
    const newDuration = { ...duration, [field]: value };
    setDuration(newDuration);
    onChange(newDuration);
  };

  const calculateCost = () => {
    if (duration.unit === "hours") {
      return duration.value * hourlyRate;
    } else {
      return duration.value * dailyRate;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            How long do you need care?
          </label>

          <div className="flex gap-4">
            <input
              type="number"
              min="1"
              value={duration.value}
              onChange={(e) =>
                handleChange("value", parseInt(e.target.value) || 1)
              }
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 font-bold text-lg text-center focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
            />

            <select
              value={duration.unit}
              onChange={(e) => handleChange("unit", e.target.value)}
              className="w-40 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all appearance-none"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>
        </div>

        <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col justify-center h-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-indigo-700">
              Estimated Cost
            </span>
            <span className="text-xs font-bold text-white bg-indigo-500 px-2 py-1 rounded-md">
              {duration.unit === "hours" ? "Hourly" : "Daily"} Rate
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-indigo-700">
              ৳{calculateCost()}
            </span>
            <span className="text-sm text-indigo-400 font-medium">
              (৳{duration.unit === "hours" ? hourlyRate : dailyRate}/
              {duration.unit === "hours" ? "hr" : "day"})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
