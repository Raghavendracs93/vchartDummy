import BarChart from './BarChart'

const guardLogConfig = require("../../../app/api/api_configs/api_configs_new/guard_log");
let guardStorage = require("../../../app/storage_manager/guard_storage");
const responseHandler = require("../../../app/api/responseHandler");
let Moment = require("moment");
const _ = require("lodash");

export default {
    name:"WeekReportView",
    components: {
        BarChart
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
            fromDateQuery: "",
            toDateQuery: "",
            verified: 0,
            verifiedData: [],
            notVerified: 0,
            logDetailsLength: 0,
            notVerifiedData: [],
            guardLogDetails: [],
            monReport: [],
            tueReport: [],
            wedReport: [],
            thuReport: [],
            friReport: [],
            satReport: [],
            sunReport: [],
            groupByGuardData: [],
            selectedGuardData: {},

            datacollection: {
                labels: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                datasets: [
                    {
                        label: "Total Data",
                        backgroundColor:'#03a9f4',
                        borderColor: '#03a9f4',
                        data: [],
                        fill: false,
                        hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'lightgrey'
                    },
                    {
                        label: "Verified Data",
                        backgroundColor:'#4caf50',
                        borderColor: '#4caf50',
                        data: [],
                        fill: false,
                        hoverBackgroundColor: "rgba(75, 203, 80, 0.7)",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'lightgrey'
                    },
                    {
                        label: "NotVerified Data",
                        backgroundColor:'#ff0000',
                        borderColor: '#ff0000',
                        data: [],
                        fill: false,
                        hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'lightgrey'

                    }
                ]
            },
            options : {
                categoryPercentage: 0.5,
                barPercentage: 1.0,
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Bar Chart'
                },
                tooltips: {
                    mode: 'label',
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        barThickness : 8,
                        scaleLabel: {
                            display: true,
                            labelString: 'Week'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        barThickness : 8,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        },
                        gridLines: {
                            display:true,
                            color:"#9e9e9e"
                        },
                    }]
                }
            }
        }
    },
    created : function () {
        this.guardLogFunction();
    },
    mounted () {
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
            this.guardSelected = true;
            this.dataEmpty = false;
            let logDetails = guardStorage.state.guardLog;
            this.guardLogDetails = guardStorage.state.guardLog;
            this.logDetailsLength = logDetails.length;
            this.groupByGuardData =_.values( _.groupBy(this.guardLogDetails,function (o) {
                return o.timeStamp;
            }));
            console.log(this.groupByGuardData);
            if(this.logDetailsLength == 0){
                this.clearDataValues();
            }
            this.setDayReport();
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
        },

        getCount : function (data) {
            let count = 0;
            data.forEach(function (o) {
                if(o.guardLog.otpStatus === "true"){
                    ++count;
                }
            });
            return count;
        },
        setDayReport : function () {
            this.dayData = [];
            this.datacollection.datasets[0].data =[];
            this.datacollection.datasets[1].data =[];
            this.datacollection.datasets[2].data =[];
            for(let i=0;i<this.groupByGuardData.length;i++){
                let data = {
                    day :Moment(this.groupByGuardData[i][0].timeStamp).format('dddd'),
                    data : this.groupByGuardData[i]
                };
                this.dayData.push(data);
            }
            this.monReport = [];
            for(let i=0;i<this.dayData.length;i++)
                switch(this.dayData[i].day) {
                    case 'Monday' :
                        this.datacollection.datasets[0].data[0] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;
                        this.datacollection.datasets[1].data[0] = this.verifiedCount;
                        this.datacollection.datasets[2].data[0] = this.notVerifiedCount;
                        break;
                    case 'Tuesday' :
                        this.datacollection.datasets[0].data[1] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;
                        this.datacollection.datasets[1].data[1] = this.verifiedCount;
                        this.datacollection.datasets[2].data[1] = this.notVerifiedCount;
                        break;
                    case 'Wednesday' :
                        this.datacollection.datasets[0].data[2] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;
                        this.datacollection.datasets[1].data[2] = this.verifiedCount;
                        this.datacollection.datasets[2].data[2] = this.notVerifiedCount;
                        break;
                    case 'Thursday' :
                        this.datacollection.datasets[0].data[3] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;

                        this.datacollection.datasets[1].data[3] = this.verifiedCount;
                        this.datacollection.datasets[2].data[3] = this.notVerifiedCount;
                        break;
                    case 'Friday' :
                        this.datacollection.datasets[0].data[4] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;
                        this.datacollection.datasets[1].data[4] = this.verifiedCount;
                        this.datacollection.datasets[2].data[4] = this.notVerifiedCount;
                        break;
                    case 'Saturday' :
                        this.datacollection.datasets[0].data[5] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;
                        this.datacollection.datasets[1].data[5] = this.verifiedCount;
                        this.datacollection.datasets[2].data[5] = this.notVerifiedCount;
                        break;
                    case 'Sunday' :
                        this.datacollection.datasets[0].data[6] = this.dayData[i].data.length;
                        this.verifiedCount = this.getCount(this.dayData[i].data);
                        this.notVerifiedCount = this.dayData[i].data.length - this.verifiedCount;

                        this.datacollection.datasets[1].data[6] = this.verifiedCount;
                        this.datacollection.datasets[2].data[6] = this.notVerifiedCount;
                        break;
                    default :
                        console.log("Error in switch case");
                        break;
                }
        },
    }
}