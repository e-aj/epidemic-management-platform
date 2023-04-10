
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
        meta:{  role:'3',title:'首页'}
      },
      {
        path:'/studentInfo',
        name:'studentInfo',
        component:()=>import("../views/student/studentInfo.vue"),
        meta:{  role:'0',title:'个人信息'}
      },
      {
        path:'/reportForm',
        name:'reportForm',
        component:()=>import("../views/student/reportForm.vue"),
        meta:{  role:'0',title:'报表填写'},
      },
      {
        path:'/backSchoolForm',
        name:'backSchoolForm',
        component:()=>import("../views/student/backSchoolForm.vue"),
        meta:{  role:'0',title:'返校信息'}
      },
      
        {
        path:'/afterSchoolForm',
        name:'afterSchoolForm',
        component:()=>import("../views/student/afterSchoolForm.vue"),
        meta:{  role:'0',title:'校后管理'}
      },
      
      {
        path:'/afterSchoolForm',
        name:'afterSchoolForm',
        component:()=>import("../views/student/afterSchoolForm.vue"),
        meta:{  role:'0',title:'校后管理'}
      },
      {
        path:'/studentList',
        name:'studentList',
        component:()=>import("../views/instructor/studentList.vue"),
        meta:{  role:'1',title:'学生信息'}
      },
      {
        path:'/reportDetails',
        name:'reportDetails',
        component:()=>import("../views/instructor/reportFormList.vue"),
        meta:{  role:'1',title:'报备信息管理'}
      },
      {
        path:'/inBackSchoolDetails',
        name:'inBackSchoolDetails',
        component:()=>import("../views/instructor/backSchoolDetails.vue"),
        meta:{  role:'1',title:'返校信息管理'}
      },
      {
        path:'/inAfterSchoolDetails',
        name:'inAfterSchoolDetails',
        component:()=>import("../views/instructor/afterSchoolDetails.vue"),
        meta:{  role:'1',title:'校后管理'}
      },
      {
        path:'/backSchoolDetails',
        name:'backSchoolDetails',
        component:()=>import("../views/admin/backSchoolDetails.vue"),
        meta:{  role:'2',title:'校后管理'}
      },
      {
        path:'/afterSchoolDetails',
        name:'afterSchoolDetails',
        component:()=>import("../views/admin/afterSchoolDetails.vue"),
        meta:{  role:'2',title:'学生返校后管理'}
      },
      {
        path:'/instructorList',
        name:'instructorList',
        component:()=>import("../views/admin/instructorList.vue"),
        meta:{  role:'2',title:'辅导员列表'}
      },
      {
        path:'/adminList',
        name:'adminList',
        component:()=>import("../views/admin/adminList.vue"),
        meta:{  role:'2',title:'管理员列表'}
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
  if (!token && to.name !== "login" ) {
    message.warning("请登录账号");
    next("/login");
  } else {
    next();
  }
  
});

export default router;
