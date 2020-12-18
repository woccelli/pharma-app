import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { updateAuthToken } from './authActions'

import {
    GET_ERRORS
} from "./types";


// Update user - get updated user token
export const updateUser = userData => dispatch => {
    axios
        .post("/api/users/update", userData)
        .then(res => {
            dispatch(updateAuthToken(res.data))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// add an address to the user's addresses list - get updated user token
export const addAddress = userData => dispatch => {
    axios
        .post("/api/users/add-address", userData)
        .then(res => {
            dispatch(updateAuthToken(res.data))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};



