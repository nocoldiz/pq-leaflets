import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchLeaflets } from "./actions";
import { LeafletItem } from "./types/dataTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import Leaflet from './components/Leaflet';
import FiltersNavbar from './components/FiltersNavbar';

const App = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.leafletsReducer.filters);
  const loading = useSelector((state: RootState) => state.leafletsReducer.loading);
  const leaflets = useSelector((state: RootState) => state.leafletsReducer.filteredLeaflets);

  useEffect(() => {
    dispatch(fetchLeaflets(filters, false))
  }, []);

  // Crea lista volantini
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
          {loading ? <Spinner className="m-auto" animation="border" /> : ""}
          {listItems}
          {!loading && leaflets.length == 0 ? (<Alert variant="secondary">
            No leaflet found with the current criteria
          </Alert>
          ) : ""}
        </Row>
      </Container>
    </>
  );
}

export default App;
