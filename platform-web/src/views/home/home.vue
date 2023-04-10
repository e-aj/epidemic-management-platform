<template>
  <a-layout>
    <a-layout-sider>
      <div class="title" @click="toIndex">学生返校防疫管理系统</div>


      <a-menu mode="vertical" @click="menuSelect">
        <a-menu-item :key="item.path" v-for="item in routerList">
          {{ item.meta.title }}
        </a-menu-item>
      </a-menu>


    </a-layout-sider>

    <a-layout>

      <a-layout-header class="header">

        <Head />
      </a-layout-header>


      <a-layout-content style="padding: 0 20px;">
        <router-view />
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import Head from "./head.vue";
import { useStore } from '../../store/index'

// 定义router
const router = useRouter();
const store = useStore()

const role = localStorage.getItem('role')


const routerList = router.getRoutes().filter(v => v.meta.role == role || v.meta.role == '3')
// const routerList = router.options.routes


// 跳转首页
const toIndex = () => {
  router.push("/");
};

//切换路由
const menuSelect = (item: any, key: any, keyPath: any) => {
  router.push(item.key)
};


</script>
<style lang="less">
.ant-layout {
  width: 100%;
  height: 100%;

  .ant-layout-header {
    border-bottom: 1px solid #999;
  }

  .ant-layout-content {
    margin-top: 10px;
  }

  .ant-layout-sider {
    .title {
      color: #fff;
      text-align: center;
      font-size: 24px;
      cursor: pointer;
      font-family: 'Courier New', Courier, monospace;
    }

    .ant-layout-sider-children {
      background-image: url("../../assets/sider_bg.jpg");
    }
  }

  .ant-layout-header {
    background: #f0f2f5;
  }
}

#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.changeAvatar {
  .now {
    margin: 5px 5px 20px;

    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
      border-radius: 50%;
    }
  }

  .change {
    margin: 50px 5px 20px;

    .upload {
      margin: 0 10px;
      display: inline-block;
      border: 1px solid #ccc;
      width: 100px;
      height: 100px;

      .add {
        line-height: 100px;
        text-align: center;
        font-size: 40px;
        color: #ccc;
        cursor: pointer;
        position: relative;

        img {
          position: absolute;
          left: 0;
          width: 100px;
          height: 100px;
        }

        input {
          display: none;
        }
      }
    }
  }

}</style>
