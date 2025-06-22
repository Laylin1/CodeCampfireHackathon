import React from "react";

export default function EventCard({ event }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h2>
        <p className="text-sm text-gray-500 mb-2">
          {event.description.length > 80
            ? event.description.slice(0, 80) + "..."
            : event.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {event.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>Start:</strong> {event.startDate}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <strong>End:</strong> {event.endDate}
        </div>
        <div className="text-sm text-green-600">
          <strong>Prize:</strong> {event.prize}
        </div>
      </div>
    </div>
  );
}
