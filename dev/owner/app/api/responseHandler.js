(function () {
    let Vue = require("vue");
    const VueResource = require("vue-resource");
    const apiUrl = require("../api/api_url");
    const responseMsgExtractor = require("../api/response_msg_extractor");
    const state = require("../state_manager/app_state");
    Vue.use(VueResource);

    let responseHandler = function (config) {
        this.successExecutionList   =   (config.successExecutionList === undefined || config.successExecutionList === null)?[]:config.successExecutionList;
        this.errorExecutionList     =   (config.errorExecutionList === undefined || config.errorExecutionList === null)?[]:config.errorExecutionList;

        this.successNavigateTo      =   (config.successNavigateTo === undefined || config.successNavigateTo === null)?"login":config.successNavigateTo;
        this.errorNavigateTo        =   (config.errorNavigateTo === undefined || config.errorNavigateTo === null)?"login":config.errorNavigateTo;

        this.successCallback        =   (typeof config.successCallback !== "function")?this.doNothing:config.successCallback;
        this.errorCallback          =   (typeof config.errorCallback !== "function")?this.doNothing:config.errorCallback;

        this.method                 =   (config.method === undefined || config.method === null)?"get":config.method;
        this.apiUrl                 =   (config.apiUrl === undefined || config.apiUrl === null)?"":apiUrl[config.apiUrl];
        this.data                   =   (config.data === undefined || config.data === null)?{}:config.data;
        this.options                =   (config.options === undefined || config.options === null)?{}:config.options;

        this.storageReferenceName   =   (config.storageReferenceName === undefined || config.storageReferenceName === null)?{}:config.storageReferenceName;
        this.storageFunctionName    =   (config.storageFunctionName === undefined || config.storageFunctionName === null)?{}:config.storageFunctionName;

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
            Vue.http.post(this.apiUrl, this.data, this.options).then(response => {

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
            Vue.http.get(this.apiUrl, this.options).then(response => {

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

        showNotification : function (r,msg) {
            const appVue = require("../app_start");
            //appVue.$root.$refs.toastr[r](msg);
        },

        doNothing : function () {

        },

        navigate : function (navigateTo) {
            let router = require("../router/app_router");
            router.push("/"+navigateTo);
        },

        // Success executions
        successNotification : function (response) {
            let msg = (!this.successNotificationMsg)?responseMsgExtractor(response):this.successNotificationMsg;
            this.showNotification("s",msg)
        },

        successNavigate : function () {
            this.navigate(this.successNavigateTo);
        },
        successCallbackFunc : function () {
            this.successCallback();
        },
        successStoreData : function (response) {
            let store = require("../storage_manager/"+this.storageReferenceName);
            store.commit(this.storageFunctionName,response.responseData.response);
        },
        successClearData : function () {

        },
        successChangeState : function () {
            state.commit("setAppState",this.successState);
        },



        // Error executions
        errorNotification : function (response) {
            let msg = (!this.errorNotificationMsg)?responseMsgExtractor(response):this.errorNotificationMsg;
            this.showNotification("e",msg);
        },
        errorNavigate : function () {
            this.navigate(this.errorNavigateTo);
        },
        errorCallbackFunc : function () {
            this.errorCallback();
        },
        errorStoreData : function (response) {
            let store = require("../storage_manager/"+this.storageReferenceName);
            store.commit(this.storageFunctionName,response)
        },
        errorClearData : function () {

        },
        errorChangeState : function () {
            state.commit("setAppState",this.errorState);
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