import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
    render: h => h(App),
    vuetify,
    store,
    router
}).$mount('#app')
