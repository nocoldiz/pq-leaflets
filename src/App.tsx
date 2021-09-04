import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchLeaflets } from "./actions";
import { LeafletItem } from "./types/dataTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Leaflet from './components/Leaflet';
import FiltersNavbar from './components/FiltersNavbar';

const App = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.leafletsReducer.filters);
  const leaflets = useSelector((state: RootState) => state.leafletsReducer.filteredLeaflets);
  useEffect(() => {
    dispatch(fetchLeaflets(filters, false))
  }, []);

  const listItems = leaflets.map((item: LeafletItem) =>
    <Col key={item.id.toString()} xs={12} sm={6} md={6} xl={3}>
      <Leaflet {...item}></Leaflet>
    </Col>
  );

  return (
    <>
      <FiltersNavbar></FiltersNavbar>
      <Container>
        <Row>
          {listItems}
        </Row>
      </Container>
    </>
  );
}

export default App;
