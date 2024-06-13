import axios from 'axios';

const baseURL = 'https://socialize-client-production.up.railway.app';

const api = axios.create({
  baseURL,
});

const APIFunctions = {
  signup: (data) => {
    return api.post('/signup', data);
  },
  login: (data) => {
    return api.post('/login', data);
  },
  getUsers: () => {
    return api.get('/users');
  },
  createPost: (data) => {
    return api.post('/posts', data);
  },
};

export default APIFunctions;