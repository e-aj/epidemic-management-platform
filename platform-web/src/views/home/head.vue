<template>
    <div class="head">
        <div>你好！{{ userName }}</div>
        <div>角色：{{role}}</div>
        <div class="logout" @click="logout">退出</div>
    </div>


      <!-- 退出弹框 -->
      <a-modal
      v-model:visible="isLogout"
      title="退出系统"
      @ok="logoutHandleOk"
      cancelText="取消"
      okText="确定退出"
    >
      <p>是否退出系统</p>
    </a-modal>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { useRouter } from 'vue-router';
import { message } from "ant-design-vue";

const userName = localStorage.getItem('userName')
const router = useRouter()

const isLogout = ref(false)

const logout = ()=>{
    isLogout.value = true
}

const role = ref('')

const logoutHandleOk = () => {
      isLogout.value = false;
      message.info("退出成功");
      localStorage.clear();
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    };


onMounted(()=>{
    const roleId = localStorage.getItem('role')
    if(roleId=='0'){
        role.value = '学生'
    }else if(roleId=='1'){
        role.value = '辅导员'
    }else{
        role.value = '管理员'
    }
})
</script>

<style scoped lang="less">
.head{
    position: absolute;
    right: 50px;

        
    
    div{
        display: inline-block;
        margin-left: 20px;
    }
    .logout{
        cursor: pointer;
    }
    .logout:hover{
        color: #1890ff;
    }
}

</style>