const express = require("express");
// 创建路由对象
const router = express.Router();

const db = require("../db/index");

// 用这个包来生成 Token 字符串
const jwt = require("jsonwebtoken");

// 学生登录
router.post("/login", (req, res) => {
  const userinfo = req.body;

  const sql = `select * from instructor_info where userName=?`;

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
    });
  });

});

//添加学生
router.post("/addInstructor", (req, res) => {
  // 接收表单数据
  const userinfo = req.body;

  console.log(userinfo);
  // 判断数据是否合法
  if (!userinfo.userName || !userinfo.password) {
    return res.send({ status: 1, message: "用户名或密码不能为空！" });
  }

  const sql = `select * from instructor_info where userName=?`;

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

    const insertSql = "insert into instructor_info set ?";

    db.query(
      insertSql,
      { userName: userinfo.userName, password: userinfo.password },
      function (err, results) {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message });
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.send({ status: 1, message: "注册用户失败，请稍后再试！" });
        }
        // 注册成功
        res.send({ status: 0, message: "注册成功！" });
      }
    );
  });
});

// 将路由对象共享出去
module.exports = router;
