<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">学生列表</a></a-breadcrumb-item>
    </a-breadcrumb>

    <a-tag color="green" @click="addStudentBtn" class="addBtn">添加学生</a-tag>

    <a-form
      :model="selectData"
      name="horizontal_login"
      layout="inline"
      autocomplete="off"
    >
      <a-form-item label="学号" name="studentId">
        <a-input v-model:value="selectData.studentId">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="姓名" name="name">
        <a-input v-model:value="selectData.name">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="select" @click="selectStudent"
          >搜索</a-button
        >
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data-source="studentList"
      :pagination="false"
      bordered
    >
      <template #operation="{ operation }"> Delete </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-tag color="orange" @click="changeStudentBtn(record)">修改</a-tag>
          <a-tag color="red" @click="deleteStudentBtn(record)">删除</a-tag>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="addVisible"
      title="添加学生"
      @ok="addOk"
      cancelText="取消"
      okText="确定添加"
    >
      <a-form
        :model="addStudentInfo"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="姓名">
          <a-input v-model:value="addStudentInfo.name" />
        </a-form-item>

        <a-form-item label="年级">
          <a-input v-model:value="addStudentInfo.grade" type="textarea" />
        </a-form-item>

        <a-form-item label="专业">
          <a-input v-model:value="addStudentInfo.major" type="textarea" />
        </a-form-item>

        <a-form-item label="寝室号">
          <a-input v-model:value="addStudentInfo.dormNumber" type="textarea" />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input v-model:value="addStudentInfo.userName" type="textarea" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="addStudentInfo.password" type="textarea" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="changeVisible"
      title="修改信息"
      @ok="changeOk"
      cancelText="取消"
      okText="确定修改"
    >
      <a-form
        :model="changeStudentInfos"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="姓名">
          <a-input v-model:value="changeStudentInfos.name" />
        </a-form-item>

        <a-form-item label="年级">
          <a-input v-model:value="changeStudentInfos.grade" type="textarea" />
        </a-form-item>

        <a-form-item label="专业">
          <a-input v-model:value="changeStudentInfos.major" type="textarea" />
        </a-form-item>

        <a-form-item label="寝室号">
          <a-input
            v-model:value="changeStudentInfos.dormNumber"
            type="textarea"
          />
        </a-form-item>
        <a-form-item label="用户名">
          <a-input
            v-model:value="changeStudentInfos.userName"
            type="textarea"
            disabled
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            v-model:value="changeStudentInfos.password"
            type="textarea"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      v-model:visible="deleteVisible"
      title="删除信息"
      @ok="deleteOk"
      cancelText="取消"
      okText="确定删除"
    >
      <p>是否删除此人</p>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { getStudentList } from "../../api/student";
import { onMounted, ref, reactive } from "vue";
import {
  changeStudentInfo,
  addStudent,
  deleteStudent,
} from "../../api/student";
import { message } from "ant-design-vue";
import { Item } from "ant-design-vue/lib/menu";
const addVisible = ref(false);
const changeVisible = ref(false);
const deleteVisible = ref(false);

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "学号",
    dataIndex: "studentId",
    width: 150,
  },
  {
    title: "年级",
    dataIndex: "grade",
    width: 150,
  },
  {
    title: "专业",
    dataIndex: "major",
    width: 150,
  },
  {
    title: "寝室号",
    dataIndex: "dormNumber",
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
interface studentInfoType {
  name: string;
  studentId?: any;
  grade: string;
  major: string;
  dormNumber: string;
  userName: string;
  password: string;
}
let studentList = ref<studentInfoType[]>([]);
let defaultList = ref<studentInfoType[]>([]);

const selectData: any = reactive({
  studentId: "",
  name: "",
});

const addStudentInfo = reactive<studentInfoType>({
  name: "",
  grade: "",
  major: "",
  dormNumber: "",
  userName: "",
  password: "",
});

const changeStudentInfos = reactive<studentInfoType>({
  name: "",
  grade: "",
  major: "",
  dormNumber: "",
  userName: "",
  password: "",
  studentId: 0,
});

const deleteId = ref();

const labelCol = { span: 4 };
const wrapperCol = { span: 10 };

const getList = () => {
  getStudentList().then((res) => {
    studentList.value = res.data;
    defaultList.value = res.data;
  });
};
onMounted(() => {
  getList();

  console.log(defaultList);
});

const addStudentBtn = () => {
  addVisible.value = true;
};

const addOk = () => {
  addVisible.value = false;
  addStudent(addStudentInfo).then((res) => {
    if (res.status == 0) {
      message.success("添加成功");
      getList();
    } else {
      message.info(res.message);
    }
  });
};

const changeStudentBtn = (record) => {
  changeVisible.value = true;
  changeStudentInfos.studentId = record.studentId;
  changeStudentInfos.dormNumber = record.dormNumber;
  changeStudentInfos.grade = record.grade;
  changeStudentInfos.major = record.major;
  changeStudentInfos.userName = record.userName;
  changeStudentInfos.password = record.password;
  changeStudentInfos.name = record.name;
};

const changeOk = () => {
  changeStudentInfo(changeStudentInfos).then((res) => {
    if (res.status == 0) {
      message.success("修改成功！");
      changeVisible.value = false;
      getList();
    } else {
      message.info(res.message);
    }
  });
};

const deleteStudentBtn = (record) => {
  deleteVisible.value = true;
  deleteId.value = record.studentId;
};

const deleteOk = () => {
  deleteStudent({ studentId: deleteId.value }).then((res) => {
    if (res.status == 0) {
      message.success("删除成功！");
      deleteVisible.value = false;
      getList();
    } else {
      message.info(res.message);
    }
  });
};



const selectStudent = () => {
  let arr = defaultList.value;
  if (selectData.studentId || selectData.name) {
    if (selectData.studentId) {
      studentList.value = arr.filter(
        (v) => v.studentId == selectData.studentId
      );
    }
    if (selectData.name) {
      studentList.value = (
        selectData.studentId ? studentList.value : arr
      ).filter((v) => v.name == selectData.name);
    }
  } else {
    studentList.value = defaultList.value;
  }
};
</script>

<style scoped lang="less">
.ant-tag {
  cursor: pointer;
}

.addBtn {
  margin: 10px;
}
.ant-form {
  margin: 10px;
}
</style>
