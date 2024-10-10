import axios from 'axios'
import { ACCESS_TOKEN } from './constans'


let api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (confige) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            confige.headers.Authorization = `Bearer ${token}`
        }
        return confige
    },
    (error) => {
        return Promise.reject(error)
    }

)
export default api