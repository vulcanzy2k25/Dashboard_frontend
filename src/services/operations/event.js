import toast from "react-hot-toast";
import { EventEndPoints } from "../APIs";
import { APIconnector } from "../APIconnector";

const { DELETE, UPDATE, GETBYCLUB, CREATE, GETID } = EventEndPoints;

export async function createEvent(eventData, navigate) {
    const toastId = toast.loading("Creating event...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not authenticated");
        }
        const response = await APIconnector("POST", CREATE, eventData, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "Event creation failed");
        }
        toast.success("Event created successfully!");
        navigate("/home");
    } catch (error) {
        toast.error(error.message || "Event creation failed. Please try again.");
        console.error("Event Creation Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}

export async function deleteEvent(eventId) {
    const toastId = toast.loading("Deleting event...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not authenticated");
        }
        const response = await APIconnector("POST", DELETE(eventId), null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message || "Event deletion failed");
        }
        toast.success("Event deleted successfully!");
    } catch (error) {
        toast.error(error.message || "Event deletion failed. Please try again.");
        console.error("Event Deletion Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}

export async function updateEvent(eventId, eventData, navigate) {
    const toastId = toast.loading("Updating event...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not authenticated");
        }

        const response = await APIconnector("POST", UPDATE(eventId), eventData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        });

        if (!response.data.success) {
            throw new Error(response.data.message || "Event update failed");
        }

        toast.success("Event updated successfully!");
        navigate("/home");
    } catch (error) {
        toast.error(error.message || "Event update failed. Please try again.");
        console.error("Event Update Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}

export async function getClubEvents() {
    const toastId = toast.loading("Fetching events...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not authenticated");
        }
        const response = await APIconnector("GET", GETBYCLUB, null, {
            Authorization: `Bearer ${token}`,
        });
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Failed to fetch events. Please try again.");
        console.error("Fetch Events Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}

export async function getEvent(eventId) {
    const toastId = toast.loading("Fetching event...");
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("User not authenticated");
        }
        const response = await APIconnector("GET", GETID(eventId), null, {
            Authorization: `Bearer ${token}`,
        });
        return response.data.data;
    } catch (error) {
        toast.error(error.message || "Failed to fetch event. Please try again.");
        console.error("Fetch Event Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}
