import Form from "../components/Form"

function Login() {
    return (
        <div className="form-container">
            <Form route={'/api/token/'} method={'login'} />
        </div>
    )
}

export default Login
