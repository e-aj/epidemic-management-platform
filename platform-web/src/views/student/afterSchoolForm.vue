<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">校后管理</a></a-breadcrumb-item>
        </a-breadcrumb>
        <div class="desc">请填写你每日的健康状况！</div>
        <a-form :model="afterSchoolInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="日期">
                <input type="textarea" v-model="afterSchoolInfo.time" disabled/>
            </a-form-item>
            <a-form-item label="体温">
                <a-input v-model:value="afterSchoolInfo.temperature" type="textarea" />
            </a-form-item>
            <a-form-item label="有无症状">
                <a-input v-model:value="afterSchoolInfo.heath" type="textarea" />
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit">确定</a-button>
                <a-button style="margin-left: 10px">取消</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import {  reactive, onMounted,ref } from 'vue';
import {postafterSchoolForm,getstudentInfo} from '../../api/student'
import { message } from 'ant-design-vue';


interface afterSchoolInfoType {
    time: string,
    heath:string,
    studentId:any,
    name:string,
    temperature:string
}

const date = new Date()
const studentId = localStorage.getItem('studentId')
const afterSchoolInfo = reactive<afterSchoolInfoType>({
    heath: '',
    time: '',
    studentId:studentId,
    name:'',
    temperature:''
})

const labelCol = { span: 4 }
const wrapperCol = { span: 10 }




const onSubmit = () => {
    postafterSchoolForm(afterSchoolInfo).then(res=>{
        if(res.status == 0){
            message.success(res.message)
        }else{
            message.warning(res.message)
        }
    })
   
};

onMounted(()=>{
    getstudentInfo({ "studentId": studentId }).then(res => {
        if (res.status == 0) {
            afterSchoolInfo.name = res.data.name
            console.log(afterSchoolInfo.name)
        }
    })
    let  data = new Date()
    afterSchoolInfo.time =` ${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`
})



</script>

<style scoped lang="less">
.desc {
    margin-top: 20px;
}

.ant-form {
    margin-top: 20px;
}
</style>