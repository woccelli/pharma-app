import axios from "axios";

import {
    GET_USERS,
    GET_ERRORS
} from "./types";

// Set logged in user
export const setUsers = data => {
    return {
        type: GET_USERS,
        payload: data
    };
};

// Get DB users
export const getUsers = () => dispatch => {
    axios
        .get("/api/users/all")
        .then(res => {
            dispatch(setUsers(res.data))
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const addSheet = (sheetData, history) => dispatch => {
    console.log('addSheet called')
    axios
        .post("/api/sheets/add", sheetData)
        .then(res => history.push('/admin/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};