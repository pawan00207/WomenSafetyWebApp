import axios from 'axios';

const API = axios.create({ baseURL: 'https://womensecbackend.onrender.com' });

export default API;