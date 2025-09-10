import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.28.128.1:3000', // ou seu IP local se for no celular
});

export default api;
