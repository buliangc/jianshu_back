var express = require('express');
var router = express.Router();
const AdminUser = require('../models/adminuser');  // User模型 用于处理数据库
const getNowTime = require('./common')

/**
 * @function : 注册用户
 * @description : 用于用户注册, 先检验 如果用户名已经注册 return false 
 */

router.post('/', async (req, res) => {
    const { password, username,currentAuthority } = req.query;
    const userIsValid = await AdminUser.findOne({ username });  // 找不到返回null
    if(userIsValid){
        return res.status(422).send({
            status: 'error',
            statusCode: res.statusCode,
            message:'用户已存在!!!'
        })
    }else {
       var user = new AdminUser({
        username, // 用户名
        password, // 用户密码
        currentAuthority, // 权限
        registerTime: getNowTime()
      });
      user.save( (err, docs) => {
        if(err) {
            res.send({
                status: 'error',
                statusCode: res.statusCode,
                msg: '保存失败',
            });
        } else {
          res.send({
            status : "success",
            data: docs
          });
        }
      }) 
    }
})

module.exports = router;
