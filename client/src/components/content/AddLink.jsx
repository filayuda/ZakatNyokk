import React, { useState } from 'react'
import { Col, Row, Form, Button, Stack, FormLabel } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import fb from '../../img/facebook.png'
import ig from '../../img/instagram.png'
import tw from '../../img/twitter.png'
import yt from '../../img/youtube.png'
import wa from '../../img/whatsapp.png'
import mobile from '../../img/mobile.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { API } from '../../config/api'

const AddLink = () => {
    const navigate = useNavigate();
    let { id } = useParams();

    const [preview, setPreview] = useState(); //For image preview
    const [link, setLink] = useState({
        picture: "",
        title: "",
        description: "",
        link1: "",
        link2: "",
        link3: "",
        link4: "",
        link5: ""
    })

    const { title, description, link1, link2, link3, link4, link5, } = link;

    const handleChange = (e) => {
        setLink({
            ...link,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Create Configuration Content-type here ...
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("picture", link.picture[0], link.picture[0].name);
            formData.set("title", link.title);
            formData.set("description", link.description);
            formData.set("link1", link.link1);
            formData.set("link2", link.link2);
            formData.set("link3", link.link3);
            formData.set("link4", link.link4);
            formData.set("link5", link.link5);
            
            console.log(link)


            // Insert data user to database here ...
            // const test = await API.post(`/addlink/${id}`, formData, config)
            const test = await API.post(`/addlink`, formData, config)
            console.log(test)
            // await API.post(`/addlink`, formData, config)
            navigate('/mylink');
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <Col md="10" className='bgContent'>
            <Row className='titleContent'>
                <h5 style={{ fontWeight: "bolder" }}>Template</h5>
            </Row>
            <Row className='mt-3'>
                <Form onSubmit={handleSubmit}>
                    <Stack direction="horizontal" gap={3}>
                        <h5 style={{ fontWeight: "bolder", marginBottom: "30px" }}>Create Link!!</h5>
                        <Button className="ms-auto" variant="warning" type='submit' style={{ borderRadius: '20px' }}>
                            Publish Link
                        </Button>
                    </Stack>
                    <Row>
                        <Col md="8">
                            <div style={{ backgroundColor: 'white', padding: '40px', paddingBottom: '50px', borderRadius: '20px' }}>
                                <Row className='align-items-center mb-4'>
                                    <Col md="3">
                                        {preview && (
                                            <img src={preview} style={{ borderRadius: '10%', width: '80px' }} alt="preview" />
                                        )}
                                    </Col>
                                    <Col md="5">
                                        <FormLabel className="custom-file-upload">
                                            <input style={{ display: 'none' }}
                                                type="file"
                                                name="picture"
                                                onChange={handleChange}
                                            />Upload</FormLabel>
                                    </Col>
                                </Row>

                                <Form.Text>Title</Form.Text>
                                <input className='inputUnderline'
                                    type="text"
                                    placeholder="ex. Your Title"
                                    name="title"
                                    value={title}
                                    onChange={handleChange}
                                />
                                <Form.Text>Description</Form.Text>
                                <input className='inputUnderline'
                                    type="text"
                                    placeholder="ex. Description Here"
                                    name="description"
                                    value={description}
                                    onChange={handleChange}
                                />

                                <Row className='align-items-center mb-4'>
                                    <Col md="2">
                                        {/* <element.facebook /> */}
                                        <img src={fb} alt="" style={{ borderRadius: '10%', width: '80px' }} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Text>Facebook</Form.Text>
                                        <input className='inputUnderline'
                                            type="text"
                                            placeholder="url facebook"
                                            name="link1"
                                            value={link1}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className='align-items-center mb-4'>
                                    <Col md="2">
                                        <img src={ig} alt="" style={{ borderRadius: '10%', width: '80px' }} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Text>Instagram</Form.Text>
                                        <input className='inputUnderline'
                                            type="text"
                                            placeholder="url instagram"
                                            name="link2"
                                            value={link2}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className='align-items-center mb-4'>
                                    <Col md="2">
                                        <img src={tw} alt="" style={{ borderRadius: '10%', width: '80px' }} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Text>Twitter</Form.Text>
                                        <input className='inputUnderline'
                                            type="text"
                                            placeholder="url twitter"
                                            name="link3"
                                            value={link3}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className='align-items-center mb-4'>
                                    <Col md="2">
                                        <img src={yt} alt="" style={{ borderRadius: '10%', width: '80px' }} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Text>Youtube</Form.Text>
                                        <input className='inputUnderline'
                                            type="text"
                                            placeholder="url youtube"
                                            name="link4"
                                            value={link4}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                                <Row className='align-items-center mb-4'>
                                    <Col md="2">
                                        <img src={wa} alt="" style={{ borderRadius: '10%', width: '80px' }} />
                                    </Col>
                                    <Col md="6">
                                        <Form.Text>Whatsapp</Form.Text>
                                        <input className='inputUnderline'
                                            type="text"
                                            placeholder="url whatsapp"
                                            name="link5"
                                            value={link5}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className='text-center'>
                            <img src={mobile} alt="phone" style={{ maxWidth: '70%' }} />
                        </Col>
                    </Row>
                </Form>
            </Row >
        </Col >
    )
}

export default AddLink