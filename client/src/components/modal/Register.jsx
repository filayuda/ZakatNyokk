import React, { useState } from 'react'
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { API } from '../../config/api'

const Register = ({ toggle }) => {

    const [message, setMessage] = useState(null);
    const [regist, setRegist] = useState({
        email: "",
        password: "",
        name: ""
    })

    const { email, password, name } = regist;

    const handleChange = (e) => {
        setRegist({
            ...regist,
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
            const body = JSON.stringify(regist)

            // Insert data user to database here ...
            const response = await API.post('/register', body, config)

            // Notification
            if (response.data.status === "success") {
                const alert = (
                    <Alert variant="success" className="py-1">
                        Success
                    </Alert>
                );
                setMessage(alert);
            } else {
                const alert = (
                    <Alert variant="danger" className="py-1">
                        Failed
                    </Alert>
                );
                setMessage(alert);
            }
        } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
        }
    };

    return (
        <>
            <Modal.Title id="contained-modal-title-vcenter" className="fw-bold mb-4">
                Register
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

                <Form.Group className="inputForm" controlId="formBasicText">
                    <Form.Control
                        className='inputControl'
                        placeholder="Full Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                    <Button variant='warning' style={{ height: '50px' }}
                        type="submit">Sign Up</Button>
                </div>

                <Form.Group className="mb-3 mb-3 text-center">
                    <Form.Text style={{ color: 'black', fontSize: '18px' }}>Already have an account ? Klik {" "}
                        <label style={{ color: 'black', fontWeight: 'bolder' }} onClick={toggle}> Here</label>
                    </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
}

export default Register
