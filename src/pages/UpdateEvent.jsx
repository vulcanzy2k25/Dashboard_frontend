import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { EventEndPoints } from "../services/APIs";
const { GETID,UPDATE } = EventEndPoints;
export default function UpdateEvent() {
  const { id } = useParams(); // Get event ID from the URL
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    description:"",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(GETID(id), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEvent(data.data);
      setImagePreview(data.data.image); // Show existing image
    } catch (error) {
      toast.error("Failed to load event details!");
      navigate("/home");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent({ ...event, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!event.name || !event.date || !event.location) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("date", event.date);
    formData.append("description",event.description);
    formData.append("location", event.location);
    if (event.image instanceof File) {
      formData.append("image", event.image); // Append new image only if changed
    }

    try {
    
      await axios.post(UPDATE(id), formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Event updated successfully!");
      navigate("/home"); // Redirect to events list
    } catch (error) {
      toast.error("Failed to update event!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Event</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Event Name</label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Event Description</label>
            <textarea
              type="text"
              name="description"
              value={event.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Date</label>
            <input
              type="text"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={event.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Event Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-lg mt-1" />
            {imagePreview && <img src={imagePreview} alt="Event" className="mt-2 w-full h-40 object-cover rounded-lg" />}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
        </form>
      )}
    </div>
  );
}
