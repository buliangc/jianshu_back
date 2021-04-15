
// const mongoose = require('mongoose')

// // 连接数据库
// mongoose.connect('mongodb://localhost/buliangcdesign',function (err) {
//     if(err) {
//         console.log('失败!!!!!!!!!!!!!!!!!!!');
//         }else{
//         console.log('数据库连接成功');
//     }
// });


const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/buliangcdesign';

// 连接
mongoose.connect(DB_URL, { useNewUrlParser: true });
// 连接成功
mongoose.connection.on('connected', function () {
  console.log('连接数据库成功' + DB_URL);
})
// 连接异常
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error ' + err);
})
// 连接断开
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected ');
})

module.exports = mongoose;