export const BASE_URL = 'https://reqres.in/api/';
export const LOGIN_URL = `${BASE_URL}login`; // post
export const USERS_URL = `${BASE_URL}users?page=`; // get
export const SINGLE_USER_URL = `${BASE_URL}users/`; // get (+ {id})
export const CREATE_USER_URL = `${BASE_URL}users`; // post
export const UPDATE_USER_URL = `${BASE_URL}users/`; // put (+ {id})
export const DELETE_USER_URL = `${BASE_URL}users/`; // delete (+ {id})