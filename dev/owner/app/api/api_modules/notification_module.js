(function () {

    let notificationModule = function (config,response,responseType) {
        this.config   = config;
        this.successNotificationMsg =   (config.successNotificationMsg === undefined || config.successNotificationMsg === null || config.successNotificationMsg === "")?false:config.successNotificationMsg;
        this.errorNotificationMsg   =   (config.errorNotificationMsg === undefined || config.errorNotificationMsg === null || config.errorNotificationMsg === "" )?false:config.errorNotificationMsg;
        this.response = response;
        this.responseType = responseType;
    };

    notificationModule.prototype = {
        success : function () {
            let msg = (!this.successNotificationMsg)?this.config.responseMsgExtractor(this.response):this.successNotificationMsg;
            this.showNotification({notificationText : "success",notificationMessage : msg})
        },
        error : function () {
            let msg = (!this.errorNotificationMsg)?this.config.responseMsgExtractor(this.response):this.errorNotificationMsg;
            this.showNotification({notificationText : "error",notificationMessage : msg})
        },
        showNotification : function (msgObj) {
            this.config.notificationHandler(msgObj);
        }
    }

    module.exports = notificationModule;

})();