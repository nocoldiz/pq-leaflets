import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { fetchLeaflets } from "./actions";
import { Request } from "./types/dataTypes";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<Request>({
    offset: 0,
    limit: 30,
    name: "",
    retailerId: "",
    excludeExpired: false,
    maxDistance: 0,
    sort: "priority,expTimestamp,distance,retailerName,leafletName"
  });
  const data = useSelector((state: RootState) => state);

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

  useEffect(() => {
    let ret = data.api?.response;
    if (ret) {
      console.log(ret)
    }
  }, [data]);

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col sm={12} md={3}></Col>
        </Row>
      </Container>
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default App;
