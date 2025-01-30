import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddEventPage from "./pages/AddEventPage";
import UpdateEventPage from "./pages/UpdateEvent";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  const addEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard events={events} deleteEvent={deleteEvent} />}
        />
        <Route
          path="/add-event"
          element={<AddEventPage addEvent={addEvent} />}
        />
        <Route
          path="/update-event/:id"
          element={
            <UpdateEventPage events={events} updateEvent={updateEvent} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
