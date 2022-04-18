import React, { useState, useContext } from 'react'
import { UserContext } from '../context/userContext';
import { Button, Col, Container, Stack, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

import FormModal from '../components/modal/Modal'
import Login from '../components/modal/Login'
import Register from '../components/modal/Register'

import pcPhone from '../img/pcphone.png'
import Logo from '../img/logo.svg'


const Landing = () => {
    const navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    const [showRegister, setShowRegister] = useState(false);

    const handleShowRegister = () => {
        setShowRegister(true);
    };
    const handleCloseRegister = () => {
        setShowRegister(false);
    };

    const handleShowLogin = () => {
        dispatch({ type: "showLoginPopup" });
    };
    const handleCloseLogin = () => {
        dispatch({ type: "hideLoginPopup" });
    };

    const toggleToRegister = () => {
        setShowRegister(true);
        dispatch({ type: "hideLoginPopup" });
    };

    const toggleToLogin = () => {
        dispatch({ type: "showLoginPopup" });
        setShowRegister(false);
    };

    const checkAuth = () => {
        if (state.login === true) {
            navigate("/KalkulatorZakat");
        }
    };
    checkAuth();

    return (
        <>
            <FormModal show={state.showLoginPopup} handleClose={handleCloseLogin}>
                <Login toggle={toggleToRegister} handleClose={handleCloseLogin} />
            </FormModal>
            <FormModal show={showRegister} handleClose={handleCloseRegister}>
                <Register toggle={toggleToLogin} handleClose={handleCloseLogin} />
            </FormModal>
            <Container fluid className='Containerx'>
                <Stack direction="horizontal" gap={2} className="head">
                    <Col md="12" className='ps-5'>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginTop:"-50px" }} >
                        <Button variant="light" style={{ width:"120px", color: "black", border: "none", marginRight:"25px" }} className="navbut" onClick={handleShowLogin}>Login</Button>
                        <Button variant="warning" style={{ width:"120px", height:"35px", borderRadius:"15px", marginRight:"40px", color:"white", fontSize:"13px", fontWeight:"bold" }} onClick={handleShowRegister}> Registrasi </Button>
                    </div>
                    </Col>
                </Stack>
            </Container>
        </>
    )
}

export default Landing
