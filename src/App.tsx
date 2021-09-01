import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "./store";
import { fetchLeaflets } from "./actions";

function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 30,
    name: "",
    retailerId: "",
    excludeExpired: false,
    maxDistance: 0,
    sort: "priority,expTimestamp,distance,retailerName,leafletName"
  });
  const leaflets = useSelector((state: RootStore) => state.leaflets);
  
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
    // Update the document title using the browser API
    dispatch(fetchLeaflets(filter))
  }, []);
  //      <button onClick={handleSubmit}>Search</button>


  console.log("Leaflets:", leaflets);
  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export default App;
