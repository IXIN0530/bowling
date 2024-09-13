import axios from 'axios'

const api = axios.create({
  baseURL: 'https://spritter-backend.onrender.com/',
  // baseURL: 'http://localhost:8000/',
  timeout: 60000,
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;