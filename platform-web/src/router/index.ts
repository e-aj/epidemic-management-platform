
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { message } from "ant-design-vue";




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


const addRouters = []





//动态路由加载方法
const routerPackag = routers => {
  console.log(routers)
  routers.filter(itemRouter => {
    if (itemRouter.component != "Login") {
      router.addRoute('Home', {
        path: `${itemRouter.path}`,
        name: itemRouter.name,
        component: () => import(`@/${itemRouter.component}`),//此处根据具体地址进行调整
        meta: itemRouter.meta
      });
    }
    // 是否存在子路由
    if (itemRouter.children && itemRouter.children.length) {
      routerPackag(itemRouter.children);
    }
    return true;
  });
}
//调用渲染动态组件方法






const router = createRouter({
  history: createWebHistory(),
  routes,
});




router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const meauList = localStorage.getItem('meauList')

  console.log(meauList)
  if (!token && to.name !== "login" ) {
    message.warning("请登录账号");
    next("/login");
  } else if(!meauList){
    next();
  }else{
    routerPackag(meauList);
    next();
  }
  
});

export default router;
