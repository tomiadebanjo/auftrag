import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: apiBaseUrl,
});

export default instance;
