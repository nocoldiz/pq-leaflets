import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchLeaflets } from "./actions";
import { ApiRequest } from "./types/dataTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<ApiRequest>({
    offset: 0,
    limit: 30,
    name: "",
    retailerId: "",
    excludeExpired: false,
    maxDistance: 0,
    sort: "priority,expTimestamp,distance,retailerName,leafletName"
  });
  const apiState = useSelector((state: RootState) => state.api);

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

  const listItems = apiState.response?.leaflets.map((item) =>
    <Col sm={12} md={3}>{item.name}</Col>
  );


  return (
    <div className="App">
      <Container fluid>
        <Row>
          {listItems}
        </Row>
      </Container>
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default App;
