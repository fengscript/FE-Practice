import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Users from "./views/Users.vue";
import UserInfo from "./views/UserInfo.vue";
import UserDetail from "./views/UserDetail.vue";

const UserDetail1 = {
  template: `<h3>I'm details info 1</h3>`
};

const UserDetail2 = {
  template: `<h3>I'm details info 2</h3>`
};

const nothing = {
  template: `<h3>oops nothing</h3>`
};

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/users/:username",
      name: "users",
      component: UserInfo,
      children: [
        {
          path: "userDetail",
          name: "userDetail",
          component: UserDetail
        },
        // {
        //   path: "userDetail2",
        //   name: "userDetail2",
        //   component: UserDetail2
        // },
        // { path: "", name: "nothing", component: nothing }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.name) {
    console.log("void router");
    return;
  }
  next();
});

export default router;
