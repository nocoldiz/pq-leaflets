import React from 'react';
import './Leaflet.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { LeafletItem } from '../../types/dataTypes'

const Leaflet = (props: LeafletItem) => {
    const convertTimestamp = (timestamp: number) => {
        let d = new Date(0);
        d.setUTCSeconds(timestamp);
        return d.toLocaleString();
    }

    return (
        <Card className="layout">
            <Card.Img variant="top" src={props.retailer.images.lg} />
            <ListGroup>
                <ListGroup.Item>
                    <span className="list-title">Name:</span>
                    {props.name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Retailer name:<br></br></span>
                    {props.retailer.name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Distance:</span>
                    {props.retailer.distance}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Expiration:</span>
                    {convertTimestamp(props.expTimestamp)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Priority:</span>
                    {props.retailer.priority}
                </ListGroup.Item>
            </ListGroup>
        </Card >
    );
}

export default Leaflet;
