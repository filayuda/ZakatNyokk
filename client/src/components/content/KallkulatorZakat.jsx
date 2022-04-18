import React, { useEffect, useState } from 'react'
import {Nav, Link, Col, Row, Card, Form,Navbar, Container, NavDropdown, Button} from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import MenuBar from '../MenuBar'
import HeadlineCalc from '../../img/Headline_Calc.png'

const KalkulatorZakat = () => {
    const navigate = useNavigate()

    const zakat = 10000;

    const [nilai1, setNilai1] = useState(null)
    const [hasil, setHasil] = useState(null)

    console.log(nilai1)

    const total = () => { 
        setHasil(nilai1 * 20000)
    }

    const clear = ()=>{
        setHasil(0)
    }

    const bayar = () =>{ 
        navigate('/FormZakat')
    }

    useEffect( ()=> {
        clear()
    }, [])

    return (
        <div>
            <MenuBar />
            <Container style={{ marginTop:"100px", marginBottom:"30px" }}>
                <img src={HeadlineCalc} />
            </Container>

            <Nav className="CalcZakat" >
                <Container className="mt-5 p-3">
                    <Card>
                        <Row>
                            <Col md={7} className="pt-3 pb-3 ps-4">
                                <div className="formCalc p-5">
                                    <Row className="mb-3">
                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <Form.Select className="mb-3">
                                                <option selected>Pilih Zakat</option>
                                                <option name="z_fitrah">Zakat Fitrah</option>
                                                <option name="z_mal">Zakat Mal</option>
                                                <option name="fidyah">Fidyah</option>
                                            </Form.Select>

                                            <Form.Label style={{ color:"green", fontSize:"13px" }}>Jumlah Muzzaki</Form.Label>
                                            <Form.Control className="mb-3" name="fitrah" type="number" value={nilai1} onChange={e => setNilai1(e.target.value)}  placeholder="0" />

                                            <Form.Label style={{ color:"green", fontSize:"13px" }}>Total</Form.Label>
                                            <Form.Control placeholder="Rp.0" value={hasil} disabled/>

                                       
                                        </Form.Group>
                                    </Row>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-warning me-md-2 " onClick={total}>Hitung</button>
                                    </div>
                                </div>
                            </Col>

                            <Col md={5} className="pt-3 pb-3 pe-4">
                                <Form className="formCalc p-5">
                                    <Row className="mb-3">
                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <h3 className="text-center mb-4">Jumlah Zakat</h3>
                                            <h3 style={{ color:"green", fontWeight:"bold", textAlign:"center"}}>Rp. {hasil}</h3>
                                            
                                            <p style={{ fontSize:"13px", textAlign:"justify" }}> ”Rasulullah SAW mewajibkan zakat fithri dengan satu sho' kurma atau satu sho' gandum bagi setiap muslim yang merdeka maupun budak, laki-laki maupun perempuan, anak kecil maupun dewasa. Zakat tersebut diperintahkan dikeluarkan sebelum orang-orang keluar untuk melaksanakan shalat 'ied.” (HR. Bukhari dan Muslim). </p>
                                        </Form.Group>
                                    </Row>
                                    <div className="d-grid gap-2 col-3 mx-auto">
                                        <button className="btn btn-warning me-md-2 " onClick={bayar}>Bayar</button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </Nav>
            



            
        </div>
    )
}
export default KalkulatorZakat

