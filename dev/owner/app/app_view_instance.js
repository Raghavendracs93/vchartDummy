(function(){


    const AppViewInstance = function(){
        this.AppViewObj = {};
    };

    AppViewInstance.prototype = {

        initAppViewInstance: function(data){
            this.AppViewObj = data;
        },

        getAppViewInstance: function(){
            return this.AppViewObj;
        }

    };

    module.exports = function(){
        return new AppViewInstance();
    }();

})();
