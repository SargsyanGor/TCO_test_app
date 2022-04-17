import axios from "axios";
import { USERS_URL} from "@/utils/apiConstants";

export function getUsersDataService() {
    return axios
        .get(USERS_URL)
        .then(response => {
            if (response) {
                return response.data;
            }
        })
}