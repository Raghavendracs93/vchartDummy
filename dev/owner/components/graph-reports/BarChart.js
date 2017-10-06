import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;

export default Bar.extend({
    mixins: [reactiveProp],
    props: ['datacollection', 'options'],
    mounted () {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        console.log("Inside Mount");
        this.renderChart(this.chartData, this.options)
        console.log("Outside Mount");
    },
})