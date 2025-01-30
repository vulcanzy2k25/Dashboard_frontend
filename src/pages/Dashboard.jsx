import React from "react";
import { Link } from "react-router-dom";

import "../styles/Dashboard.css";

const Dashboard = ({ events, deleteEvent }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/event/deleteEvent`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });

        if (response.ok) {
          console.log("Event deleted successfully"); 
          navigate("/");
        } else {
          console.error("Failed to delete event:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="club-name">Club Name</h1>
      </header>
      <div className="add-event-container">
        <Link to="/add-event" className="add-event-button">
          ➕ Add Event
        </Link>
      </div>

      <div className="event-cards-container">
        {events.length === 0 ? (
          <p className="no-events">No events available. Add some events!</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-image">
                <img
                  src={event.image || "https://via.placeholder.com/300"}
                  alt={event.name}
                  className="event-image"
                />
                <div className="image-overlay">
                  <span className="image-overlay-text"></span>
                </div>
              </div>
              <div className="event-info">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-date-time">
                  📅 {event.date} | 🕒 {event.time}
                </p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-description">
                  {event.description.length > 80
                    ? `${event.description.slice(0, 80)}...`
                    : event.description}
                </p>
                <div className="event-card-buttons">
                  <Link
                    to={`/update-event/${event.id}`}
                    className="update-button"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(event.id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
