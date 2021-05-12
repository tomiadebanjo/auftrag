import Axios from 'Services/axiosInstance';

const setAuthHeaders = (token) => {
  if (token) {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    Axios.defaults.headers.common['Authorization'] = null;
  }
};

export { setAuthHeaders };
