(function(){

    let AppNotification= function(){};

    AppNotification.prototype = {

        getNotificationHandler : function () {
            return this.showNotification.bind(this);
        },

        showNotification : function (msgObj) {
            const appViewInstance = require("../../app/app_view_instance");
            let appView = appViewInstance.getAppViewInstance();
            appView.showNotification(msgObj);
        }

    };

    module.exports = function(){
        return (new AppNotification());
    }();

})();