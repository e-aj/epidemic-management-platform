<template>
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">报表列表</a></a-breadcrumb-item>
      </a-breadcrumb>
      <a-tag color="green" @click="excel">导出excel</a-tag>
      <a-table :columns="columns" :data-source="ReportList" :pagination="false" bordered>
        <template #operation="{ operation }">
          Delete
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-tag color="orange" @click="changeReportBtn(record)">修改</a-tag>
            <a-tag color="red" @click="deleteReportBtn((record))">删除</a-tag>
          </template>
        </template>
      </a-table>

    </div>
  </template>
  
  <script setup lang="ts">
  import { getReportFormList } from '../../api/student'
  import { onMounted, ref, reactive } from 'vue';
  import { message } from 'ant-design-vue'


  
  
  const columns = [
    {
      title: "学号",
      dataIndex: "studentId",
      width: 150,
    },
    {
      title: "姓名",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "健康状况",
      dataIndex: "heath",
      width: 150,
    },
    {
      title: "地区",
      dataIndex: "erea",
      width: 150,
    },
    {
      title: "活动路线",
      dataIndex: "activeLine",
      width: 150,
    },
  ];
  
  // 用户数据
  interface ReportInfoType {
    studentId?:any,
    heathy:string,
    activeLine:string,
    erea:string,
    name:string
  }
  let ReportList = ref<ReportInfoType[]>([]);
  
  
  const getList = () => {
    getReportFormList().then(res => {
      ReportList.value = res.data
    })
  }
  onMounted(() => {
    getList()
  })
  

  
  
  
  </script>
  
  <style scoped lang="less">
  .ant-tag {
    cursor: pointer;
  }
  
  .addBtn {
    margin: 20px;
  }
  .ant-tag{
    margin: 20px;
  }
  </style>