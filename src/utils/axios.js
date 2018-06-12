import axios from 'axios';

const BACKEND_URL = 'https://168.63.13.234:8082';

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  // timeout: 5000
});

export default instance;
