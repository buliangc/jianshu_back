const mongoose = require('../plug/db');
// const Schema = mongoose.Schema; 

// const UserSchema = new Schema({
//     username: { type: String }, // 用户名
//     password: { type: String }, // 用户密码
//     age: { type: String }, // 用户年龄
//     lastLoinDate: { type: Date } // 最近登录一次时间
// })

//  定义数据库表存储结构
const UserSchema = mongoose.Schema({
    username: {
        type:String,
        required:true //必须有
      }, // 用户名
      password: {
        type:String,
        required:true
      }, // 用户密码
    age: { type: String }, // 用户年龄
    lastLoinDate: { type: Date } // 最近登录一次时间
});

//  接着我们需要把这个 schema 编译成一个 Model;
//  model是由schema生成的模型，可以对数据库的操作
module.exports = mongoose.model('User', UserSchema);
