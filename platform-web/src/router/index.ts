import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";
import './ampMenu'
import { useStore } from "../store";



const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/home.vue"),
    children:
    [
      {
        path:'/index',
        name:'index',
        component:()=>import("../views/home/index.vue"),
      },
     
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login.vue"),
  }
];




const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const daitaiRoutes:any = localStorage.getItem('routes')

  if(daitaiRoutes) {
    const dongtaiRouter:any = [...JSON.parse(daitaiRoutes)]
   
  }

  if (!token && to.name !== "login" ) {
    message.warning("请登录账号");
    next("/login");
  } else{
    next();
  }
  
});

export default router;
