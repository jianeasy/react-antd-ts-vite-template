import axios from "axios";

const req = axios.create({});

req.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return Promise.reject(new Error("Unexpected response status"));
  },
  () => {}
);
req.interceptors.request.use((requestConfig) => {
  return requestConfig;
});
export default req;
