import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/Home/Home")
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/UserManage/UserManage")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/UserManage/UserManage")
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("@/views/Other/Page1")
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("@/views/Other/Page2")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
