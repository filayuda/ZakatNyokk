import React, { useEffect, useState } from 'react'
import { Col, Row, Form, Button, Modal, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import View from '../../img/View.svg'
import Edit from '../../img/Edit.svg'
import Delete from '../../img/Delete.svg'

import { API } from '../../config/api'

const MyLink = () => {
    const [myLink, setMyLink] = useState([]);
    const [filter, setFilter] = useState('');

    const [visit, setVisit] = useState(0)

    const loadMyLink = async () => {
        try {
            const response = await API.get("/mylink");
            setMyLink(response.data.data.linkId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (dataid) => {
        try {
            await API.delete(`/mylink/${dataid}`)
            handleClose();
            loadMyLink();
        } catch (error) {
            console.log(error);
        }
    };

    const handleVisit = () => {
        setVisit(visit + 1)

    }

    useEffect(() => {
        loadMyLink();
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.warn(filter)
  
    return (
        <Col md="10" className='bgContent'>
            <Row className='titleContent'>
                <h5 style={{ fontWeight: "bolder" }}>My Links</h5>
            </Row>
            <Row className='my-3' style={{ alignItems: 'center' }}>
                <Col md="2">
                    <h5 style={{ fontWeight: "bolder" }}>All Links</h5>
                </Col>
                <Col md="8">
                    <Form.Control type="text" placeholder="find your link" onChange={event => setFilter(event.target.value)} />
                </Col>
                <Col md="2">
                    <Button variant="warning" className="navbut" >Search</Button>
                </Col>
            </Row>
            <hr />

            {
                myLink.filter(data => {
                    if (filter === '') {
                        return data;
                    } else if (data.title.toLowerCase().includes(filter.toLowerCase())) {
                     return data;
                    }
                }).map((data) => (
                    <Row className='mt-4 align-items-center' key={data.id}>
                        <Col md="2">
                            <img style={{ width: '100%' }} src={`http://localhost:5000/uploads/${data.picture}`} alt="pict" />
                        </Col>

                        <Col md="4">
                            <h4>{data.title}</h4>
                            <Form.Text>localhost:3000/template/{data.template_id}/{data.id}</Form.Text>
                        </Col>

                        <Col md="2">
                            <h4>{visit}</h4>
                            <Form.Text>Visit</Form.Text>
                        </Col>

                        <Col md="1">
                            <Link to={`/template/${data.template_id}/${data.id}`} target='blank'>
                                <img src={View} alt="view" onClick={handleVisit} />
                            </Link>
                        </Col>

                        <Col md="1">
                            <Link to={`/editlink/${data.id}`}>
                                <img src={Edit} alt="edit" />
                            </Link>
                        </Col>
                        <Col>
                            <img src={Delete} alt="delete"
                                onClick={() => {
                                    handleDelete(data.id);
                                }}
                            />
                        </Col>

                        <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>you are sure you want to remove this link!</Modal.Body>
                            <Stack direction="horizontal" gap={3}>
                                <Button variant="danger" className='ms-auto px-5'>
                                    Yes
                                </Button>
                                <Button variant="secondary" className='px-5' onClick={handleClose}>
                                    No
                                </Button>
                            </Stack>
                        </Modal>
                    </Row>
                ))
            }


            {/* {myLink.map(data => {
                return (
                    <Row className='mt-4 align-items-center' key={data.id}>
                        <Col md="2">
                            <img style={{ width: '100%' }} src={`http://localhost:5000/uploads/${data.picture}`} alt="pict" />
                        </Col>

                        <Col md="4">
                            <h4>{data.title}</h4>
                            <Form.Text>localhost:3000/template/{data.template_id}/{data.id}</Form.Text>
                        </Col>

                        <Col md="2">
                            <h4>{visit}</h4>
                            <Form.Text>Visit</Form.Text>
                        </Col>

                        <Col md="1">
                            <Link to={`/template/${data.template_id}/${data.id}`} target='blank'>
                                <img src={View} alt="view" onClick={handleVisit} />
                            </Link>
                        </Col>

                        <Col md="1">
                            <Link to={`/editlink/${data.id}`}>
                                <img src={Edit} alt="edit" />
                            </Link>
                        </Col>
                        <Col>
                            <img src={Delete} alt="delete"
                                onClick={() => {
                                    handleDelete(data.id);
                                }}
                            />
                        </Col>

                        <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>you are sure you want to remove this link!</Modal.Body>
                            <Stack direction="horizontal" gap={3}>
                                <Button variant="danger" className='ms-auto px-5'>
                                    Yes
                                </Button>
                                <Button variant="secondary" className='px-5' onClick={handleClose}>
                                    No
                                </Button>
                            </Stack>
                        </Modal>
                    </Row>
                )
            })} */}
        </Col >
    )
}

export default MyLink