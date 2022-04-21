import axios from "axios";
import {CREATE_USER_URL, DELETE_USER_URL, UPDATE_USER_URL, USERS_URL} from "@/utils/apiConstants";

export function getUsersDataService(pageNumber) {
    return axios
        .get(USERS_URL+pageNumber)
        .then(response => {
            if (response) {
                return response.data;
            }
        })
}

export function updateUserDataService(userId) {
    return axios
        .put(UPDATE_USER_URL+userId)
        .then(response => {
            if (response) {
                return response.data
            }
        })
}

export function deleteUserService(userId) {
    return axios
        .delete(DELETE_USER_URL+userId)
        .then(response => {
            if (response) {
                return response.data
            }
        })
}

export function createUserService(newUserInfo) {
    return axios
        .post(CREATE_USER_URL, newUserInfo)
        .then(response => {
            if (response) {
                return response.data
            }
        })
}