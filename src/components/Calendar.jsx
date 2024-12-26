import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect } from "react";

function CALENDAR() {
  const localizer = momentLocalizer(moment);

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // For storing clicked event
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility

  async function fetchAllEvents() {
    if (!session || !session.provider_token) {
      alert("Session token is invalid. Please sign in again.");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_CALENDAR, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      const mappedEvents = data.items.map((event) => ({
        id: event.id,
        title: event.summary || "No Title",
        description: event.description || "No Description",
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
      }));

      setEvents(mappedEvents);
    } catch (error) {
      alert("Failed to fetch events: " + error.message);
    }
  }

  useEffect(() => {
    if (session) {
      fetchAllEvents();
    }
  }, [session]);

  function handleEventClick(event) {
    setSelectedEvent(event); // Store clicked event details
    setIsModalOpen(true); // Open modal
  }

  function closeModal() {
    setIsModalOpen(false); // Close modal
    setSelectedEvent(null); // Clear selected event
  }

  return (
    <div className="App">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "75vh" }}
              onSelectEvent={handleEventClick}
              className="bg-white shadow-lg rounded-lg"
            />

            {/* Modal */}
            {isModalOpen && selectedEvent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
                  <h2 className="text-2xl font-semibold mb-4">
                    {selectedEvent.title}
                  </h2>
                  <p className="mb-4">{selectedEvent.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    <strong>Start:</strong>{" "}
                    {selectedEvent.start.toLocaleString()}
                    <br />
                    <strong>End:</strong> {selectedEvent.end.toLocaleString()}
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CALENDAR;
