import axios from "axios";
import { updateAuthToken } from './authActions'
import { clearErrors } from './utilActions'

import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";


// Update user - get updated user token
export const updateUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/update", userData)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedUser: true}
            })
            dispatch(updateAuthToken(res.data))
            history.push("/account")
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
        
};

// Update user - get updated user token
export const updateEmail = (userData, history) => dispatch => {
    axios
        .post("/api/users/update-email", userData)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedUser: true}
            })
            dispatch(updateAuthToken(res.data))
            history.push("/account")
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// add an address to the user's addresses list - get updated user token
export const addAddress = (userData,history) => dispatch => {
    axios
        .post("/api/users/add-address", userData)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedAddress: true}
            })
            dispatch(updateAuthToken(res.data))
            history.push("/account")
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

export const deleteAddress = address => dispatch => {
    axios
        .post("/api/users/delete-address", address)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { deletedAddress: true}
            })
            dispatch(updateAuthToken(res.data))
            
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
}



