import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';

//import { RootState } from '../../store';
import NavDropdown from 'react-bootstrap/NavDropdown';
//import { useDispatch, useSelector } from 'react-redux';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { SliderRail, Handle, Track } from '../Slider/Slider';

import Container from 'react-bootstrap/Container';

import './FiltersNavbar.scss';
const sliderStyle = {
  position: 'relative' as 'relative',
  width: '100%',
  touchAction: 'none',
};

const domain = [0, 100];
const defaultValues = [0, 30];

const FiltersNavbar = () => {
  // const dispatch = useDispatch();
  // const filters = useSelector((state: RootState) => state.leafletsReducer.filters);
  const [update, setUpdate] = useState<ReadonlyArray<number>>([0, 30]);
  const [values, setValues] = useState<ReadonlyArray<number>>([0, 30]);

  const onUpdate = (update: ReadonlyArray<number>) => {
    setUpdate(update);
  };
  console.log(defaultValues);
  console.log(update);

  const onChange = (values: ReadonlyArray<number>) => {
    setValues(values);
  };
  console.log(values);

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
                />
              </InputGroup>
            </Nav.Item>
            <NavDropdown title='Set offset and limit' id='basic-nav-dropdown'>
              <NavDropdown.Item>Offset: {values[0]}</NavDropdown.Item>
              <NavDropdown.Item>Limit: {values[1]}</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item>
                <Slider
                  className='pt-2 pb-2'
                  mode={2}
                  step={1}
                  domain={domain}
                  rootStyle={sliderStyle}
                  onUpdate={onUpdate}
                  onChange={onChange}
                  values={values}
                >
                  <Rail>
                    {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                  </Rail>
                  <Handles>
                    {({ handles, getHandleProps }) => (
                      <div className='slider-handles'>
                        {handles.map((handle) => (
                          <Handle
                            key={handle.id}
                            handle={handle}
                            domain={domain}
                            getHandleProps={getHandleProps}
                          />
                        ))}
                      </div>
                    )}
                  </Handles>
                  <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                      <div className='slider-tracks'>
                        {tracks.map(({ id, source, target }) => (
                          <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                          />
                        ))}
                      </div>
                    )}
                  </Tracks>
                </Slider></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title='Filter by retailer' id='basic-nav-dropdown'>
              <NavDropdown.Item >
                <Form>
                  {['De Masi SPA', 'Milan Salierno'].map((type: any) => (
                    <div key={`default-${type}`} className='mb-3 mt-3'>
                      <Form.Check
                        type='radio'
                        id={`${type}`}
                        label={`${type}`}
                      />
                    </div>
                  ))}
                </Form>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item className='m-auto'>
              <Form>
                <Form.Check
                  type='checkbox'
                  id='exclude-expired'
                  label='Exclude expired'
                />
              </Form>
            </Nav.Item>
            <Nav.Item>
              <InputGroup>
                <FormControl
                  type="number"
                  placeholder='Max distance'
                  value={0}
                />
              </InputGroup>
            </Nav.Item>
            <NavDropdown title='Sort by' id='basic-nav-dropdown'>
              <NavDropdown.Item >
                priority
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default FiltersNavbar;
