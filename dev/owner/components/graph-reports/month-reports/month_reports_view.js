import DoughnutChart from './DoughnutChart'

const guardLogConfig = require("../../../app/api/api_configs/api_configs_new/guard_log");
let guardStorage = require("../../../app/storage_manager/guard_storage");
const responseHandler = require("../../../app/api/responseHandler");
let Moment = require("moment");

export default {
    name:"MonthReportView",
    components: {
        DoughnutChart
    },
    data () {
        return {
            datacollection: null,

            guardList : [],
            guards : [],
            selectedRows : [],
            guardSelected : false,
            dataEmpty : false,
            selectedRow: [],
            userId: "",
            guardId: "",
            otpCreatedTime: "",
            otpVerifiedTime: "",
            otpStatus: "",
            monthQuery: "",
            firstDay: "",
            endDay: "",
            nextDay: "",
            verified: 0,
            verifiedData: [],
            notVerified: 0,
            logDetailsLength: 0,
            notVerifiedData: [],
            guardLogDetails: [],
            groupByGuardData: [],
            selectedGuardData: {},

            datacollection: {
                labels: [ "Total Data", "Verified Data", "NotVerified Data",],
                datasets: [
                    {
                        backgroundColor:['#03a9f4',"#4caf50","#ff0000"],
                        data: [],
                        fill: false,
                        hoverBackgroundColor:["rgba(55, 160, 225, 0.7)","rgba(75, 203, 80, 0.7)", "rgba(225, 58, 55, 0.7)"],
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'lightgrey'
                    },
                ]
            },
            options : {
                title: {
                    display: true,
                    text: 'Doughnut Chart'
                },
                segmentShowStroke : true,
                segmentStrokeColor : "#fff",
                segmentStrokeWidth : 2,
                percentageInnerCutout : 50,
                animationSteps : 100,
                animationEasing : "easeOutBounce",
                animateRotate : true,
                responsive: true,
                maintainAspectRatio: true,
                showScale: true,
                animateScale: true
            },
        }
    },
    created : function () {
        this.guardLogFunction();
    },
    methods: {
        guardLogFunction : function () {
            guardLogConfig.data.userId = document.getElementById("root").getAttribute("data-userId");
            guardLogConfig.data.fromDateQuery =document.getElementById("root").getAttribute("data-fromQuery");
            guardLogConfig.data.toDateQuery = document.getElementById("root").getAttribute("data-toQuery");
            guardLogConfig.successCallback = this.guardLogSuccessFunc.bind(this);
            guardLogConfig.errorCallback = this.guardLogErrorFunc.bind(this);

            let handler = new responseHandler(guardLogConfig);
            handler.execute();
        },
        guardLogSuccessFunc : function () {
            this.datacollection.datasets[0].data =[];
            this.guardSelected = true;
            this.dataEmpty = false;
            let logDetails = guardStorage.state.guardLog;
            this.guardLogDetails = guardStorage.state.guardLog;
            this.logDetailsLength = logDetails.length;
            if(this.logDetailsLength == 0){
                this.clearDataValues();
            }
            let verifiedCount = 0;
            let notVerifiedCount = 0;
            this.guardLogDetails.forEach(function (o) {
                if(o.guardLog.otpStatus === "true"){
                    ++verifiedCount;
                }
                else{
                    ++notVerifiedCount;
                }
            });

            console.log(verifiedCount,notVerifiedCount);
            this.datacollection.datasets[0].data.push(this.logDetailsLength);
            this.datacollection.datasets[0].data.push(verifiedCount);
            this.datacollection.datasets[0].data.push(notVerifiedCount);
            console.log(this.datacollection.datasets[0].data);
        },
        clearDataValues : function () {
            this.dataEmpty = true;
            this.guardSelected = false;
            this.logDetailsLength = 0;
            this.datacollection.labels =[];
            this.datacollection.datasets[0].data = [];
        },
        guardLogErrorFunc : function () {
            console.log(" guardLogErrorFunc executed");
        }
    }
}