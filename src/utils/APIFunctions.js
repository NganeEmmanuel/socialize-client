import axios from 'axios';

const baseURL = 'https://socialize-production.up.railway.app';


const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function login(data) {
  try {
    const response = await api.post('/api/v1/auth/login', data);
    const { token, ...userData } = response.data;
    localStorage.setItem('token', token);
    return { ...response, data: { token, ...userData } };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Unable to login because: " + error.message);
  }
}

export async function signup(data) {
  try {
    const response = await api.post('/api/v1/auth/signup', data);
    return response;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Unable to signup because: " + error.message);
  }
}

export const getLoggedInUserByUsername = async (username, token) => {
  try {
    console.log("Sending request with username:", username, "and token:", token); // Log parameters
    const response = await api.get('/api/v1/user/get-user', {
      params: { username },
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Response data:", response.data); // Log response
    return response.data;
  } catch (error) {
    console.error("Fetching user data failed:", error);
    throw new Error("Unable to fetch user data because: " + error.message);
  }
}
