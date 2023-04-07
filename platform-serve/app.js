const express = require('express')
const cors = require('cors')

const app = express()


const bodyParser = require('body-parser')
app.use(bodyParser.json({limit:'600mb'})); //解决请求体过大传不过来的问题
app.use(bodyParser.urlencoded({ limit:'600mb',extended:true}))

app.use(cors())
app.use(express.urlencoded({ extended: false }))


// 导入并注册用户路由模块
const studentRouter = require('./router/student')
app.use('/student', studentRouter)

const instructorRouter = require('./router/instructor')
app.use('/instructor', instructorRouter)

const adminRouter = require('./router/admin')
app.use('/admin', adminRouter)



app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})