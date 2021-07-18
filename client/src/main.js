import Vue from "vue";
import App from "./App";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

Vue.use(Vuesax);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
