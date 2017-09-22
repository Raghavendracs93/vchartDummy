(function(){

    const Vue = require("vue");
    const Vuex = require("vuex").default;

    Vue.use(Vuex);

    const loginStore = new Vuex.Store({
        state: {
            count : 0
        },
        mutations: {
            increment (state, cData){
                state.count = cData+5;
            }
        }
    });

    module.exports = loginStore;
})();

