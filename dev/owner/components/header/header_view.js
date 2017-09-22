(function(){


    let stateManagement = require("../../app/state_manager/app_state");
    const headerComp = {
        name:"headerView",
        data: function(){
            return {
                viewName : "HeaderView",
                sidebar : true,
                apkFile : '',
                appState : stateManagement,
            };
        },
        created : function () {
        },
        methods: {
            setSidebarState : function () {
                this.appState.commit("setSidebarState",!this.appState.state.sidebarState);
            }
        }
    };
    module.exports = headerComp;
})();

