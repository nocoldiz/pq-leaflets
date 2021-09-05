import { Dispatch } from "redux"
import axios, { AxiosResponse } from 'axios';
import { ActionType, ApiDispatchTypes } from "../types/actionTypes"
import { LeafletsRequest, LeafletsResponse, LeafletItem, Retailer } from "../types/dataTypes"
const baseUrl = "https://pq-leaflets.herokuapp.com"


export const fetchLeaflets = (req: LeafletsRequest, refresh: boolean) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  dispatch({
    type: ActionType.FETCH_LEAFLETS_PENDING,
    loading: true
  });


  axios.get(`${baseUrl}/api/leaflets/filter`, {
    params: {
      offset: req.offset,
      limit: req.limit,
      name: req.name,
      excludeExpired: req.excludeExpired,
      retailerId: req.retailerId,
      maxDistance: req.maxDistance,
      sort: req.sort
    }
  }).then((result: AxiosResponse<LeafletsResponse>) => {
    const responseData = result.data;
    const seen = new Set();

    if (responseData.data.error) {
      throw ("error");
    }
    //Crea un array di retailers
    let retailers: Array<Retailer> = [];

    responseData.data.leaflets.forEach(item => {
      retailers.push({ id: item.retailer.id, name: item.retailer.name });
    });

    retailers = retailers.filter(el => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });

    dispatch({
      type: ActionType.FETCH_LEAFLETS_SUCCESS,
      loading: false,
      refresh: refresh,
      retailers: retailers,
      payload: responseData
    });
  }).catch((error) => {
    console.error(error);
    dispatch({
      type: ActionType.FETCH_LEAFLETS_ERROR,
      loading: false,
      error: error
    });
  });
};



export const filterLeaflets = (leaflets: Array<LeafletItem>, filters: LeafletsRequest) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  // Nota: la richiesta API è case sensitive, per comodità rendo il filtro locale non case sensitive
  const nameFilter = filters.name.toUpperCase();
  const retailerIdFilter = filters.retailerId;
  const maxDistanceFilter = filters.maxDistance | 0;

  let filteredLeaflets = leaflets.filter(item => {
    return ((item.name.toUpperCase().indexOf(nameFilter) >= 0) || (item.retailer.name.toUpperCase().indexOf(nameFilter) >= 0))
  }).filter(item3 => {
    return (retailerIdFilter != "" ? item3.retailer.id === retailerIdFilter : true)
  }).filter(item4 => {
    return (maxDistanceFilter != 0 ? item4.retailer.distance <= maxDistanceFilter : true)
  }).slice(filters.offset, filters.limit);

  if (filters.excludeExpired == 1) {
    const today = new Date();
    console.log("filtering expired")
    filteredLeaflets = filteredLeaflets.filter(item => {
      let d = new Date(0);
      d.setUTCSeconds(item.expTimestamp);
      return d.getTime() > today.getTime()
    })
  }
  console.log(filteredLeaflets);
  console.log(filters);


  dispatch({
    type: ActionType.FILTER_LEAFLETS,
    filters: filters,
    payload: filteredLeaflets
  })
};


export const sortLeaflets = (leaflets: Array<LeafletItem>, sortBy: string, filters: LeafletsRequest) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  console.log("sorty by " + sortBy);
  let activeSort = filters.sort.split(',');

  switch (sortBy) {
    case "priority":
      activeSort[0] = "priority";
      break;
    case "-priority":
      activeSort[0] = "-priority";
      break;
    case "expTimestamp":
      activeSort[1] = "expTimestamp";
      break;
    case "-expTimestamp":
      activeSort[1] = "-expTimestamp";
      break;
    case "distance":
      activeSort[2] = "distance";
      break;
    case "-distance":
      activeSort[2] = "-distance";
      break;
    case "retailerName":
      activeSort[3] = "retailerName";
      break;
    case "-retailerName":
      activeSort[3] = "-retailerName";
      break;
    case "leafletName":
      activeSort[4] = "leafletName";
      break;
    case "-leafletName":
      activeSort[4] = "-leafletName";
      break;
  }

  console.log(activeSort);
  if (activeSort[0] === "priority") {
    leaflets.sort((a, b) => (a.retailer.priority < b.retailer.priority ? -1 : 1));
  }
  if (activeSort[0] === "-priority") {
    leaflets.sort((a, b) => (a.retailer.priority > b.retailer.priority ? -1 : 1));
  }
  if (activeSort[1] === "expTimestamp") {
    leaflets.sort((a, b) => (a.expTimestamp < b.expTimestamp ? -1 : 1));
  }
  if (activeSort[1] === "-expTimestamp") {
    leaflets.sort((a, b) => (a.expTimestamp > b.expTimestamp ? -1 : 1));
  }
  if (activeSort[2] === "distance") {
    leaflets.sort((a, b) => (a.retailer.distance < b.retailer.distance ? -1 : 1));
  }
  if (activeSort[2] === "-distance") {
    leaflets.sort((a, b) => (a.retailer.distance > b.retailer.distance ? -1 : 1));
  }
  if (activeSort[3] === "retailerName") {
    leaflets.sort((a, b) => (a.retailer.name < b.retailer.name ? -1 : 1));
  }
  if (activeSort[3] === "-retailerName") {
    leaflets.sort((a, b) => (a.retailer.name > b.retailer.name ? -1 : 1));
  }
  if (activeSort[4] === "leafletName") {
    leaflets.sort((a, b) => (a.name < b.name ? -1 : 1));
  }
  if (activeSort[4] === "-leafletName") {
    leaflets.sort((a, b) => (a.name > b.name ? -1 : 1));
  }
  //desc arrayOfObjects.sort((a, b) => (a.propertyToSortBy > b.propertyToSortBy ? -1 : 1));

  console.log(leaflets);


  dispatch({
    type: ActionType.SORT_LEAFLETS,
    filters: {
      ...filters, sort: activeSort.join(",")
    },
    payload: leaflets
  })
};
