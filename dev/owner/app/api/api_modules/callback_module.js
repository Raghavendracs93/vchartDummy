(function () {

    let callbackModule = function (config,response,responseType) {
        this.config   = config;
        this.successCallback        =   (typeof config.successCallback !== "function")?function(){}:config.successCallback;
        this.errorCallback          =   (typeof config.errorCallback !== "function")?function(){}:config.errorCallback;
        this.response = response;
        this.responseType = responseType;
    };

    callbackModule.prototype = {
        success : function () {
            this.successCallback();
        },
        error : function () {
            this.errorCallback();
        }
    }

    module.exports = callbackModule;

})();