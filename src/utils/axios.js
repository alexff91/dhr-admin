import axios from 'axios';

const BACKEND_URL = 'https://app.vi-hr.com:8082';

const instance = axios.create({
  baseURL: `${BACKEND_URL}/api/v1`,
  timeout: 5000
});

export default instance;
