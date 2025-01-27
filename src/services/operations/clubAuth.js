import toast from 'react-hot-toast';
import { ClubEndPoints } from '../APIs';
import { APIconnector } from '../APIconnector';

const { LOGIN,SIGNUP } = ClubEndPoints;

export async function login(clubName, password, navigate) {
    const toastId = toast.loading("Logging in...");

    try {
      const options = { clubName, password };
      const response = await APIconnector("POST", LOGIN, options);

      if (!response.data.token) {
        throw new Error("Invalid credentials");
      }

      // Save token and redirect
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      navigate("/home"); // Redirect to the dashboard page
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login Error:", error);
    } finally {
      toast.dismiss(toastId);
    }
}


export async function signup(clubName, password, confirmPassword, navigate) {
    const toastId = toast.loading("Signing up...");

    try {
        // Validate password match
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const options = { clubName, password };
        const response = await APIconnector("POST", SIGNUP, options);
        console.log(response.data);
        
        if (!response.data.success) {
            throw new Error(response.data.message || "Signup failed");
        }

        toast.success("Signup successful! Redirecting to login...");
        navigate("/"); // Redirect to the login page after successful signup
    } catch (error) {
        toast.error(error.message || "Signup failed. Please try again.");
        console.error("Signup Error:", error);
    } finally {
        toast.dismiss(toastId);
    }
}
