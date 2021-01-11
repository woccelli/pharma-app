import axios from "axios";
import { updateAuthToken } from './authActions'
import { clearErrors } from './utilActions'

import {
    GET_ERRORS,
    GET_SUCCESS
} from "./types";


// Update user name - get updated user token
export const updateName = (data, history) => dispatch => {
    axios
        .post("/api/users/update-name", data)
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
export const updateEmail = (data, history) => dispatch => {
    axios
        .post("/api/users/update-email", data)
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

// Update user address - get updated user token
export const updateAddress = (data, history) => dispatch => {
    axios
        .post("/api/users/update-address", data)
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
export const addAddress = (data, history) => dispatch => {
    axios
        .post("/api/users/add-address", data)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedUser: true}
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

export const deleteAddress = data => dispatch => {
    axios
        .post("/api/users/delete-address", data)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedUser: true}
            })
            dispatch(updateAuthToken(res.data))
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
}

export const updatePwd = (data, history) => dispatch => {
    axios.post("/api/users/update-password", data)
    .then(res => {
        dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { updatedUser: true}
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
    });
}

