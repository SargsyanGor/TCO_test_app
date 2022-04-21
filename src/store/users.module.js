import {
    createUserService,
    deleteUserService,
    getUsersDataService,
    updateUserDataService
} from '@/services/users.service';
const initialState = { usersData: [] };

export const users = {
    namespaced: true,
    state: initialState,
    actions: {
        getUsersData({ commit }, pageNumber) {
            return getUsersDataService(pageNumber).then(
                data => {
                    commit('setDataOfUsers', data);
                    return Promise.resolve(true);
                },
                error => {
                    return Promise.reject(error);
                }
            );
        },
        updateUserData(_, userId) {
            return updateUserDataService(userId).then(
                data => {
                    console.log(data)
                    return Promise.resolve(true)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        deleteUser(_, userId) {
            console.log(userId)
            return deleteUserService(userId).then(
                () => {
                    return Promise.resolve(true)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        },
        createUser(_, newUserInfo) {
            return createUserService(newUserInfo).then(
                (data) => {
                    console.log(data)
                    return Promise.resolve(true)
                },
                error => {
                    return Promise.reject(error)
                }
            )
        }
    },
    mutations: {
        setDataOfUsers(state, data) {
            state.usersData = data;
        },
    }
};