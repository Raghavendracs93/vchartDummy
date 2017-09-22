(function () {

    let appVueInstance = require("../app_vue_instance");
    let apiUrlObj = require("./api_url");
    let responseMsgExtractor = require("./response_msg_extractor");
    let appState = require("../state_manager/app_state");
    let notification = require("../notification/notification");
    let responseHandler = require("./responseHandlerTemp");

    let responseManager = function  () {};

    responseManager.prototype = {
        execute : function (config) {
            config.appVue = appVueInstance.VueObj;
            config.apiUrlObj = apiUrlObj;
            config.responseMsgExtractor = responseMsgExtractor;
            config.notificationHandler = notification.getNotificationHandler();
            config.appState = appState;
            config.viewStorage = require("../../app/storage_manager/"+config.storageReferenceName);
            let handler = new responseHandler(config);
            handler.execute();
        }
    };

    module.exports = responseManager;

})();