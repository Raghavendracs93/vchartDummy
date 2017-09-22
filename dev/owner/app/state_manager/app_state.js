(function(){

    const Vue = require("vue");
    const Vuex = require("vuex").default;
    Vue.use(Vuex);

    const state = {
        appInState      : true,
        appInSession    : false,
        sidebarState : true
    };
    const mutations = {
        setAppState(state,data){
            state.appInState = data;
        },
        setSidebarState(state,data){
            state.sidebarState = data;
        },
        appStateTrue(state){
            state.appInState = true;
        },
        appStateFalse (state){
            state.appInState = false;
        },
        appSessionTrue (state){
            state.appInSession = true;
        },
        appSessionFalse (state){
            state.appInSession = false;
        }
    };
    module.exports = new Vuex.Store({
        state,
        mutations
    });
})();

