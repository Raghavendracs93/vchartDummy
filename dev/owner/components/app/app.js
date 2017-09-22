(function(){


    let headerComponent = require("../header/header_view.vue");
    //let sidebarComponent = require("../sidebar/sidebar_view.vue");
    const appViewInstance = require("../../app/app_view_instance");

    const appComp = {
        name:"AppView",
        data: function(){
            return {
                msg : "Hello there",
                closeBtColor : "green--text",
                message: "",
                timeout: 3000,
                top: true,
                right: true,
                snackbar: false
            };
        },
        created : function () {
            console.log("App Component created");
        },
        mounted : function () {
            appViewInstance.initAppViewInstance(this);
        },
        components : {
            headerComponent
        },
        methods: {
            showNotification : function (msgObj) {
                if(msgObj.notificationText === "success"){
                    this.closeBtColor = "green--text";
                }else {
                    this.closeBtColor = "pink--text";
                }
                this.message = msgObj.notificationMessage;
                this.snackbar = true;
            }
        }
    };

    module.exports = appComp;


})();

