import Vuex from 'vuex'
import actions from './actions';
import mutations from './mutations';
import getters from './getters';


const store = new Vuex.Store({
    state: {
        host: 'https://jsonplaceholder.typicode.com',
        polls: [],
        loading: false
    },
    getters,
    mutations,
    actions
});

export default store;
