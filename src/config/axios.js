import Axios from 'axios';
import { baseUrl } from '../utils/constants';

const apiInstance = Axios.create();
apiInstance.defaults.baseURL = baseUrl;

apiInstance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem('access-token');
    if (access_token) {
      config.headers['Authorization'] = 'JWT ' + access_token;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    if (error.response) {
      const originalConfig = error.config;
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        Axios.post(`${baseUrl}/accounts/auth/jwt/refresh`, {
          refresh: localStorage.getItem('refresh-token'),
        })
          .then(res => {
            localStorage.setItem('access-token', res.access);
            localStorage.setItem('refresh-token', res.refresh);
          })
          .catch(err => {
            return Promise.reject(err);
          });
        return apiInstance(originalConfig);
      }
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
