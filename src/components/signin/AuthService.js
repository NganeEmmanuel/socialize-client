import axios from 'axios';

const baseURL = 'http://localhost:8080';

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

      if (response.status === 200) {
      console.log('Signup token:', response.data.token);
        // Save the JWT token in local storage
       localStorage.setItem('token', response.data.token);

        // Set the authorization header for future requests
        this.setAuthorizationHeader(response.data.token);

        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      throw error;
    }
  }

  static async login(data) {
    try {
      const response = await api.post('/api/v1/auth/login', data);

      if (response.status === 200) {
        console.log('Login token:', response.data.token);
        // Save the JWT token in local storage
        localStorage.setItem('token', response.data.token);

        // Set the authorization header for future requests
        this.setAuthorizationHeader(response.data.token);

        return response.data;
      } else {
        throw new Error(response.data.error);
      }
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

      this.setAuthorizationHeader(token);
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static setAuthorizationHeader(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default AuthService;