import axios from 'axios';

const baseURL = 'https://socialize-client-production.up.railway.app';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

class AuthService {
  static async signup(data) {
    try {
      const response = await api.post('/api/v1/auth/signup', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async login(data) {
    try {
      const response = await api.post('/api/v1/auth/login', data);

      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {

      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;