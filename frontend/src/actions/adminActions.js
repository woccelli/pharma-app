import axios from "axios";
import { clearErrors } from "./utilActions"
import {
    SET_USERS,
    GET_ERRORS,
    GET_SUCCESS,
    GET_USER_LOGS,
    CLEAR_USER_LOGS
} from "./types";


export const setUsers = data => {
    return {
        type: SET_USERS,
        payload: data
    };
};

// Get DB users
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/all")
        .then(res => {
            // Dispatch returned users in store
            dispatch(setUsers(res.data))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add a new sheet to the sheets DB
export const addSheet = (sheetData, history) => dispatch => {
    axios
        .post("/api/sheets/add", sheetData)
        .then(res => {
            history.push('/admin/sheets')
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedSheet: true }
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/add", userData)
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: GET_SUCCESS,
                payload: { addedUser: true }
            })
            history.push("/admin/users")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}


export const getUserLogs = user => dispatch => {
    axios  
        .get('/api/users/logs',  {params: {userId: user._id}})
        .then(res => {
            const data = { userId:user._id, userlogs: res.data }
            dispatch({
            type: GET_USER_LOGS,
            payload: data
        })})
        .catch(err =>
           console.log(err)
        );
}

export const clearUserLogs = () => {
    return {
      type: CLEAR_USER_LOGS,
      payload: {}
    };
};