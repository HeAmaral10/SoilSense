import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // ou seu IP local se for no celular
});

export default api;
