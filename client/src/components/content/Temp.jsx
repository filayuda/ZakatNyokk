import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import Temps from '../../DataTemplate.json'

const Temp = () => {
    return (
        <Col md="12" className='bgContent' >
            <Row className='titleContent'>
                <h5 style={{ fontWeight: "bolder" }}>Template</h5>
            </Row>
            <Row className='mt-3'>
                {Temps.map(data => {
                    return (
                        <Col md="3" key={data.id}>
                            <Link to={{ pathname: `/addlink/${data.id}` }}>
                                {/* <Card.Body>{ data.id }</Card.Body> */}
                                <Card.Img variant="top" src={data.image} style={{width:"70%"}}/>
                            </Link>
                        </Col>
                    )
                })}


            </Row>
        </Col>
    )
}
export default Temp
