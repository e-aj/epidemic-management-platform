<template>
    <div>
      <a-breadcrumb>
        <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">报表详情</a></a-breadcrumb-item>
      </a-breadcrumb>
      <a-table :columns="columns" :data-source="InstructorList" :pagination="false" bordered>
        <template #operation="{ operation }">
          Delete
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-tag color="orange" @click="changeInstructorBtn(record)">修改</a-tag>
            <a-tag color="red" @click="deleteInstructorBtn((record))">删除</a-tag>
          </template>
        </template>
      </a-table>
  
  
  
      <a-modal v-model:visible="addVisible" title="添加辅导员" @ok="addOk" cancelText="取消" okText="确定添加">
        <a-form :model="addInstructorInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="姓名">
            <a-input v-model:value="addInstructorInfo.name" />
          </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model:value="addInstructorInfo.userName" type="textarea" />
          </a-form-item>
          <a-form-item label="密码">
            <a-input v-model:value="addInstructorInfo.password" type="textarea" />
          </a-form-item>
  
        </a-form>
  
      </a-modal>
  
      <a-modal v-model:visible="changeVisible" title="修改信息" @ok="changeOk" cancelText="取消" okText="确定修改">
        <a-form :model="changeInstructorInfos" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="姓名">
            <a-input v-model:value="changeInstructorInfos.name" />
          </a-form-item>
          <a-form-item label="用户名">
            <a-input v-model:value="changeInstructorInfos.userName" type="textarea" disabled/>
          </a-form-item>
          <a-form-item label="密码">
            <a-input v-model:value="changeInstructorInfos.password" type="textarea" />
          </a-form-item>
  
        </a-form>
  
      </a-modal>
  
      <a-modal v-model:visible="deleteVisible" title="删除信息" @ok="deleteOk" cancelText="取消" okText="确定删除">
        <p>是否删除此人</p>
      </a-modal>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { getInstructorList } from '../../api/instructor'
  import { onMounted, ref, reactive } from 'vue';
  import { changeInstructorInfo, addInstructor, deleteInstructor } from '../../api/instructor'
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
  interface InstructorInfoType {
    studentId?:any,
    heathy:string,
    activeLine:string,
    erea:string
  }
  let InstructorList = ref<InstructorInfoType[]>([]);
  
  
  
  const addInstructorInfo = reactive<InstructorInfoType>({
    heathy:'',
    activeLine:'',
    erea:''
  })
  
  const changeInstructorInfos = reactive<InstructorInfoType>({
    name: '',
    userName: "",
    password: "",
    id:0
  })
  
  
  const deleteId = ref()
  
  const labelCol = { span: 4 }
  const wrapperCol = { span: 10 }
  
  
  const getList = () => {
    getInstructorList().then(res => {
      InstructorList.value = res.data
    })
  }
  onMounted(() => {
    getList()
  })
  
  
  const addInstructorBtn = () => {
    addVisible.value = true
  
  }
  
  const addOk = () => {
    addVisible.value = false
    addInstructor(addInstructorInfo).then(res => {
      if (res.status == 0) {
        message.success('添加成功')
        getList()
      } else {
        message.info(res.message)
      }
    })
  }
  
  const changeInstructorBtn = (record) => {
    changeVisible.value = true
    changeInstructorInfos.id = record.id
    changeInstructorInfos.userName = record.userName
    changeInstructorInfos.password = record.password
    changeInstructorInfos.name = record.name
  
  }
  
  const changeOk = () => {
    console.log(changeInstructorInfos)
    changeInstructorInfo(changeInstructorInfos).then(res => {
      if(res.status == 0){
        message.success('修改成功！')
        changeVisible.value = false
        getList()
      }else{
        message.info(res.message)
      }
    })
  
  }
  
  const deleteInstructorBtn = (record) => {
    deleteVisible.value = true
    deleteId.value = record.id
  }
  
  const deleteOk = ()=>{
    deleteInstructor({"id":deleteId.value}).then(res=>{
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