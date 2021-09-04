import { Dispatch } from "redux"
import axios, { AxiosResponse } from 'axios';
import { ActionType, ApiDispatchTypes } from "../types/actionTypes"
import { LeafletsRequest, LeafletsResponse, LeafletItem } from "../types/dataTypes"
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
    if (responseData.data.error) {
      throw ("error");
    }
    dispatch({
      type: ActionType.FETCH_LEAFLETS_SUCCESS,
      loading: false,
      refresh: refresh,
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

  const today = new Date();
  const filteredLeaflets = leaflets.filter(item => {
    let d = new Date(0);
    if (filters.excludeExpired) {
      d.setUTCSeconds(item.expTimestamp);
      console.log(today)
      //||         d.getTime() > today.getTime()

    }
    return (
      item.name.toLowerCase().indexOf(nameFilter) >= 0 ||
      item.retailer.name.toLowerCase().indexOf(nameFilter) >= 0 ||
      item.retailer.distance <= maxDistanceFilter
    )
  }).slice(filters.offset, filters.limit);
  console.log(filteredLeaflets);
  console.log(filters);


  dispatch({
    type: ActionType.FILTER_LEAFLETS,
    filters: filters,
    payload: filteredLeaflets
  })
};
