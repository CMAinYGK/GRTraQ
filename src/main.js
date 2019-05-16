import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { store } from "./store";
import vueHeadful from "vue-headful";
const fb = require("./firebaseConfig.js");

Vue.component("vue-headful", vueHeadful);
Vue.use(Vuetify, {
  theme: {
    primary: "#9d1939",
    secondary: "#11335d",
    accent: "#eebd31",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00"
  }
});

Vue.config.productionTip = false;

let app;
/* eslint-disable */
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: h => h(App)
    });
  }
});
