import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Form, Button, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { API } from '../../config/api'
import { UserContext } from '../../context/userContext'

const Profile = () => {
    const navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
    })

    const { name, email } = profile;

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        })
    }

    const handleAccount = async () => {
        try {
            const getAccount = await API.get(`/myaccount`);
            setProfile(getAccount.data.data.accountId);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleAccount();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Create Configuration Content-type here ...
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const formData = {
                name: profile.name,
                email: profile.email,
            }

            // Insert data user to database here ...
            await API.patch(`/profile`, formData, config)

            navigate(`/profile`);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (e) => {
        try {
            e.preventDefault();
            // Create Configuration Content-type here ...
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            // Insert data user to database here ...
            await API.delete(`/profile`, config)

            dispatch({
                type: "logout",
            });
            navigate('/landing')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Col md="10" className='bgContent'>
            <Row className='titleContent'>
                <h5 style={{ fontWeight: "bolder" }}>My Account</h5>
            </Row>
            <Row className='mt-3'>
                <h5 style={{ fontWeight: "bolder", marginBottom: "30px" }}>My Information</h5>
                <Form onSubmit={handleSubmit}>
                    <div style={{ backgroundColor: 'white', padding: '40px', paddingBottom: '50px', borderRadius: '20px' }}>
                        <Form.Text>Name</Form.Text>
                        <input className='inputUnderline'
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                        <Form.Text>Email</Form.Text>
                        <input className='inputUnderline'
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <Stack direction="horizontal" gap={3} className='me-5 mt-2'>
                        <Button className="ms-auto" variant="warning" type="submit" style={{ borderRadius: '20px' }}>
                            Save Account
                        </Button>
                        <Button variant="danger" type="submit" style={{ borderRadius: '20px' }} onClick={handleDelete}>
                            Delete Account
                        </Button>
                    </Stack>
                </Form>
            </Row>
        </Col>
    )
}

export default Profile

