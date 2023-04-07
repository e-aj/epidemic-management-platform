<template>
  <div class="login">
    <div class="title">学生返校防疫管理系统</div>
    <a-tabs v-model:activeKey="activeKey"  type="card" centered>
      <a-tab-pane key="1" tab="学生">
        <a-form
          :model="formState"
          name="basic"
          @finish="studentFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="userName"
            :rules="[{ required: true, message: '请输入你的用户名!' }]"
          >
            <a-input v-model:value="formState.userName" placeholder="用户名" />
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入你的密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="辅导员" force-render
        >   <a-form
          :model="formState"
          name="basic"
          @finish="instructorFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="userName"
            :rules="[{ required: true, message: '请输入你的用户名!' }]"
          >
            <a-input v-model:value="formState.userName" placeholder="用户名" />
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入你的密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form></a-tab-pane
      >
      <a-tab-pane key="3" tab="管理员">   <a-form
          :model="formState"
          name="basic"
          @finish="adminFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="userName"
            :rules="[{ required: true, message: '请输入你的用户名!' }]"
          >
            <a-input v-model:value="formState.userName" placeholder="用户名" />
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入你的密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { studentLogin,instructorLogin,adminLogin } from "../../api/login";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store/index";
import { json } from "stream/consumers";


interface FormState {
  userName: string;
  password: string;
}

const activeKey = ref("1");

const formState = reactive<FormState>({
  userName: "admin",
  password: "12345678",
});

// 定义路由
const router = useRouter();
const store = useStore()


const studentFinish = (values: any) => {
  studentLogin(formState).then((res: any) => {
    if (res.status === 0) {
      localStorage.setItem("token", res.token);
      localStorage.setItem('meauList', JSON.stringify(res.routes) );
      console.log()
      message.info("登录成功");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      message.warning(res.message);
    }
  });
};



const instructorFinish = (values: any) => {
  instructorLogin(formState).then((res: any) => {
    if (res.status === 0) {
      localStorage.setItem("token", res.token);
      message.info("登录成功");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      message.warning(res.message);
    }
  });
};


const adminFinish = (values: any) => {
  adminLogin(formState).then((res: any) => {
    if (res.status === 0) {
      localStorage.setItem("token", res.token);
      message.info("登录成功");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      message.warning(res.message);
    }
  });
};


const onFinishFailed = (errorInfo: any) => {
  console.log(errorInfo);
};

//  去登录
const toRegister = () => {
  router.push("/register");
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("../../assets/bg.jpg");
  position: absolute;
 
  .title {
    margin-top: 8%;
    font-size: 30px;
    font-weight: bold;
    color: #666666;
  }
  .ant-tabs{
    width: 30%;
    margin: 50px auto 0;
    
  }
 
  .toRegister {
    display: inherit;
    color: #1890ff;
    text-align: right;
    cursor: pointer;
  }
  .ant-form {
    width: 80%;
    text-align: center;
    margin: 40px auto;
    .ant-input,
    .ant-input-password {
      height: 40px;
      border-radius: 5px;
    }
    .ant-btn {
      width: 200px;
      height: 40px;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
}
</style>
