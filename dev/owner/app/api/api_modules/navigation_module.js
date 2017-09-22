(function () {

    let navigationModule = function (config,response,responseType) {
        this.config   = config;
        this.successNavigateTo      =   (config.successNavigateTo === undefined || config.successNavigateTo === null)?"login":config.successNavigateTo;
        this.errorNavigateTo        =   (config.errorNavigateTo === undefined || config.errorNavigateTo === null)?"login":config.errorNavigateTo;
        this.response = response;
        this.responseType = responseType;
    };

    navigationModule.prototype = {
        success : function () {
            this.config.appVue.$router("/"+this.successNavigateTo);
        },
        error : function () {
            this.config.appVue.$router("/"+this.errorNavigateTo);
        }
    }

    module.exports = navigationModule;

})();