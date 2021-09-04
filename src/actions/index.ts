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
    console.log(responseData);
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



export const filterLeafletsByName = (leaflets: Array<LeafletItem>, name: string) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  // Nota: la richiesta API è case sensitive, per comodità rendo il filtro locale non case sensitive
  dispatch({
    type: ActionType.FILTER_LEAFLETS_BY_NAME,
    name: name,
    payload:
      name === ""
        ? leaflets
        : leaflets.filter(
          (x) => x.name.indexOf(name.toUpperCase()) >= 0
        ),
  })
};

export const filterLeafletsByExpired = (leaflets: Array<LeafletItem>, excludeExpired: boolean) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  const today = new Date();
  let filteredLeaflets = leaflets;
  if (excludeExpired) {
    filteredLeaflets = leaflets.filter((items) => {
      let d = new Date(0);
      d.setUTCSeconds(items.expTimestamp);
      return d.getTime() > today.getTime();
    })
  }
  console.log(filteredLeaflets);

  dispatch({
    type: ActionType.FILTER_LEAFLETS_BY_EXPIRED,
    excludeExpired: excludeExpired,
    payload: filteredLeaflets
  })
};