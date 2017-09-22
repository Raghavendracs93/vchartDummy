(function(){

    const Vue = require("vue");
    const Vuex = require("vuex").default;

    Vue.use(Vuex);

    const ownerStorage = new Vuex.Store({
        state: {
            guardList:[],
            guardDetail:[],
            guardInfo : {},
            guardLog : {}
        },
        mutations: {
            setGuardList (state,data){
                data.forEach(function (obj) {
                    obj.value = false;
                })
                state.guardList = data;
            },

            setGuardDetail (state,data){
                state.guardDetail = data;
            },
            setGuardInfo (state,data){
                state.guardInfo = data;
            },
            setGuardLog (state,data){
                state.guardLog = data;
            },
            //    ------------------------------
            clearGuardStorage (state){
                for(const prop in state){
                    state[prop] = "";
                }
            }
        }
    });
    module.exports = ownerStorage;
})();