const express = require("express");
// 创建路由对象
const router = express.Router();

// // 导入用户路由处理函数模块
// const userHandler = require('../router_handler/user')

const db = require("../db/index");

// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

// 学生登录
router.post("/login", (req, res) => {
  const userinfo = req.body;

  const sql = `select * from student_info where userName=?`;

  db.query(sql, userinfo.userName, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.send({ status: 1, message: err });
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1)
      return res.send({ status: 1, message: "登录失败！" });
    // TODO：判断用户输入的登录密码是否和数据库中的密码一致

    if (userinfo.password !== results[0].password) {
      return res.send({ status: 1, message: "密码错误" });
    }

    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...results[0], password: "" };

    // 导入配置文件
    const config = require("../config");

    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: "10h", // token 有效期为 10 个小时
    });

    res.send({
      status: 0,
      message: "登录成功！",
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: "Bearer " + tokenStr,
      role: results[0].role,
      studentId: results[0].studentId
    });
  });

});

//添加学生
router.post("/addStudent", (req, res) => {
  // 接收表单数据
  const userinfo = req.body;

  console.log(userinfo);
  // 判断数据是否合法
  if (!userinfo.userName || !userinfo.password) {
    return res.send({ status: 1, message: "用户名或密码不能为空！" });
  }

  const sql = `select * from student_info where userName=?`;

  db.query(sql, [userinfo.userName], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.send({ status: 1, message: err.message });
    }
    // 用户名被占用
    if (results.length > 0) {
      return res.send({
        status: 1,
        message: "用户名被占用，请更换其他用户名！",
      });
    }
    // TODO: 用户名可用，继续后续流程...

    const insertSql = "insert into student_info set ?";

    db.query(
      insertSql,
      req.body,
      function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message });
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.send({ status: 1, message: "添加学生失败，请稍后再试！" });
        }
        // 注册成功
        res.send({ status: 0, message: "添加学生成功！" });
      }
    );
  });
});


// 学生列表
router.get('/studentList', (req, res) => {
  const sql = 'select * from student_Info where is_delete = 0  '

  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.send(err)

    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取学生列表成功！',
      data: results,
    })
  })
})


// 获取学生信息
router.post('/studentInfo',(req,res)=>{
  const userinfo = req.body;
  const sql = 'select * from student_Info where studentId=? '

  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql, userinfo.studentId, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.send(err)

  // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
  if (results.length !== 1) return res.send('获取用户信息失败！')

  // 3. 将用户信息响应给客户端
  res.send({
    status: 0,
    message: '获取用户基本信息成功！',
    data: results[0],
  })
})

})


// 修改学生信息
router.post('/changeStudentInfo',(req,res)=>{
  const sql = 'update student_Info  set ? where studentId=? '

  console.log(req.body)

  db.query(sql, [req.body, req.body.studentId], (err, result) => {
    if (err) return res.send({ status: 1, message: err.message });

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "修改用户信息失败！" });

    // 成功
    res.send({ status: 0, message: "修改用户信息成功！" });
  });
})


// 添加报表
router.post('/reportForm',(req,res)=>{

  console.log(req.body)
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const selectSql = `select * from report_Info where studentId=?`

// 执行查重操作
db.query(selectSql, [req.body.studentId], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.send(err)

  if(results.length === 1){
    const updateSql = 'update report_Info  set ? where studentId=? '
    db.query(updateSql, [req.body, req.body.studentId], (err, result) => {
      if (err) return res.send({ status: 1, message: err.message });
  
      if (result.affectedRows !== 1)
        return res.send({ status: 1, message: "修改报表信息失败！" });
  
      // 成功
      res.send({ status: 0, message: "修改报表信息成功！" });
    });
  }else{
    const addSql = `insert into report_Info set ?`


    db.query(addSql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.send(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.send('新增报表失败！')
    
      // 新增文章分类成功
      res.send({ status: 0, message: "新增报表成功" });
    })
  }

})
})


