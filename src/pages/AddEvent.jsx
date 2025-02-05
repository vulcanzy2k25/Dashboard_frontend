import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EventEndPoints } from "../services/APIs";
const {CREATE}=EventEndPoints
const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    image: null,
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEventData((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!eventData.name || !eventData.description || !eventData.date || !eventData.location || !eventData.image) {
      toast.error("All fields are required!");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("User not authenticated!");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("image", eventData.image);

    try {
      const res = await axios.post(CREATE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", res.data);
      toast.success("Event successfully created!");

      setEventData({ name: "", description: "", date: "", location: "", image: null });
      setPreview(null);
      navigate("/home");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error(error.response?.data?.message || "Error creating event!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={loading}
            aria-label="Event Name"
          />

          {/* Event Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={loading}
            aria-label="Event Description"
          />

          {/* Event Date */}
          <input
            type="text"
            name="date"
            placeholder="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={loading}
            aria-label="Event Date"
          />

          {/* Event Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={loading}
            aria-label="Event Location"
          />

          {/* Event Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
            disabled={loading}
            aria-label="Event Image"
          />

          {/* Image Preview */}
          {preview && (
            <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg mt-2" />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 font-exo"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
