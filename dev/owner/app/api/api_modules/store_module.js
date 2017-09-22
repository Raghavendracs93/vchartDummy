(function () {

    let storageModule = function (config,response,responseType) {
        this.config   = config;
        this.viewStorage   =   (config.viewStorage === undefined || config.viewStorage === null)?[]:config.viewStorage;
        this.storageFunctionName    =   (config.storageFunctionName === undefined || config.storageFunctionName === null)?{}:config.storageFunctionName;

        this.response = response;
        this.responseType = responseType;
    };

    storageModule.prototype = {
        success : function () {
            this.viewStorage.commit(this.storageFunctionName,this.response);
        },
        error : function () {
            this.viewStorage.commit(this.storageFunctionName,this.response);
        }
    }

    module.exports = storageModule;

})();