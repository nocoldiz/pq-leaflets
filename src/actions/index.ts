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

  console.log(req);

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

    console.log(retailers);

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
  const nameFilter = filters.name.toLowerCase();
  const maxDistanceFilter = filters.maxDistance;
  const retailerIdFilter = filters.retailerId;
  console.log(retailerIdFilter);

  let filteredLeaflets = leaflets.filter(item => {

    return (
      item.name.toLowerCase().indexOf(nameFilter) >= 0 ||
      item.retailer.name.toLowerCase().indexOf(nameFilter) >= 0 ||
      item.retailer.distance <= maxDistanceFilter ||
      item.retailer.id == retailerIdFilter
    )
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
