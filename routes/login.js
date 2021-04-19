var express = require('express');
const assert = require("http-assert");
const jwt = require('jsonwebtoken')
var router = express.Router();
const { secret } = require('../config')
const AdminUser = require('../models/adminuser');  // User模型 用于处理数据库

/**
 * @function : post 进行登录鉴权
 * @description : username, password传递过来 进行鉴权 
 * 如果鉴权成功 则说明数据存储在数据库中 return 状态 用户权限 
 * 如果鉴权失败 则说明数据库中没有该用户 
 */
router.post('/', async (req, res, next) => {
    const { password, username } = req.query;
    const user = await AdminUser.findOne({ username }).select("+password"); // 将密码添加进 找到的数据中 因为密码是不可见的 只能额外添加
    if(user){
        const isValid = require("bcrypt").compareSync(password, user.password);     // 检测正确的话，返回true， 错误的话返回false
        const token = 'Bearer ' + jwt.sign({username},secret,{expiresIn: 3600 * 24 * 3})    // 通过secret加密生成 token   
        isValid?(res.send({
            status: 'ok',
            currentAuthority: user.currentAuthority,
            token
        })):(res.send({
            status: 'psderror',
            statusCode: res.statusCode,
            msg: '密码错误!',
        }));
    }else {
        res.send({
            status: 'error',
            statusCode: res.statusCode,
            msg: '用户不存在!',
        });   
    }
    // assert(user, 422, "");  // 三个参数分别是 判断条件，不满足条件的状态码，不满足条件的信息。
    
    // assert(isValid, 422, "密码错误!");
    
    // next();
})


module.exports = router;