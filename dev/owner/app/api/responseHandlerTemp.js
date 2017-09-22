(function () {

    let Vue = require("vue");
    const VueResource = require("vue-resource");
    Vue.use(VueResource);

    let responseHandler = function (config) {
        this.appVue   =   (config.appVue === undefined || config.appVue === null)?[]:config.appVue;

        this.apiUrlObj   =   (config.apiUrlObj === undefined || config.apiUrlObj === null)?[]:config.apiUrlObj;

        this.responseMsgExtractor   =   (config.responseMsgExtractor === undefined || config.responseMsgExtractor === null)?[]:config.responseMsgExtractor;

        this.notificationHandler   =   (config.notificationHandler === undefined || config.notificationHandler === null)?[]:config.notificationHandler;

        this.appState   =   (config.appState === undefined || config.appState === null)?[]:config.appState;

        this.viewStorage   =   (config.viewStorage === undefined || config.viewStorage === null)?[]:config.viewStorage;
        this.storageFunctionName    =   (config.storageFunctionName === undefined || config.storageFunctionName === null)?{}:config.storageFunctionName;

        this.successExecutionList   =   (config.successExecutionList === undefined || config.successExecutionList === null)?[]:config.successExecutionList;
        this.errorExecutionList     =   (config.errorExecutionList === undefined || config.errorExecutionList === null)?[]:config.errorExecutionList;

        this.successNavigateTo      =   (config.successNavigateTo === undefined || config.successNavigateTo === null)?"login":config.successNavigateTo;
        this.errorNavigateTo        =   (config.errorNavigateTo === undefined || config.errorNavigateTo === null)?"login":config.errorNavigateTo;

        this.successCallback        =   (typeof config.successCallback !== "function")?this.doNothing:config.successCallback;
        this.errorCallback          =   (typeof config.errorCallback !== "function")?this.doNothing:config.errorCallback;

        this.method                 =   (config.method === undefined || config.method === null)?"get":config.method;
        this.apiUrl                 =   (config.apiUrl === undefined || config.apiUrl === null)?"":this.apiUrlObj[config.apiUrl];
        this.data                   =   (config.data === undefined || config.data === null)?{}:config.data;
        this.options                =   (config.options === undefined || config.options === null)?{}:config.options;

        this.successNotificationMsg =   (config.successNotificationMsg === undefined || config.successNotificationMsg === null || config.successNotificationMsg === "")?false:config.successNotificationMsg;
        this.errorNotificationMsg   =   (config.errorNotificationMsg === undefined || config.errorNotificationMsg === null || config.errorNotificationMsg === "" )?false:config.errorNotificationMsg;

        this.stateName   =   (config.stateName === undefined || config.stateName === null)?false:config.stateName;
        this.successState   =   (config.successState === undefined || config.successState === null)?false:config.successState;
        this.errorState   =   (config.errorState === undefined || config.errorState === null)?false:config.errorState;

        this.successExecutionFinalList = this.getExecutionList("success");
        this.errorExecutionFinalList = this.getExecutionList("error");
    }

    responseHandler.prototype = {
        execute : function () {
            this[this.method]();
        },
        post : function () {
            this.appVue.$http.post(this.apiUrl, this.data, this.options).then(response => {

                for(let i =0;i<this.successExecutionFinalList.length;i++){
                    this[this.successExecutionFinalList[i]](response.body);
                }
            }, response => {

                for(let i =0;i<this.errorExecutionFinalList.length;i++){
                    this[this.errorExecutionFinalList[i]](response.body);
                }
            });
        },
        get : function () {
            this.appVue.$http.get(this.apiUrl, this.options).then(response => {

                for(let i =0;i<this.successExecutionFinalList.length;i++){
                    this[this.successExecutionFinalList[i]](response.body);
                }
            }, response => {
                for(let i =0;i<this.errorExecutionFinalList.length;i++){
                    this[this.errorExecutionFinalList[i]](response.body);
                }
            });
        },

        getBase64StringBlob : function (image,callback) {
            let ext = "";

            switch (image.type){
                case "image/jpeg" : ext = "jpg";
                    break;
                case "image/jpg" : ext = "jpg";
                    break;
                case "image/png" : ext = "png";
                    break;
                case "image/gif" : ext = "gif";
                    break;
                case "image/tif" : ext = "tif";
                    break;
                default :
                    break;
            }
            if(window.hasWebP){
                ext = "webp";
            }
            let url = "image/"+image.imageId+"/"+ext;

            let img = new Image();
            img.onload = function () {
                let canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                let ctx = canvas.getContext('2d');
                ctx.drawImage(this, 0, 0);
                let dataURL = canvas.toDataURL(image.type);
                callback({
                    base64String: dataURL.replace(/data.*base64,/, ''),
                    type: image.type,
                    name: "name",
                    size: dataURL.length
                });
            };
            img.src = url;

            /*Vue.http.get(url).then(response => {
             return response.blob();
             }).then(blob => {
             callback(blob);
             });*/
        },

        showNotification : function (msgObj) {
            this.notificationHandler(msgObj);
        },

        doNothing : function () {

        },

        navigate : function (navigateTo) {
            this.appVue.$router.push("/"+navigateTo);
        },

        // Success executions
        successNotification : function (response) {
            let msg = (!this.successNotificationMsg)?this.responseMsgExtractor(response):this.successNotificationMsg;
            this.showNotification({notificationText : "success",notificationMessage : msg})
        },

        successNavigate : function () {
            this.navigate(this.successNavigateTo);
        },
        successCallbackFunc : function () {
            this.successCallback();
        },
        successStoreData : function (response) {
            this.viewStorage.commit(this.storageFunctionName,response.responseData.response)
        },
        successClearData : function () {

        },
        successChangeState : function () {
            this.appState.commit("setAppState",this.successState);
        },



        // Error executions
        errorNotification : function (response) {
            let msg = (!this.errorNotificationMsg)?this.responseMsgExtractor(response):this.errorNotificationMsg;
            this.showNotification({notificationText : "error",notificationMessage : msg})
        },
        errorNavigate : function () {
            this.navigate(this.errorNavigateTo);
        },
        errorCallbackFunc : function () {
            this.errorCallback();
        },
        errorStoreData : function (response) {
            this.viewStorage.commit(this.storageFunctionName,response)
        },
        errorClearData : function () {

        },
        errorChangeState : function () {
            this.appState.commit("setAppState",this.errorState);
        },

        getExecutionList : function (state) {
            let list = [];
            (this[state+"ExecutionList"].store)?list.push(state+"StoreData"):"";
            (this[state+"ExecutionList"].change_state)?list.push(state+"ChangeState"):"";
            (this[state+"ExecutionList"].navigation)?list.push(state+"Navigate"):"";
            (this[state+"ExecutionList"].callback)?list.push(state+"CallbackFunc"):"";
            (this[state+"ExecutionList"].notification)?list.push(state+"Notification"):"";
            return list;
        }
    }

    module.exports = responseHandler;

})();