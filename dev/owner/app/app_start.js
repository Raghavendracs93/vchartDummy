

const Vue = require("vue");
const VueInstance = require("./app_vue_instance");
const VeeValidate = require("vee-validate");
const router = require("./router/app_router");
import Vuetify from 'vuetify'
let AppVue = require("../components/app/app.vue");
require("../less/finalStyles.less");

// require("vue-toastr/src/vue-toastr.less");

Vue.use(Vuetify);
Vue.use(VeeValidate);

/* let vueApp = new Vue({
 router: router,
 components: {
 "vue-toastr": toastr
 }
 }).$mount("#app");
 */

let vueApp = new Vue({
  el: '#root',
  router: router,
  render: h => h(AppVue)
});

VueInstance.initVueInstance(vueApp);
// module.exports = vueApp;
