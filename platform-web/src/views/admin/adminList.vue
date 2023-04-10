<template>
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">管理员列表</a></a-breadcrumb-item>
      </a-breadcrumb>
  
      <a-tag color="green" @click="addAdminBtn" class="addBtn">添加管理员</a-tag>
      <a-table :columns="columns" :data-source="AdminList" :pagination="false" bordered>
        <template #operation="{ operation }">
          Delete
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-tag color="orange" @click="changeAdminBtn(record)">修改</a-tag>
            <a-tag color="red" @click="deleteAdminBtn((record))">删除</a-tag>
          </template>
        </template>
      </a-table>
  
  
  
      <a-modal v-model:visible="addVisible" title="添加管理员" @ok="addOk" cancelText="取消" okText="确定添加">
        <a-form :model="addAdminInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="姓名">
            <a-input v-model:value="addAdminInfo.name" />
          </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model:value="addAdminInfo.userName" type="textarea" />
          </a-form-item>
          <a-form-item label="密码">
            <a-input v-model:value="addAdminInfo.password" type="textarea" />
          </a-form-item>
  
        </a-form>
  
      </a-modal>
  
      <a-modal v-model:visible="changeVisible" title="修改信息" @ok="changeOk" cancelText="取消" okText="确定修改">
        <a-form :model="changeAdminInfos" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="姓名">
            <a-input v-model:value="changeAdminInfos.name" />
          </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model:value="changeAdminInfos.userName" type="textarea" disabled/>
          </a-form-item>
          <a-form-item label="密码">
            <a-input v-model:value="changeAdminInfos.password" type="textarea" />
          </a-form-item>
  
        </a-form>
  
      </a-modal>
  
      <a-modal v-model:visible="deleteVisible" title="删除信息" @ok="deleteOk" cancelText="取消" okText="确定删除">
        <p>是否删除此人</p>
      </a-modal>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { getAdminList } from '../../api/Admin'
  import { onMounted, ref, reactive } from 'vue';
  import { changeAdminInfo, addAdmin, deleteAdmin } from '../../api/Admin'
  import { message } from 'ant-design-vue'
  const addVisible = ref(false)
  const changeVisible = ref(false)
  const deleteVisible = ref(false)
  
  
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "ID",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      width: 150,
    },
    {
      title: "密码",
      dataIndex: "password",
      width: 150,
    },
    {
      title: "操作",
      dataIndex: "operation",
      // width: 150,
    },
  ];
  
  // 用户数据
  interface AdminInfoType {
    name: string,
    id?:any,
    userName:'',
    password:''
  }
  let AdminList = ref<AdminInfoType[]>([]);
  
  
  
  const addAdminInfo = reactive<AdminInfoType>({
    name: '',
    userName: "",
    password: ""
  })
  
  const changeAdminInfos = reactive<AdminInfoType>({
    name: '',
    userName: "",
    password: "",
    id:0
  })
  
  
  const deleteId = ref()
  
  const labelCol = { span: 4 }
  const wrapperCol = { span: 10 }
  
  
  const getList = () => {
    getAdminList().then(res => {
      AdminList.value = res.data
    })
  }
  onMounted(() => {
    getList()
  })
  
  
  const addAdminBtn = () => {
    addVisible.value = true
  
  }
  
  const addOk = () => {
    addVisible.value = false
    addAdmin(addAdminInfo).then(res => {
      if (res.status == 0) {
        message.success('添加成功')
        getList()
      } else {
        message.info(res.message)
      }
    })
  }
  
  const changeAdminBtn = (record) => {
    changeVisible.value = true
    changeAdminInfos.id = record.id
    changeAdminInfos.userName = record.userName
    changeAdminInfos.password = record.password
    changeAdminInfos.name = record.name
  
  }
  
  const changeOk = () => {
    console.log(changeAdminInfos)
    changeAdminInfo(changeAdminInfos).then(res => {
      if(res.status == 0){
        message.success('修改成功！')
        changeVisible.value = false
        getList()
      }else{
        message.info(res.message)
      }
    })
  
  }
  
  const deleteAdminBtn = (record) => {
    deleteVisible.value = true
    deleteId.value = record.id
  }
  
  const deleteOk = ()=>{
    deleteAdmin({"id":deleteId.value}).then(res=>{
      if(res.status == 0){
        message.success('删除成功！')
        deleteVisible.value = false
        getList()
      }else{
        message.info(res.message)
      }
    })
  }
  
  </script>
  
  <style scoped lang="less">
  .ant-tag {
    cursor: pointer;
  }
  
  .addBtn {
    margin: 20px;
  }
  </style>