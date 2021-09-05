import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { fetchLeaflets, filterLeaflets, sortLeaflets } from "../../actions";



import './FiltersNavbar.scss';
import { Retailer } from '@src/types/dataTypes';


const FiltersNavbar = () => {


  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.leafletsReducer.filters);

  const leaflets = useSelector((state: RootState) => state.leafletsReducer.leaflets);
  const retailers = useSelector((state: RootState) => state.leafletsReducer.retailers);

  // Initialize double slider


  const getRetailerNameFromId = (id: string) => {
    return retailers.filter(item => {
      return (item.id == id)
    })[0].name;
  };
  const checkOrder = (name: string) => {
    return filters.sort.indexOf(name)
  };

  filters.sort.indexOf("-priority") !== -1
  const listRetailers = retailers.map((item: Retailer) =>
    <NavDropdown.Item
      key={item.id}
      active={item.id == filters.retailerId}
      onClick={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, retailerId: item.id }))}
      as="li" >
      {item.name}
    </NavDropdown.Item >
  );
  return (
    <Navbar sticky='top' bg='light' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>PQ-Leaflets</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='m-auto'>
            <Nav.Item>
              <InputGroup>
                <FormControl
                  placeholder='Search name or retailer'
                  aria-label='Search'
                  onChange={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, name: evt.target.value }))}
                />
              </InputGroup>
            </Nav.Item>
            <NavDropdown title='Set offset and limit' id='basic-nav-dropdown'>

              <NavDropdown.Item disabled>
                <Form>
                  <Form.Group>
                    <Form.Label>Offset:</Form.Label>
                    <Form.Control
                      className="mobileBox"
                      required
                      name="offset"
                      type="number"
                      value={filters.offset}
                      onChange={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, offset: parseInt(evt.target.value) }))}
                    />
                  </Form.Group>
                </Form></NavDropdown.Item>
              <NavDropdown.Item disabled>
                <Form>
                  <Form.Group>
                    <Form.Label>Limit:</Form.Label>
                    <Form.Control
                      className="mobileBox"
                      required
                      name="limit"
                      type="number"
                      value={filters.limit}
                      onChange={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, limit: parseInt(evt.target.value) }))}
                    />
                  </Form.Group>
                </Form></NavDropdown.Item>              <NavDropdown.Divider />

              <NavDropdown.Item>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title={filters.retailerId != "" ? getRetailerNameFromId(filters.retailerId) : 'Filter by retailer'} id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, retailerId: "" }))}>
                None
              </NavDropdown.Item>
              {listRetailers}
            </NavDropdown>
            <Nav.Item className='m-auto'>
              <Form>
                <Form.Check
                  type='checkbox'
                  id='exclude-expired'
                  onChange={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, excludeExpired: evt.target.checked ? 1 : 0 }))}
                  label='Exclude expired'
                />
              </Form>
            </Nav.Item>
            <Nav.Item>
              <InputGroup>
                <FormControl
                  type="number"
                  value={filters.maxDistance}
                  onChange={(evt) => dispatch(filterLeaflets(leaflets, { ...filters, maxDistance: parseInt(evt.target.value) }))}
                  placeholder='Max distance'
                />
              </InputGroup>
            </Nav.Item>
            <NavDropdown title='Sort by' id='basic-nav-dropdown'>
              <NavDropdown.Item onClick={(evt) => dispatch(sortLeaflets(leaflets, checkOrder("-priority") !== -1 ? "priority" : "-priority", filters))} >
                <span className="mr-3">{checkOrder("-priority") !== -1 ? "▼" : "▲"}</span>
                Priority
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(evt) => dispatch(sortLeaflets(leaflets, checkOrder("-expTimestamp") !== -1 ? "expTimestamp" : "-expTimestamp", filters))} >
                <span className="pr-3">{checkOrder("-expTimestamp") !== -1 ? "▼" : "▲"}</span>
                ExpTimestamp
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(evt) => dispatch(sortLeaflets(leaflets, checkOrder("-distance") !== -1 ? "distance" : "-distance", filters))} >
                <span className="pr-3">{checkOrder("-distance") !== -1 ? "▼" : "▲"}</span>
                Distance
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(evt) => dispatch(sortLeaflets(leaflets, checkOrder("-retailerName") !== -1 ? "retailerName" : "-retailerName", filters))} >
                <span className="pr-3">{checkOrder("-retailerName") !== -1 ? "▼" : "▲"}</span>
                Retailer name
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(evt) => dispatch(sortLeaflets(leaflets, checkOrder("-leafletName") !== -1 ? "leafletName" : "-leafletName", filters))} >
                <span className="pr-3">{checkOrder("-leafletName") !== -1 ? "▼" : "▲"}</span>
                Leaflet name
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Button variant="primary" onClick={() => dispatch(fetchLeaflets(filters, true))}>Fetch from API</Button>{' '}

            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar >
  );
}

export default FiltersNavbar;
