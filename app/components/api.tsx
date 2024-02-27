import axios from 'axios'

const api = axios.create({
  baseURL: 'https://spritter-backend.onrender.com/',
  timeout: 10000,
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;