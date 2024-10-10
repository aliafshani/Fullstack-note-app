import { Navigate } from "react-router-dom";
import api from '../api'
import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constans.js";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => { auth().catch(() => setIsAuthenticated(false)) }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post('api/token/refresh', { refresh: refreshToken })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch {
            console.log(error);
            setIsAuthenticated(false)
        }
    }
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)


        if (!token) {
            setIsAuthenticated(false)
        }
        const decoded = jwtDecode(token)
        const exp = decoded.exp


        // console.log('mio');
        const now = Date.now() / 1000

        if (exp < now) {
            await refreshToken()

        } else {
            setIsAuthenticated(true)
            // console.log(exp, isAuthenticated);
        }
    }

    if (isAuthenticated === null) {
        return <div>loading ...</div>
    }


    return isAuthenticated ? children : <Navigate to={'/login/'} />
}

export default ProtectedRoute