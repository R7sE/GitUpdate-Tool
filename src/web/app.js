import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
Vue.use(VueRouter);


let router = new VueRouter({
    routes: [
        {
            path: '/',
            component: require('./components/Home.vue'),
        },
        {
            path: '/repository',
            component: require('./components/Repository.vue'),
        }
    ]
});

new Vue({
    el: '#app',
    router,
    store,
    components: {
        'navbar-view': require('./components/Navbar.vue')
    }
});