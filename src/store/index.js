import Vuex from 'vuex';
import Vue from 'vue';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        host: 'https://jsonplaceholder.typicode.com',
        polls: [ {
                firstname: "Korzh",
                lastname: "Bogdan",
                likesKittens: true,
                birthdate: "2000-07-25",
                catPicture: null,
                email: "test@abc.ru",
                password: "mypassword"
            }, {
                firstname: "Normal",
                lastname: "Guy",
                likesKittens: true,
                birthdate: "1995-11-21",
                catPicture: null,
                email: "normal.guy@mail.com",
                password: "password"
            }, {
                firstname: "Аноним",
                lastname: "Анонимович",
                likesKittens: false,
                birthdate: "1900-1-1",
                catPicture: null,
                email: "another@person.qq",
                password: "revesksnayrb"
            },
        ],
        loading: false
    },
    getters,
    mutations,
    actions
});

export default store;
