import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import fb from '../img/facebook.png'
import ig from '../img/instagram.png'
import tw from '../img/twitter.png'
import yt from '../img/youtube.png'
import wa from '../img/whatsapp.png'

import { API } from '../config/api'

const Template2 = () => {

    const { id } = useParams();
    const [link, setLink] = useState([]);

    const handleLinkId = async () => {
        try {
            const response = await API.get(`/getlink/${id}`);
            setLink(response.data.data.linkId);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleLinkId();
    }, []);

    return (
        <Container style={{ maxWidth: '700px', backgroundColor: '#6495ED' }}>
            <Col className='text-center p-5' style={{ minHeight: '100vh' }}>
                <div className='mb-3'>
                    <img src={`http://localhost:5000/uploads/${link?.picture}`} alt="pp" style={{ borderRadius: '50%', width: '80px' }} />
                </div>
                <h4>{link?.title}</h4>
                <p>{link?.description}</p>

                <a href={link?.link1} target="_blank" rel="noopener noreferrer">
                    <Row className='p-2 my-2' style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: '20px', border: 'aqua 3px solid' }}>
                        <Col md="1">
                            <img src={fb} alt="pp" style={{ borderRadius: '50%', width: '50px' }} />
                        </Col>
                        <Col md="10">
                            <h5 style={{ color: 'black' }}>Facebook</h5>
                        </Col>
                    </Row>
                </a>

                <a href={link?.link2} target="_blank" rel="noopener noreferrer">
                    <Row className='p-2 my-2' style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: '20px', border: 'aqua 3px solid' }}>
                        <Col md="1">
                            <img src={ig} alt="pp" style={{ borderRadius: '50%', width: '50px' }} />
                        </Col>
                        <Col md="10">
                            <h5 style={{ color: 'black' }}>Instagram</h5>
                        </Col>
                    </Row>
                </a>

                <a href={link?.link3} target="_blank" rel="noopener noreferrer">
                    <Row className='p-2 my-2' style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: '20px', border: 'aqua 3px solid' }}>
                        <Col md="1">
                            <img src={tw} alt="pp" style={{ borderRadius: '50%', width: '50px' }} />
                        </Col>
                        <Col md="10">
                            <h5 style={{ color: 'black' }}>Twitter</h5>
                        </Col>
                    </Row>
                </a>

                <a href={link?.link4} target="_blank" rel="noopener noreferrer">
                    <Row className='p-2 my-2' style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: '20px', border: 'aqua 3px solid' }}>
                        <Col md="1">
                            <img src={yt} alt="pp" style={{ borderRadius: '50%', width: '50px' }} />
                        </Col>
                        <Col md="10">
                            <h5 style={{ color: 'black' }}>Youtube</h5>
                        </Col>
                    </Row>
                </a>

                <a href={link?.link5} target="_blank" rel="noopener noreferrer">
                    <Row className='p-2 my-2' style={{ backgroundColor: 'white', alignItems: 'center', borderRadius: '20px', border: 'aqua 3px solid' }}>
                        <Col md="1">
                            <img src={wa} alt="pp" style={{ borderRadius: '50%', width: '50px' }} />
                        </Col>
                        <Col md="10">
                            <h5 style={{ color: 'black' }}>Whatsapp</h5>
                        </Col>
                    </Row>
                </a>
            </Col>
        </Container>
    )
}

export default Template2
