var express = require('express');
var router = express.Router();
const User = require('../models/user.js');  // User模型 用于处理数据库

/* 
// 获取用户信息
*/

router.get('/', (req, res, next) => {
  User.find({})
  .then((docs) => {
    res.send({
      status : "true",
      data: docs
    })
  })
  .catch((error) => {
    res.send({
      status : "false",
      data: ''
    })
  })
})

/* 
// 增加用户信息
*/
router.post('/addUserInfo', function(req, res, next) {
  const {username, password, age} = req.body;
  // console.log(mongoose.Types.ObjectId(id));
  var user = new User({
    username, // 用户名
    password, // 用户密码
    age, // 用户年龄
    lastLoinDate: new Date() // 最近登录一次时间
  });

  user.save(function (err, docs) {
    if(err) {
      res.send({
        status : "false",
        data: ''
      });
    } else {
      res.send({
        status : "success",
        data: docs
      });
    }
  })
});

/* 
// 删除用户信息
*/
router.get('/deleteUserInfo/:name', (req, res, next) => {
    // console.log();
    User.find({username: req.params.name})
    .then((docs) => {
        res.send({
          status: "success",
          data: docs
        })
        return docs;
    })
    .catch(error => {
      res.send({
        status: "false",
        data: ""
      })
        return false;
    })
})

/* 
// 修改用户信息
*/
router.get('/updateUserInfo/:name', (req, res, next) => {
    User.updateOne({})
    .then((docs) => {
      
    })
    .catch((err) => {

    })
})


/* 
// 查询用户信息
*/

module.exports = router;
