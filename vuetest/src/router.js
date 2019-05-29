import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Tab1 = { template: "<div>foo</div>" };
const Tab2 = { template: "<div>bar</div>" };

const routes = [
  { path: "/foo", component: Tab1 },
  { path: "/bar", component: Tab2 }
];

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

export default router;

