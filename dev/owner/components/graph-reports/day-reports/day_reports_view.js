import BarChart from './BarChart'
let guardStorage = require("../../../app/storage_manager/guard_storage");
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
                labels: labelDisplay,
                datasets: [
                    {
                        label: "Verified Data",
                        backgroundColor:'#4caf50',
                        borderColor: '#4caf50',
                        data: verifiedData,
                        fill: false,
                        hoverBackgroundColor: "rgba(75, 203, 80, 0.7)",
                        hoverBorderWidth: 2,
                        hoverBorderColor: 'lightgrey'
                    },
                    {
                        label: "NotVerified Data",
                        backgroundColor:'#ff0000',
                        borderColor: '#ff0000',
                        data: notVerifiedData,
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
    }
}