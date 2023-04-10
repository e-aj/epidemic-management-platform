<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">校后管理</a></a-breadcrumb-item>
        </a-breadcrumb>
        <div class="desc">请填写你每日的健康状况！</div>
        <a-form :model="afterSchoolInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="日期">
                <a-date-picker v-model:value="afterSchoolInfo.time" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
            </a-form-item>
            <a-form-item label="当日健康状况">
                <a-select v-model:value="afterSchoolInfo.heath"  style="width: 100%" placeholder="请选择你的健康状况" :options="options" > </a-select>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">确定</a-button>
                <a-button style="margin-left: 10px">取消</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import {postafterSchoolForm,getstudentInfo} from '../../api/student'
import { message } from 'ant-design-vue';


interface afterSchoolInfoType {
    time: string,
    heath:string,
    studentId:any,
    name:string
}

const date = new Date()
const studentId = localStorage.getItem('studentId')
const afterSchoolInfo = reactive<afterSchoolInfoType>({
    heath: '',
    time: '',
    studentId:studentId,
    name:''
})

const options = reactive([
      {
        value: '正常',
        label: '正常',
      },
      {
        value: '发烧',
        label: '发烧',
      },
    ]);
const labelCol = { span: 4 }
const wrapperCol = { span: 10 }




const onSubmit = () => {
    postafterSchoolForm(afterSchoolInfo).then(res=>{
        if(res.status == 0){
            message.success(res.message)
        }
    })
    getstudentInfo({ "studentId": studentId }).then(res => {
        if (res.status == 0) {
            afterSchoolInfo.name = res.data.name
        }
    })
};


</script>

<style scoped lang="less">
.desc {
    margin-top: 20px;
}

.ant-form {
    margin-top: 20px;
}
</style>