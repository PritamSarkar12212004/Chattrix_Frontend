import axios from "axios";
const AxiosInstance = axios.create({
  baseURL: "http://192.168.250.18:3000",
});
export default AxiosInstance;
