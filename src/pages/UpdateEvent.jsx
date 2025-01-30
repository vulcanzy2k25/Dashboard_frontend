import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/UpdateEvent.css";

const UpdateEventPage = ({ events, updateEvent }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === parseInt(id));

  const [updatedEvent, setUpdatedEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (event) {
      setUpdatedEvent(event);
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedEvent((prevEvent) => ({
        ...prevEvent,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEvent(updatedEvent);
    navigate("/");
  };

  if (!event) {
    return <p>Event not found!</p>;
  }

  return (
    <div className="update-event-page">
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={updatedEvent.name}
          onChange={handleChange}
          required
        />

        <label>Event Date</label>
        <input
          type="date"
          name="date"
          value={updatedEvent.date}
          onChange={handleChange}
          required
        />

        <label>Event Time</label>
        <input
          type="time"
          name="time"
          value={updatedEvent.time}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={updatedEvent.location}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={updatedEvent.description}
          onChange={handleChange}
          required
        ></textarea>

        <label>Event Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit" className="submit-button">
          ✅
        </button>
      </form>
    </div>
  );
};

export default UpdateEventPage;
