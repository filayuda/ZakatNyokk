import React, { useContext } from 'react'
import { Stack,ButtonGroup, Col, Nav, Navbar, Row, Container, Button, InputGroup,Card, FormControl, Dropdown,NavDropdown, SplitButton } from 'react-bootstrap'

import Logo from '../img/logo.svg'
import Cubes from '../img/cubes.svg'
import User from '../img/user.svg'
import Links from '../img/link.svg'
import Logout from '../img/logout.svg'
import logoBmt from '../img/logo_bmt.png'
import logoNurulhuda from '../img/nurulHuda.png'

import { Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

function MenuBar() {
    const navigate = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const handleLogout = () => {
        dispatch({
            type: "logout",
        });
        navigate('/landing')
    };
    return (
        <Navbar fixed="top" bg="white" expand="sm">
            <Container className="p-2 mx-4" fluid>
                <Navbar.Brand className='ps-5'>
                        <Nav >
                            <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Firmansya"
                            menuVariant="dark"
                            style={{ fontSize:"15px", color:"green"}}
                            >
                                <div style={{ fontSize:"13px" }}>
                                    <NavDropdown.Item href="#action/3.1">Calculator Zakat</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Zakat</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Laporan Zakat</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Sign'out</NavDropdown.Item>
                                </div>
                            </NavDropdown>
                        </Nav>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                    </Nav>
                    <img src={logoBmt} style={{marginRight:"20px"}}/>
                    <img src={logoNurulhuda} style={{marginRight:"20px"}} />
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="" className="navbut" style={{ color:"green" }}>Team</Button>
                        <Button variant="" className="navbut" style={{ color:"green" }}>Media</Button>
                        <Button variant="" className="navbut" style={{ color:"green" }}>Blog</Button>
                        <Button variant="" className="navbut" style={{ color:"green" }} >Contact</Button>
                    </ButtonGroup>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export default MenuBar