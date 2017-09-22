(function () {

    let callbackModule = require("./api_modules/callback_module");
    let navigationModule = require("./api_modules/navigation_module");
    let notificationModule = require("./api_modules/notification_module");
    let stateManagementModule = require("./api_modules/state_management_module");
    let storageModule = require("./api_modules/store_module");

    let responseHandler = function (config) {
        this.config   = config;
        this.appVue    = config.appVue;

        this.apiUrlObj = config.apiUrlObj;

        this.method    = config.method;
        this.apiUrl    = this.apiUrlObj[config.apiUrl];
        this.data      = config.data;
        this.options   = config.options;

        this.successExecutionList = this.getExecutionList("success");
        this.errorExecutionList = this.getExecutionList("error");
    }

    responseHandler.prototype = {
        execute : function () {
            this[this.method]();
        },
        post : function () {
            this.appVue.http.post(this.apiUrl, this.data, this.options).then(response => {

                for(let i =0;i<this.successExecutionList.length;i++){
                    this[this.successExecutionList[i]](response.body,"success");
                }
            }, response => {

                for(let i =0;i<this.errorExecutionList.length;i++){
                    this[this.errorExecutionList[i]](response.body,"error");
                }
            });
        },
        get : function () {
            this.appVue.http.get(this.apiUrl, this.options).then(response => {

                for(let i =0;i<this.successExecutionList.length;i++){
                    this[this.successExecutionList[i]](response.body,"success");
                }
            }, response => {
                for(let i =0;i<this.errorExecutionList.length;i++){
                    this[this.errorExecutionList[i]](response.body,"error");
                }
            });
        },

        storage : function (response,responseType) {
            let storage = new storageModule(this.config,response,responseType);
            storage[responseType]();
        },
        stateManagement : function (response,responseType) {
            let stateManagement = new stateManagementModule(this.config,response,responseType);
            stateManagement[responseType]();
        },
        notification : function (response,responseType) {
            let notification = new notificationModule(this.config,response,responseType);
            notification[responseType]();
        },
        navigation : function (response,responseType) {
            let navigation = new navigationModule(this.config,response,responseType);
            navigation[responseType]();
        },
        callback : function (response,responseType) {
            let callback = new callbackModule(this.config,response,responseType);
            callback[responseType]();
        },

        getExecutionList : function (state) {
            let list = [];
            (this.config[state+"ExecutionList"].store)?list.push("storage"):"";
            (this.config[state+"ExecutionList"].change_state)?list.push("stateManagement"):"";
            (this.config[state+"ExecutionList"].navigation)?list.push("notification"):"";
            (this.config[state+"ExecutionList"].callback)?list.push("navigation"):"";
            (this.config[state+"ExecutionList"].notification)?list.push("callback"):"";
            return list;
        }
    }

    module.exports = responseHandler;

})();