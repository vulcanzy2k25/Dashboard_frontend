import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddEventPage.css";

const AddEventPage = ({ addEvent }) => {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { ...event, id: Date.now() };
    addEvent(newEvent);
    navigate("/");
  };

  return (
    <div className="add-event-page">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          name="name"
          value={event.name}
          onChange={handleChange}
          required
        />

        <label>Event Date</label>
        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <label>Event Time</label>
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={event.location}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={event.description}
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

export default AddEventPage;
