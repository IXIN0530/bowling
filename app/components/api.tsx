import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bowback-p4mw8ucv8-ixins-projects.vercel.app/',
  timeout: 20000,
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;