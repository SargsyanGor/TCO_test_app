import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import { users } from './users.module';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        users
    }
});