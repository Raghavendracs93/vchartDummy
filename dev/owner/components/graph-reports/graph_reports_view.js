(function(){

    const responseHandler = require("../../app/api/responseHandler");

    const graphComp = {
        name:"graphView",
        data: function(){
            return {
                msg: "Hello there"
            };
        },
        methods: {
            routeTODayReport : function () {
                let router = require("../../app/router/app_router");
                router.push({path:'/day-reports'})
            },
            routeTOWeekReport : function () {
                let router = require("../../app/router/app_router");
                router.push({path:'/week-reports'})
            },
            routeTOMonthReport : function () {
                let router = require("../../app/router/app_router");
                router.push({path:'/month-reports'});
            },
        }
    };
    module.exports = graphComp;
})();

