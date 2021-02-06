import Vue from 'vue';
import VueRouter from 'vue-router';
import Polls from '../components/Polls';
import SinglePoll from '../components/SinglePoll';

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { path: '/poll/:email', component: SinglePoll },
        { path: '/', component: Polls },
        { path: '/poll', component: Polls },
        { path: '/newpoll', component: SinglePoll },
    ]
})

export default router;
