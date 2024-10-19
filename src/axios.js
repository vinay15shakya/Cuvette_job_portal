
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // This is the base URL where your backend runs
});

export default instance;