import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { EventEndPoints } from "../services/APIs";
export default function RegUsers() {
  const {REG_USERS} =EventEndPoints
  const { eventId } = useParams(); // Get event ID from URL params
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication required");
          return;
        }
        const response = await axios.get(REG_USERS(eventId), {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching registered users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchRegisteredUsers();
    }
  }, [eventId,REG_USERS]);

  if (loading) {
    return <p className="text-center text-xl text-white">Loading users...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#120226] p-6 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Registered Users for Event</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800/40 backdrop-blur-xl rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">College</th>
              <th className="py-3 px-6">Year</th>
              <th className="py-3 px-6">Registration No</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-600">
                  <td className="py-3 px-6 text-center">{user.name}</td>
                  <td className="py-3 px-6 text-center">{user.email}</td>
                  <td className="py-3 px-6 text-center">{user.college}</td>
                  <td className="py-3 px-6 text-center">{user.year}</td>
                  <td className="py-3 px-6 text-center">{user.reg_no}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No users registered for this event.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
