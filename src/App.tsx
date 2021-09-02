import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchLeaflets } from "./actions";
import { LeafletItem, LeafletsRequest } from "./types/dataTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Leaflet from './components/Leaflet';
import FiltersNavbar from './components/FiltersNavbar';

const App = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<LeafletsRequest>({
    offset: 0,
    limit: 30,
    name: "",
    retailerId: "",
    excludeExpired: false,
    maxDistance: 0,
    sort: "priority,expTimestamp,distance,retailerName,leafletName"
  });
  const leaflets = useSelector((state: RootState) => state.leafletsReducer.leaflets);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setFilter({
    offset: 0,
    limit: 30,
    name: "",
    retailerId: "",
    excludeExpired: false,
    maxDistance: 0,
    sort: "priority,expTimestamp,distance,retailerName,leafletName"
  });
  useEffect(() => {
    dispatch(fetchLeaflets(filter))
  }, []);

  const listItems = leaflets.map((item: LeafletItem) =>
    <Col key={item.id.toString()} xs={12} sm={6} md={6} xl={3}>
      <Leaflet {...item}></Leaflet>
    </Col>
  );

  console.log(handleChange);


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
