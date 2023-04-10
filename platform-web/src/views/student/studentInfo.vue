<template>
    <div>
        <a-breadcrumb>
            <a-breadcrumb-item><a href="index">首页</a></a-breadcrumb-item>
            <a-breadcrumb-item><a href="">个人信息</a></a-breadcrumb-item>
        </a-breadcrumb>
        <div class="desc">请填写你的个人信息！</div>

        <a-form :model="studentInfo" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="姓名">
                <a-input v-model:value="studentInfo.name" />
            </a-form-item>

            <a-form-item label="学号">
                <a-input v-model:value="studentInfo.studentId" type="textarea" disabled />

            </a-form-item>

            <a-form-item label="年级">
                <a-input v-model:value="studentInfo.grade" type="textarea" />
            </a-form-item>

            <a-form-item label="专业">
                <a-input v-model:value="studentInfo.major" type="textarea" />
            </a-form-item>

            <a-form-item label="寝室号">
                <a-input v-model:value="studentInfo.dormNumber" type="textarea" />
            </a-form-item>


            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="onSubmit" class="btn">确定</a-button>
                <a-button style="margin-left: 10px">取消</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
  
<script setup lang="ts">
import { defineComponent, reactive, toRaw, onMounted } from 'vue';
import { changeStudentInfo, getstudentInfo } from '../../api/student'
import { message } from 'ant-design-vue'



const studentId = localStorage.getItem('studentId')

interface studentInfoType {
    name: string,
    studentId: any,
    grade: string,
    major: string,
    dormNumber: string
}

const studentInfo = reactive<studentInfoType>({
    name: '',
    studentId: studentId,
    grade: "",
    major: "",
    dormNumber: ""
})

const labelCol = { span: 4 }
const wrapperCol = { span: 10 }


onMounted(() => {
    getstudentInfo({ "studentId": studentId }).then(res => {
        console.log(res)
        if (res.status == 0) {
            studentInfo.name = res.data.name
            studentInfo.studentId = res.data.studentId
            studentInfo.grade = res.data.grade
            studentInfo.major = res.data.major
            studentInfo.dormNumber = res.data.dormNumber
        }
    })

})
const onSubmit = () => {
    changeStudentInfo(studentInfo).then(res => {
        if (res.status == 0) {
            message.success('修改信息成功！')
        }

    })
};

</script>

<style scoped lang="less">
.ant-breadcrumb {}

.desc {
    margin-top: 20px;
}

.ant-form {
    margin-top: 20px;
}
</style>