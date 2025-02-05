import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getClubEvents, deleteEvent } from "../services/operations/event";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const clubName = localStorage.getItem("clubName");
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getClubEvents();
      if (data) {
        setEvents(data);
      } else {
        toast.error("Failed to fetch events.");
      }
    } catch (error) {
      toast.error("Error fetching events.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
    } catch (error) {
      toast.error("Failed to delete event!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen max-h-max">
      <div className="text-2xl font-exo h-[4rem] flex justify-between pl-9 items-center fixed z-20 bg-white shadow-xl w-screen left-0 top-0 font-bold text-center text-gray-800 ">
        <p>{clubName ? clubName : "Events List"} </p>
        <div className=" flex  z-10  rounded-lg p-2  bottom-4 right-4 ">
          <button
            className="hover:rotate-90 duration-200"
            onClick={() => navigate("/addEvent")}
          >
            <IoIosAddCircle size={35} />
          </button>

          <button
            className="hover:rotate-180 duration-200"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("clubName");
              navigate("/");
            }}
          >
            <IoMdLogOut size={35} />
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-center text-gray-500">No events found :(</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 mt-[4rem] p-5 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-[#EFFFEE] shadow-lg rounded-lg overflow-hidden transform transition-all  hover:shadow-xl"
            >
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {event.name}
                </h2>
                <p>{event.description}</p>
                <p className="text-sm text-gray-500">
                  {event.date} - {event.location}
                </p>
              </div>
              <div className="flex justify-between items-center px-4 pb-4">
                <button
                  className="px-4 font-exo font-semibold py-2 bg-black text-white text-sm rounded-lg hover:bg-black/80 transition"
                  onClick={() => navigate(`/updateEvent/${event._id}`)}
                >
                  UPDATE
                </button>
                <div className="flex justify-center items-center gap-5 ">
                  <button onClick={() => handleDelete(event._id)}>
                    <MdDelete color="#184C4E" size={35} />
                  </button>
                  <div className="flex items-center">
                    <button onClick={() => navigate(`/regUsers/${event._id}`)}>
                      <FaUser color="#184C4E" size={30} />
                    </button>
                    <p className="text-2xl font-exo">
                      {" "}
                      {event.registered_users.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
