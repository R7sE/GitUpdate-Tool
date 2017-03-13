import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        // Socket: require('./modules/Socket').default,
        // Service: require('./modules/Service').default,
        Repository: require('./modules/Repository').default,
    },
    getters: require('./getters').default,
});
