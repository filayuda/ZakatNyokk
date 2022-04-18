import React, { useEffect, useState } from 'react'
import {Nav, Link, Col, Row, Card, Form,Navbar, Container, NavDropdown, Button} from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import MenuBar from '../MenuBar'
import HeadlineFormZakat from '../../img/HeadlineFormZakat.png'
import iconZakat from '../../img/iconZakat.png'

import {API} from '../../config/api'

const FormZakat = () => {
    const navigate = useNavigate(); 

    const [form, setForm] = useState({
        name:"",
        tanggal:"",
        idZakat:"",
        payment:"",
        amil:""
    })
    const {name, tanggal, idZakat, payment, amil} = form

    const handleChange =(e) => {
        setForm({ 
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    // console.log(form)

    const handleSubmit = async(e) =>{ 
        try {
            e.preventDefault();
            
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData(); 
            formData.set("name", form.name);
            formData.set("tanggal", form.tanggal);
            formData.set("idZakat", form.idZakat);
            formData.set("payment", form.payment);
            formData.set("amil", form.amil);

            console.log(form)

            const test = await API.post('/addtransaction', formData, config)
            console.log(test)

            // navigate('/KalkulatorZakat')

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <MenuBar />
            <Container style={{ marginTop:"100px", marginBottom:"30px" }}>
                <img src={HeadlineFormZakat} />
            </Container>

            <Nav className="CalcZakat" >
                <Container className="mt-5 p-3">
                    {/* <Card> */}
                        <Row className="formZakat">
                            <Col md={4} className="pt-3 pb-3 ps-4">
                                <img src={iconZakat} />
                            </Col>

                            <Col md={8} className="p-4">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label style={{ color:"white" }}>Nama Lengkap</Form.Label>
                                        <Form.Control name="name" type="text" placeholder="Your Muzzaki..." value={name} onChange={handleChange} />
                                        {/* <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                        </Form.Text> */}
                                        <Form.Label style={{ color:"white" }}>Tanggal</Form.Label>
                                        <Form.Control name="tanggal" type="date" placeholder="Tanggal Zakat..." value={tanggal} onChange={handleChange} />

                                        <Form.Label style={{ color:"white" }}>Jenis Zakat</Form.Label>
                                        <Form.Control name="idZakat" type="text" placeholder="Jenis Zakat..." value={idZakat} onChange={handleChange} />

                                        <Form.Label style={{ color:"white" }}>Jumlah Zakat</Form.Label>
                                        <Form.Control name="payment" type="number" placeholder="Jumlah Zakat..." value={payment} onChange={handleChange} />
                                        
                                        <Form.Label style={{ color:"white" }}>Nama Amil</Form.Label>
                                        <Form.Control name="amil" type="text" placeholder="Your Amil..." value={amil} onChange={handleChange} />
                                    </Form.Group>
                                    <Button type="submit" style={{ backgroundColor:"#ffc107", color:"green", fontWeight:"bold", marginRight:"10px" }}>
                                        Simpan
                                    </Button>
                                    <Button type="submit" style={{ backgroundColor:"#ffc107", color:"green", fontWeight:"bold", marginRight:"10px" }}>
                                        Cancel
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    {/* </Card> */}
                </Container>
            </Nav>
            



            
        </div>
    )
}
export default FormZakat

