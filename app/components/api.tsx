import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bowback-gso78hlnf-ixins-projects.vercel.app',
  timeout: 20000,
});

api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default api;