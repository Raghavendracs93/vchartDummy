(function () {

    let stateManagementModule = function (config,response,responseType) {
        this.config   = config;
        this.response = response;
        this.responseType = responseType;
    };

    stateManagementModule.prototype = {
        success : function () {
            this.config.appState.commit("setAppState",this.successState);
        },
        error : function () {
            this.config.appState.commit("setAppState",this.errorState);
        }
    }

    module.exports = stateManagementModule;

})();