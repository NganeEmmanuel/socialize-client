import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username, password) => {
  try {
    const response = await api.get('/api/v1/auth/login', { username, password });
    const { token } = response.data; // Extract the token correctly from response data
    localStorage.setItem('token', token); // Store the token in local storage
    return true; // Return true on successful login
  } catch (error) {
    console.error("Login failed:", error);
    return false; // Return false on login failure
  }
};

export async function signup(data) {
  try {
    const response = await api.post('/api/v1/auth/signup', data);
    const { token } = response.data; // Extract the token correctly from response data
    return response; // Return the response object on successful signup
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Unable to signup because: " + error.message); // Throw an error with a specific message
  }
};

export async function getLoggedInUserByUsername(username){
  try {
    const response = await api.get('/api/v1/user/getUser', { params: { username } });
    return response.data;
  } catch (error) {
    console.error("Fetching user data failed:", error);
    throw new Error("Unable to fetch user data because: " + error.message); // Throw an error with a specific message
  }
}
