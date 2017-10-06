(function () {

    module.exports = {

        method                  : "post",
        apiUrl                  : "guard_log",
        data                    : {
            "userId": "string",
            "fromDateQuery": "string",
            "toDateQuery": "string"
        },
        options                 : { "headers"    : { "content-type" : "application/json" } },


        successExecutionList    : {
            change_state : false,
            navigation   : false,
            callback     : true,
            notification : false,
            store        : true

        },
        errorExecutionList      : {
            change_state : false,
            navigation   : false,
            callback     : true,
            notification : true,
            store        : false
        },

        successNavigateTo       : "",
        errorNavigateTo         : "",

        successCallback         : function(){},
        errorCallback           : function(){},

        successNotificationMsg  : "",
        errorNotificationMsg    : "",

        storageReferenceName    : "guard_storage",
        storageFunctionName     : "setGuardLog",

        stateName               : "appState",
        successState            : true,
        errorState              : true,

    }

})();