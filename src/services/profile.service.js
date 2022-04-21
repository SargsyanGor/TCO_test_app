import axios from "axios";
import { SINGLE_USER_URL } from "@/utils/apiConstants";

export function getSingleUserDataService(userId) {
    return axios
        .get(SINGLE_USER_URL+userId)
        .then(response => {
            if (response) {
                return response.data;
            }
        })
}