router.post('/reportFormInfo',(req,res)=>{
  const sql = 'select * from report_Info where studentId=? '

  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql, req.body.studentId, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.send(err)

  // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
  if (results.length !== 1) return res.send('获取信息失败！')

  // 3. 将用户信息响应给客户端
  res.send({
    status: 0,
    message: '获取信息成功！',
    data: results[0],
  })
})

})


// 获取报表列表
router.get('/reportFormList', (req, res) => {
  const sql = 'select * from report_Info   '

  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.send(err)

    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取报表列表成功！',
      data: results,
    })
  })
})


// 根据id获取报表信息
// 获取学生信息
router.post('/reportDetails',(req,res)=>{
  const userinfo = req.body;
  const sql = 'select * from report_Info where studentId=? '

  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql, userinfo.studentId, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.send(err)

  // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
  if (results.length !== 1) return res.send('获取报表信息失败！')

  // 3. 将用户信息响应给客户端
  res.send({
    status: 0,
    message: '获取报表信息成功！',
    data: results[0],
  })
})

})

// 修改学生信息
router.post('/changeStudentInfo',(req,res)=>{
  const sql = 'update student_Info  set ? where studentId=? '

  console.log(req.body)

  db.query(sql, [req.body, req.body.studentId], (err, result) => {
    if (err) return res.send({ status: 1, message: err.message });

    if (result.affectedRows !== 1)
      return res.send({ status: 1, message: "修改用户信息失败！" });

    // 成功
    res.send({ status: 0, message: "修改用户信息成功！" });
  });
  


})


// 添加回校信息
router.post('/backSchoolForm',(req,res)=>{

// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const selectSql = `select * from backschool_info where studentId=?`

// 执行查重操作
db.query(selectSql, [req.body.studentId], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.send(err)

  if(results.length === 1){
    const updateSql = 'update backschool_info  set ? where studentId=? '
    db.query(updateSql, [req.body, req.body.studentId], (err, result) => {
      if (err) return res.send({ status: 1, message: err.message });
  
      if (result.affectedRows !== 1)
        return res.send({ status: 1, message: "修改回校信息失败！" });
  
      // 成功
      res.send({ status: 0, message: "修改回校信息成功！" });
    });
  }else{
    const addSql = `insert into backschool_info set ?`


    db.query(addSql, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.send(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.send('新增回校信息失败！')
    
      // 新增文章分类成功
      res.send({ status: 0, message: "新增回校信息成功" });
    })
  }

})
})


router.post('/backSchoolFormInfo',(req,res)=>{
  const sql = 'select * from backschool_info where studentId=? '

  // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
db.query(sql, req.body.studentId, (err, results) => {
  // 1. 执行 SQL 语句失败
  if (err) return res.send(err)

  // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
  if (results.length !== 1) return res.send('获取信息失败！')

  // 3. 将用户信息响应给客户端
  res.send({
    status: 0,
    message: '获取信息成功！',
    data: results[0],
  })
})

})

router.get('/backSchoolFormList', (req, res) => {
  const sql = 'select * from backschool_info   '

  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.send(err)

    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取报表列表成功！',
      data: results,
    })
  })
})


// 添加到校信息
router.post('/afterSchoolForm',(req,res)=>{


      const addSql = `insert into afterschool_info set ?`
  
  
      db.query(addSql, req.body, (err, results) => {
        // SQL 语句执行失败
        if (err) return res.send(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.send('新增回校信息失败！')
      
        // 新增文章分类成功
        res.send({ status: 0, message: "新增回校信息成功" });
      })
    }

  )
  
  
// 根据学号  删除学生
router.post('/deleteStudent',(req,res)=>{
  const sql = `update student_info set is_delete=1 where studentId=?`
  db.query(sql, req.body.studentId, (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.sned(err)
  
    // SQL 语句执行成功，但是影响行数不等于 1
    if (results.affectedRows !== 1) return res.send('删除失败！')

    res.send({ status: 0, message: "删除成功" });
  })
})


// 获取报表列表
router.get('/afterSchoolFormList', (req, res) => {
  const sql = 'select * from afterschool_info   '

  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.send(err)

    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取报表列表成功！',
      data: results,
    })
  })
})
// 将路由对象共享出去
module.exports = router;
