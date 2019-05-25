import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000
});

export default instance;
