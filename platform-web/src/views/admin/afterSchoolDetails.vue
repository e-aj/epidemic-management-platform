<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="">校后管理</a></a-breadcrumb-item>
    </a-breadcrumb>
    <a-tag color="green" @click="exportData">导出excel</a-tag>
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
      :data-source="afterSchoolList"
      :pagination="false"
      bordered
    >
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { getAfterSchoolFormList } from "../../api/student";
import { onMounted, ref, reactive } from "vue";
import * as XLSX from "xlsx";

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
    title: "体温",
    dataIndex: "temperature",
    width: 150,
  },
  {
    title: "有无异常",
    dataIndex: "heath",
    width: 150,
  },
  {
    title: "时间",
    dataIndex: "time",
    width: 150,
  },
];

// 用户数据
interface afterSchoolInfoType {
  studentId?: any;
  heathy: string;
  time: string;
  name: string;
}
let afterSchoolList = ref<afterSchoolInfoType[]>([]);
let defaultList = ref<afterSchoolInfoType[]>([]);


  const selectData: any = reactive({
  studentId: "",
  name: "",
});

const getList = () => {
  getAfterSchoolFormList().then((res) => {
    afterSchoolList.value = res.data;
    defaultList.value = res.data;
  });
};
onMounted(() => {
  getList();
});

const selectStudent = () => {
  let arr = defaultList.value;
  if (selectData.studentId || selectData.name) {
    if (selectData.studentId) {
      afterSchoolList.value = arr.filter(
        (v) => v.studentId == selectData.studentId
      );
    }
    if (selectData.name) {
      afterSchoolList.value = (
        selectData.studentId ? afterSchoolList.value : arr
      ).filter((v) => v.name == selectData.name);
    }
  } else {
    afterSchoolList.value = defaultList.value;
  }
};


const transData = (columns: any, afterSchoolList: any) => {
  const obj = columns.reduce((acc: any, cur: any) => {
    if (!acc.titles && !acc.keys) {
      acc.titles = [];
      acc.keys = [];
    }
    acc.titles.push(cur.title);
    acc.keys.push(cur.dataIndex);
    return acc;
  }, {});
  const tableBody = afterSchoolList.map((item) => {
    return obj.keys.map((key) => item[key]);
  });
  return [obj.titles, ...tableBody];
};

const exportData = () => {
  const tableData = transData(columns, afterSchoolList.value);
  // 将一组 JS 数据数组转换为工作表
  const ws = XLSX.utils.aoa_to_sheet(tableData);
  // 创建 workbook
  const wb = XLSX.utils.book_new();
  // 将 工作表 添加到 workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  // 将 workbook 写入文件
  XLSX.writeFile(wb, "table.xlsx");
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
.ant-tag {
  margin: 20px;
}
</style>
