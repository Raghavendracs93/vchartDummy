(function(){

    const Vue = require("vue");
    const Vuex = require("vuex").default;

    Vue.use(Vuex);

    const ownerInfoStorage = new Vuex.Store({
        state: {
            ownerInfo : {},
            updatedOwnerInfo : {},
            appUrl : {},
        },
        mutations: {
            setOwnerInfo (state,data){
                state.ownerInfo = data;
            },
            setUpdatedOwnerInfo (state,data){
                state.updatedOwnerInfo = data;
            },
            setAppUrl (state,data){
                state.appUrl = data;
            },
            //    ------------------------------
            clearOwnerInfoStorage (state){
                for(const prop in state){
                    state[prop] = "";
                }
            }
        }
    });
    module.exports = ownerInfoStorage;
})();