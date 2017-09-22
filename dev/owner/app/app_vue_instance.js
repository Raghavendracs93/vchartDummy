(function(){


    const VueInstance = function(){
        this.VueObj = {};
    };

    VueInstance.prototype = {

        initVueInstance: function(data){
            this.VueObj = data;
        },

        getVueInstance: function(){
            return this.VueObj;
        }

    };

    module.exports = function(){
        return new VueInstance();
    }();

})();
