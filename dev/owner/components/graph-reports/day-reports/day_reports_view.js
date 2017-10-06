import BarChart from '../BarChart'

const listGuardConfig = require("../../../app/api/api_configs/api_configs_new/list_guard");
const guardLogConfig = require("../../../app/api/api_configs/api_configs_new/guard_log");
let guardStorage = require("../../../app/storage_manager/guard_storage");
const responseHandler = require("../../../app/api/responseHandler");
let Moment = require("moment");
const _ = require("lodash");

export default {
    name:"DayReportView",
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
            dateQuery: "",
            verified: 0,
            verifiedData: [],
            notVerified: 0,
            logDetailsLength: 0,
            notVerifiedData: [],
            guardLogDetails: [],
            selectedGuardData: {},

            datacollection: {
                labels: [],
                datasets: [
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
                        scaleLabel: {
                            display: true,
                            labelString: 'Duration'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            min:-1,
                            max:1,
                            stepSize: 1
                        },
                        gridLines: {
                            display:true,
                            color:"#9e9e9e"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        }
    },
    watch : {
        dateQuery : function () {
            if(this.guardId != ""){
                this.guardLogFunction();
                this.$refs.datePickerRef.save();
            }

        }
    },
    created : function () {
        this.getUserId();
        this.setPreviousDay();
    },
    mounted () {
    },
    methods: {
        setPreviousDay : function () {
            //this.ystd = Moment().add(-1, 'days').toString();
            this.ystd = Moment().toString();
            this.dateQuery = Moment(this.ystd).format("YYYY-MM-DD");
        },
        getUserId : function () {
            let storage = require("../../../app/storage_manager/login_storage");
            let loginDetail = storage.state.loginCred;
            //this.ownerId=loginDetail.userId;
            this.ownerId=localStorage.getItem("userId");
            this.getGuardList(this.ownerId);
        },
        getGuardList:function (ownerId) {
            listGuardConfig.data.ownerId = ownerId;
            listGuardConfig.successCallback = this.updateGuardList.bind(this);
            let handler = new responseHandler(listGuardConfig);
            handler.execute();
        },
        updateGuardList : function () {
            this.guardList = guardStorage.state.guardList;
        },
        selectedGuard : function (event) {
            this.selectedGuardData = event;
            this.guardId = event.userId;
            this.guardLogFunction();

        },
        guardLogFunction : function () {
            guardLogConfig.data.userId = this.guardId;
            guardLogConfig.data.fromDateQuery = Moment(this.dateQuery).format('L');
            guardLogConfig.data.toDateQuery = Moment(this.dateQuery).format('L');
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
            if(this.logDetailsLength == 0){
                this.clearDataValues();
            }
            this.labelsDisplay();
            this.dataDisplay();
        },
        clearDataValues : function () {
            this.dataEmpty = true;
            this.guardSelected = false;
            this.logDetailsLength = 0;
            this.datacollection.labels =[];
            this.datacollection.datasets[0].data = [];
            this.datacollection.datasets[1].data = [];

        },
        convertToTime : function (date) {
            if(Moment(date).format("MMMM Do YYYY, h:mm:ss a") === "Invalid date"){
                return "-";
            }
            else return Moment(date).format("MMMM Do YYYY, h:mm:ss a");
        },
        guardLogErrorFunc : function () {
            console.log(" guardLogErrorFunc executed");
        },
        labelsDisplay : function () {
            this.datacollection.labels =[];

            for (let i=0; i<this.logDetailsLength;i++){
                this.labelToPUsh =Moment(this.guardLogDetails[i].guardLog.otpCreatedTime).format("HH:mm");
                this.datacollection.labels.push(this.labelToPUsh);
            }
        },
        dataDisplay : function () {
            this.datacollection.datasets[0].data=[];
            this.datacollection.datasets[1].data=[];
            for (let i=0; i<this.logDetailsLength;i++){
                if(this.guardLogDetails[i].guardLog.otpStatus == "true"){
                    this.datacollection.datasets[0].data.push(1);
                    this.datacollection.datasets[1].data.push(0);
                }
                else{
                    this.datacollection.datasets[1].data.push(-1);
                    this.datacollection.datasets[0].data.push(0);
                }
            }
            this.$forceUpdate();
        },
    }
}
