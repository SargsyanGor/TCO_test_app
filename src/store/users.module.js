import { getUsersDataService } from '@/services/users.service';
const initialState = { usersData: [] };

export const users = {
    namespaced: true,
    state: initialState,
    actions: {
        getUsersData({ commit }) {
            return getUsersDataService().then(
                data => {
                    commit('setDataOfUsers', data);
                    return Promise.resolve(true);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setDataOfUsers(state, data) {
            state.usersData = data;
        },
    }
};