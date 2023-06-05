import axios from "axios";


const baseUrl = () => {
    let baseURL
    if (process.env.NODE_ENV === 'production') {
        baseURL = "http://192.168.100.70:3001"
    }
    if (process.env.NODE_ENV === 'development') {
        baseURL = "http://localhost:3001"
    }

    return baseURL
}

const axiosInstance = axios.create({
    baseURL: baseUrl()
})

export default axiosInstance;