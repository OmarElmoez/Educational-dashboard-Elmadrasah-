import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://elmadrasah-development-ff14bf466889.herokuapp.com/",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('persist:auth');

    const parsedAuth = auth && auth.length > 0 ? JSON.parse(auth) : null;

    const parsedUser = parsedAuth.user && parsedAuth.user.length > 0 ? JSON.parse(parsedAuth.user) : null;

    const token = parsedUser ? parsedUser.token  : "";
    
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) =>   Promise.reject(error)
  
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
