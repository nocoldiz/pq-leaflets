import React from 'react';
import './Leaflet.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import { LeafletItem } from '../../types/dataTypes'

const Leaflet = (props: LeafletItem) => {
    return (
        <Card className="layout">
            <Card.Img variant="top" src={props.retailer.images.lg.toString()} />
            <ListGroup>
                <ListGroup.Item>
                    <span className="list-title">Name: </span>{props.name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Retailer: </span>{props.retailer.name}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Distance: </span>{props.retailer.distance}
                </ListGroup.Item>
                <ListGroup.Item>
                    <span className="list-title">Expiration: </span>{props.expTimestamp}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default Leaflet;
