(function(){


    const routes = [
        {
            path: "",
            name: "",
            components:{
                default : require("../../components/graph-reports/day-reports/day_reports_view.vue")
            }
        },
        {
            path: "/report",
            name: "report",
            components:{
                default : require("../../components/graph-reports/day-reports/day_reports_view.vue")
            }
        }
    ];

    module.exports = routes;
})();