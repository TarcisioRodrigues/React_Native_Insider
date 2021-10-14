import axios from 'axios';
export const key = '4fbe1933d17ad7b3dfd331f9b7b55a5c';
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;
