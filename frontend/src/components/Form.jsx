import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constans"
import { useState } from "react"

function Form({ route, method }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [Error, setError] = useState('')

    const navigate = useNavigate()

    let name = method === "login" ? 'Login' : 'Register'

    const handleSubmite = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            const res = await api.post(route, { username, password })

            if (method == 'login') {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate('/login')
            }

        } catch (error) {
            setLoading(false)
            setError(error)
            if (method === 'login') {
                navigate('/register')
            } else {
                navigate('/login')
            }

        } finally {
            setLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmite}>
            <h1>{name}</h1>

            <input
                className="form-input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" />

            <input
                className="form-input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" />
            <button className="form-button" type="submit">{name}</button>
        </form>
    )
}

export default Form
