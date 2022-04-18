import React, { useContext, useState } from 'react'
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { API, setAuthToken } from '../../config/api'
import { UserContext } from '../../context/userContext'

const Login = ({ toggle }) => {

    const [, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null);
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const { email, password } = login;

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Create Configuration Content-type here ...
            // Content-type: application/json
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            // Convert form data to string here ...
            const body = JSON.stringify(login)

            // Insert data user for login process here ...
            const response = await API.post('/login', body, config)
            // console.log(response)

            setAuthToken(response.data.data.token);
            // console.log(response.data.data);

            dispatch({
                type: "login",
                payload: response.data.data,
            });

            // Checking process
            if (response?.status === 200) {

                const alert = (
                    <Alert variant="success" className="py-1">
                        Login success
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Login failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    return (
        <>
            <Modal.Title id="contained-modal-title-vcenter" className="fw-bold mb-4">
                Login
            </Modal.Title>
            {message && message}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="inputForm" controlId="formBasicEmail">
                    <Form.Control
                        className='inputControl'
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="inputForm" controlId="formBasicPassword">
                    <Form.Control
                        className='inputControl'
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <div className="d-grid gap-2 mb-3">
                    <Button variant='warning' style={{ height: '50px' }} type='submit' >Login</Button>
                </div>
                <Form.Group className="mb-3 text-center">
                    <Form.Text style={{ color: 'black', fontSize: '18px' }}>Don't have an account ? Klik {" "}
                        <label style={{ color: 'black', fontWeight: 'bolder' }} onClick={toggle}> Here</label>
                    </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
}

export default Login
