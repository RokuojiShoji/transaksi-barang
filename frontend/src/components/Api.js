import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.100.70:3001"
    // baseURL: "http://localhost:3001"
})

export default axiosInstance;