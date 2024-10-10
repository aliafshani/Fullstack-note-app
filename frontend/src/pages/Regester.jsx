import Form from "../components/Form"

function Regester() {
    return (
        <div className="form-container">
            <Form route='/api/user/register' method="register" />
        </div>
    )
}

export default Regester
