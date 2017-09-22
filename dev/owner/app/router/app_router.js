(function(){


    const Vue = require("vue");
    const VueRouter = require("vue-router");
    const routes = require("./routes");
    const appState = require("../state_manager/app_state.js");
    Vue.use(VueRouter);

    const AppRouter = new VueRouter({
        routes: routes,
        mode: "hash"
    });

    AppRouter.beforeEach(function(to, from, next)  {
        /*console.log("before each");
        console.log(to);
        console.log(from);
        console.log(next);
        console.log(appState.state.appInState);*/
        // window.console.log('Transition', transition)
        if (appState.state.appInState !== true && to.path != "/report") {
            window.console.log("Not authenticated");
            next({
                path: "/report"
            });
        }else if (to.path === "/report"){
            appState.commit("appStateFalse");
            next();
        }else {
            console.log("authenticated");
            next();
        }
    });

    module.exports = AppRouter;
})();