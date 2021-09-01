import { Dispatch } from "redux"
import axios, { AxiosResponse } from 'axios';
import { ActionType, LeafletsDispatchTypes } from "../types/actionTypes"
import { Request, Response} from "../types/dataTypes"
const baseUrl = "https://pq-leaflets.herokuapp.com"

export const fetchLeaflets = (req: Request) => async (dispatch: Dispatch<LeafletsDispatchTypes>) => {
    try {
      dispatch({
        type: ActionType.FETCH_LEAFLETS_PENDING,
        loading:true
      })
  
      let result: AxiosResponse = await axios.get(`${baseUrl}/api/leaflets/filter`, {
        params: {
            offset: req.offset,
            limit: req.limit,
            name: req.name,
            retailerId: req.retailerId,
            maxDistance: req.maxDistance,
            sort: req.sort
        }
    });

    let data: Response = result.data;
  
      dispatch({
        type: ActionType.FETCH_LEAFLETS_SUCCESS,
        payload: data,
        loading: false
      })
  
    } catch(e) {
      dispatch({
        type: ActionType.FETCH_LEAFLETS_ERROR,
        loading: false,
        error: e
      })
    }
  };