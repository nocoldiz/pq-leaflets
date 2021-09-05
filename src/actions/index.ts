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
  let nameFilter = filters.name.toUpperCase();
  let retailerIdFilter = filters.retailerId;
  let maxDistanceFilter = filters.maxDistance | 0;
  // Impedisce ad offset e limit di andare sotto 0
  if (filters.offset <= 0) { filters.offset = 0 }
  if (filters.limit <= 0) { filters.limit = 0 }


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
  let activeSort: string = filters.sort;
  switch (sortBy) {
    case "priority":
      activeSort = "priority";
      leaflets.sort((a, b) => (a.retailer.priority - b.retailer.priority));
      break;
    case "-priority":
      activeSort = "-priority";
      leaflets.sort((a, b) => (b.retailer.priority - a.retailer.priority));
      break;
    case "expTimestamp":
      activeSort = "expTimestamp";
      leaflets.sort((a, b) => (a.expTimestamp - b.expTimestamp));
      break;
    case "-expTimestamp":
      activeSort = "-expTimestamp";
      leaflets.sort((a, b) => (b.expTimestamp - a.expTimestamp));
      break;
    case "distance":
      activeSort = "distance";
      leaflets.sort((a, b) => (a.retailer.distance - b.retailer.distance));
      break;
    case "-distance":
      activeSort = "-distance";
      leaflets.sort((a, b) => (b.retailer.distance - a.retailer.distance));
      break;
    case "retailerName":
      activeSort = "retailerName";
      leaflets.sort((a, b) => (a.retailer.name < b.retailer.name ? -1 : 1));
      break;
    case "-retailerName":
      activeSort = "-retailerName";
      leaflets.sort((a, b) => (a.retailer.name > b.retailer.name ? -1 : 1));
      break;
    case "leafletName":
      activeSort = "leafletName";
      leaflets.sort((a, b) => (a.name < b.name ? -1 : 1));
      break;
    case "-leafletName":
      activeSort = "-leafletName";
      leaflets.sort((a, b) => (a.name > b.name ? -1 : 1));
      break;
    default:
      break;
  }
  console.log(activeSort);


  dispatch({
    type: ActionType.SORT_LEAFLETS,
    filters: {
      ...filters, sort: activeSort
    },
    payload: leaflets
  })
};
