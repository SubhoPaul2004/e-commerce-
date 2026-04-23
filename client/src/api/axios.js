import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
});


API.interceptors.request.use((config) => {
  const userStorage = localStorage.getItem('user-storage');
  if (userStorage) {
    const parsedStorage = JSON.parse(userStorage);
    // Zustand saves data inside a 'state' object
    if (parsedStorage.state?.user?.token) {
      config.headers.Authorization = `Bearer ${parsedStorage.state.user.token}`;
    }
  }
  return config;
});


export default API;