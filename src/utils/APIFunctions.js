import axios from 'axios';

const baseURL = 'https://socialize-client-production.up.railway.app';

const api = axios.create({
  baseURL,
});

export const signup = (data) => {
  return api.post('/signup', data);
};

export const login = (data) => {
  return api.post('/login', data);
};

export const getUsers = () => {
  return api.get('/users');
};

export const createPost = (data) => {
  return api.post('/posts', data);
};

export default {
  signup,
  login,
  getUsers,
  createPost,
};
