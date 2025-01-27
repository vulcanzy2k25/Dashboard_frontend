export const BASE_URL = "http://localhost:5000/api"
// export const BASE_URL = "https://backend-tech.onrender.com/api/v1"

// AUTH ENDPOINTS
export const ClubEndPoints = {
  LOGIN: `${BASE_URL}/club/signin`,
  SIGNUP: `${BASE_URL}/club/signup`,
}

export const EventEndPoints = {
  CREATE: `${BASE_URL}/event/createEvent`,
  GET: `${BASE_URL}/event/getAllEvents`,
  GETBYID: `${BASE_URL}/event/getById`,
  UPDATE: `${BASE_URL}/event/updateEvent`,
  DELETE: `${BASE_URL}/event/deleteEvent`,
}
