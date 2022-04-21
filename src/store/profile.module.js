import { getSingleUserDataService } from '@/services/profile.service';
const initialState = { userData: Object };

export const profile = {
    namespaced: true,
    state: initialState,
    actions: {
        getSingleUserData({ commit }, userId) {
            return getSingleUserDataService(userId).then(
                data => {
                    commit('setDataOfUser', data);
                    return Promise.resolve(true);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        setDataOfUser(state, data) {
            state.userData = data;
        }
    }
};