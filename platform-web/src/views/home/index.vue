<template>
  <div class="index">
    <div class="time">
      欢迎来到！学生返校防疫管理系统！<br />今天是：{{ time.year }} &nbsp;
      星期{{ time.week }}
    </div>
    <div class="student" :v-if="role == '0'">请填写你今日的健康状况！</div>
    <div class="instructor" :v-if="role == '1'">
      <div
        class="arriveNum"
        id="arriveNumEcharts"
        style="width: 400px; height: 200px"
        ref="arriveNumEcharts"
      ></div>
      <div
        class="heathy"
        id="heathyEcharts"
        style="width: 400px; height: 200px"
        ref="heathyEcharts"
      ></div>
    </div>
    <div class="admin" :v-if="role == '2'">ad</div>
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
import { getStudentList, getReportFormList } from "../../api/student";

const data = new Date();

const time = reactive({
  year: ` ${data.getFullYear()}年${data.getMonth() + 1}月${data.getDate()}日`,
  week: "",
});

const toChinese = (i: any) => {
  switch (i) {
    case 1:
      time.week = "一";
      break;
    case 2:
      time.week = "二";
      break;
    case 3:
      time.week = "三";
      break;
    case 4:
      time.week = "四";
      break;
    case 5:
      time.week = "五";
      break;
    case 6:
      time.week = "六";
      break;
    case 7:
      time.week = "天";
      break;
  }
};

const role = ref(localStorage.getItem("role"));

onMounted(() => {
  let studentNum ;
  let arriveNum ;
  getStudentList().then((res) => {
    studentNum = res.data.length;
  });
  getReportFormList().then((res) => {
    arriveNum = res.data.length;
  });

  toChinese(data.getDay());
  setTimeout(()=>{
    arriveNumEcharts(studentNum, arriveNum);
  },1000)
});

let myEcharts = echarts;

const arriveNumEcharts = (studentNum: any, arriveNum: any) => {
  console.log(studentNum, arriveNum);
  let myChart = myEcharts.init(
    document.getElementById("arriveNumEcharts") as HTMLElement
  );
  const option = {
    title: {
      text: "到校人数比例",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "到校比例",
        type: "pie",
        radius: "50%",
        data: [
          { value: arriveNum, name: "到校人数" },
          { value: studentNum - arriveNum, name: "未到校人数" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};


const heathyEcharts = (studentNum: any, arriveNum: any) => {
  console.log(studentNum, arriveNum);
  let myChart = myEcharts.init(
    document.getElementById("heathyEcharts") as HTMLElement
  );
  const option = {
    title: {
      text: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "到校比例",
        type: "pie",
        radius: "50%",
        data: [
          { value: arriveNum, name: "到校人数" },
          { value: studentNum - arriveNum, name: "未到校人数" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  myChart.setOption(option);
};
</script>

<style lang="less" scoped>
.index {
  padding: 50px;
  font-size: 26px;
  color: #1890ff;
}
</style>
