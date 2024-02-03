import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 15000,
});

apiClient.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default apiClient;