const express = require('express');
const router = express.Router();
const Article = require('../models/articles')
// const articleModel = require('../plug/db')
const getNowTime = require('./common')
const codeMessage = require('./common/codeMessage')
const serial = require('./common/serial')
serial.getSerialNum(serial.SERIALCODE);

router.post('/addArticle' , (req, res) => {
    const {articleName, author, content} = req.body;
    // console.log(serial.genSerialCode("I"));
    var user = new Article({
        id:1,
        articleName, // 用户名
        author, // 用户密码
        content, // 用户年龄
        releaseDate: getNowTime(), // 最近登录一次时间
        articleSerial: serial.genSerialCode("I"),
    });
    console.log(user);
    user.save( (err, docs) => {
        if(err) {
            res.send({
                status: 'error',
                statusCode: codeMessage[res.statusCode],
                msg: '保存失败',
            });
        } else {
          res.send({
            status : "success",
            statusCode: codeMessage[res.statusCode],
            data: docs
          });
        }
      }) 
    
})

module.exports = router;