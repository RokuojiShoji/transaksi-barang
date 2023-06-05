import axios from "axios";


const baseUrl = () => {
    
    baseURL = "http://192.168.100.70:3001"
    //baseURL = "http://localhost:3001"
    
    return baseURL
}

const axiosInstance = axios.create({
    baseURL: baseUrl()
})

export default axiosInstance;