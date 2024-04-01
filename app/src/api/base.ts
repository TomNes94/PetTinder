import axios from 'axios';

const client = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(config => {
  console.info('Request:', config.url, config.method, config.data);
  // Do something before request is sent
  return config;
});

client.interceptors.response.use(
  response => {
    console.info('Response:', response.status, response.data);
    // Do something before request is sent
    return response;
  },
  error => {
    console.info(
      'Response error:',
      Object.keys(error),
      error.response.status,
      error.response.statusText,
      error.response.data,
    );
    // Do something before request is sent
    return error;
  },
);

export default client;
