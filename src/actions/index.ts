import { Dispatch } from "redux"
import axios from 'axios';
import { ActionType, ApiDispatchTypes } from "../types/actionTypes"
import { ApiRequest } from "../types/dataTypes"
const baseUrl = "https://pq-leaflets.herokuapp.com"


export const fetchLeaflets = (req: ApiRequest) => (dispatch: Dispatch<ApiDispatchTypes>) => {
  dispatch({
    type: ActionType.FETCH_LEAFLETS_PENDING,
    loading: true
  })

  axios.get(`${baseUrl}/api/leaflets/filter`, {
    params: {
      offset: req.offset,
      limit: req.limit,
      name: req.name,
      retailerId: req.retailerId,
      maxDistance: req.maxDistance,
      sort: req.sort
    }
  }).then((result) => {
    console.log(result)
    dispatch({
      type: ActionType.FETCH_LEAFLETS_SUCCESS,
      loading: false,
      payload: result.data.data
    })
  }).catch((error) => {
    console.error(error);
  });


};


/*
export const fetchLeaflets = (req: ApiRequest) => async (dispatch: Dispatch<ApiDispatchTypes>) => {


  try {
    dispatch({
      type: ActionType.FETCH_LEAFLETS_PENDING,
      loading: true
    })




    const result: AxiosResponse<Response> = await axios.get(`${baseUrl}/api/leaflets/filter`, {
      params: {
        offset: req.offset,
        limit: req.limit,
        name: req.name,
        retailerId: req.retailerId,
        maxDistance: req.maxDistance,
        sort: req.sort
      }
    });
    console.log(result);

    let data: Response = result.data;

    console.log("fetching from api", data.leaflets);

    dispatch({
      type: ActionType.FETCH_LEAFLETS_SUCCESS,
      payload: data,
      loading: false
    })
      * /

  } catch (e) {
    dispatch({
      type: ActionType.FETCH_LEAFLETS_ERROR,
      loading: false,
      error: "errore generico"
    })
  }
};

*/