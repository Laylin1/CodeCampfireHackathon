import React, { useEffect, useState } from "react";
import Container from "../Container";
import EventCard from "./EventCard/EventCard"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState();

  const colaborators = [
    { photo: "https://randomuser.me/api/portraits/women/1.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/2.jpg" },
    { photo: "https://randomuser.me/api/portraits/women/3.jpg" },
    { photo: "https://randomuser.me/api/portraits/men/4.jpg" },
  ];

  const getEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/challenges");
      if (!response.ok) throw new Error("Error fetching events");

      const result = await response.json();
      console.log(result);
      setEvents(result);
    } catch (e) {
      console.error("Error: " + e.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Container>
        {events ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {events.map((event, index) => {
              event.authorImage = `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100) + 1}.jpg`;
              return (
                <div
                  key={index}
                  onClick={() => setSelectedEvent(event)}
                  className="cursor-pointer"
                >
                  <EventCard event={event} />
                </div>
              );
            })}
          </div>
        ) : (
          "No events"
        )}
      </Container>

      {/* MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="flex p-10 bg-white w-[70%] h-[70%] max-w-5xl rounded-xl shadow-2xl relative overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-1/2">
              <h1 className="text-xl font-bold mb-2">{selectedEvent.title}</h1>
              <p className="text-md text-gray-700 mb-2">
                {selectedEvent.description}
              </p>
              <p className="text-sm text-gray-500">
                Author: {selectedEvent.author}
              </p>
              <p className="text-sm text-gray-500">
                Start: {selectedEvent.startDate}
              </p>
              <p className="text-sm text-gray-500">
                End: {selectedEvent.endDate}
              </p>
              <p className="text-sm text-gray-500">
                Status: {selectedEvent.status}
              </p>
              <p className="text-sm text-gray-500">Prize: {selectedEvent.prize}</p>
              <div className="mt-4 flex gap-2">
                {selectedEvent.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-xs text-indigo-700">Colaborators:</div>
              <div className="flex -space-x-2.5 mt-2">
                {colaborators.map((item, idx) => (
                  <img
                    key={idx}
                    src={item.photo}
                    alt="Colaborator"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                ))}
              </div>
              <button className="mt-5 bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2 rounded-3xl shadow-md hover:from-blue-600 hover:to-green-600 transition-all">
                Participate
              </button>
            </div>
            <div className="flex w-1/2 justify-center">
              <img
                src={selectedEvent.authorImage}
                alt={`Author ${selectedEvent.author}`}
                className="w-40 h-40 rounded-full object-cover shadow-sm"
              />
            </div>
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
