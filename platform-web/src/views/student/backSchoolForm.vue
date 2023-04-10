<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">返校信息</a></a-breadcrumb-item>
        </a-breadcrumb>
        <div class="desc">请填写你的返校信息！</div>
        <a-form :model="backSchoolInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="返校交通工具">
                <a-input v-model:value="backSchoolInfo.vehicle" />
            </a-form-item>

            <a-form-item label="返校途径地">
                <a-input v-model:value="backSchoolInfo.pathologically" type="textarea" />
            </a-form-item>

            <a-form-item label="返校时间">
                <a-date-picker v-model:value="backSchoolInfo.time" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD"/>
            </a-form-item>

            <a-form-item label="当日健康状况">
                <a-select v-model:value="backSchoolInfo.heath"  style="width: 100%" placeholder="请选择你的健康状况" :options="options" > </a-select>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">确定</a-button>
                <a-button style="margin-left: 10px">取消</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, reactive, toRaw, onMounted } from 'vue';
import {postBackSchoolForm,getBackSchoolFormInfo,getstudentInfo} from '../../api/student'
import { message } from 'ant-design-vue';


interface backSchoolInfoType {
    vehicle: string,
    pathologically: string,
    time: string,
    heath:string,
    studentId:any,
    name:string
}
const studentId = localStorage.getItem('studentId')
const backSchoolInfo = reactive<backSchoolInfoType>({
    heath: '正常',
    vehicle: '',
    pathologically: '',
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


onMounted(()=>{
    getBackSchoolFormInfo({"studentId":studentId}).then(res=>{
        backSchoolInfo.heath = res.data.heath
        backSchoolInfo.pathologically = res.data.pathologically
        backSchoolInfo.time = res.data.time
        backSchoolInfo.vehicle = res.data.vehicle

    })
    getstudentInfo({ "studentId": studentId }).then(res => {
        if (res.status == 0) {
            backSchoolInfo.name = res.data.name
        }
    })
})

const onSubmit = () => {
    postBackSchoolForm(backSchoolInfo).then(res=>{
        if(res.status == 0){
            message.success(res.message)
        }else{
            message.warning(res.message)
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