// export const BASE_URL = 'http://localhost:4000/api/v1'
export const BASE_URL="https://backend-vulcanzy.onrender.com/api/v1"


// AUTH ENDPOINTS
export const ClubEndPoints = {
  LOGIN: `${BASE_URL}/club/signin`,
  SIGNUP: `${BASE_URL}/club/signup`,
}

export const EventEndPoints = {
  CREATE: `${BASE_URL}/event/createEvent`,
  GETBYCLUB: `${BASE_URL}/event/getClubEvents`,
  GETID:(eventId)=> `${BASE_URL}/event/getEvent/${eventId}`,
  UPDATE:(eventId)=> `${BASE_URL}/event/updateEvent/${eventId}`,
  DELETE:(eventId)=> `${BASE_URL}/event/deleteEvent/${eventId}`,
  REG_USERS:(eventId)=>`${BASE_URL}/event/regUsers/${eventId}`
}
