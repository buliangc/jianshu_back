const mongoose = require('../plug/db');
// 定义结构表
const AdminUserSchema = mongoose.Schema({
    username:{type:String},
    password:{
        type:String,
        set(val) {
            return require('bcrypt').hashSync(val,10)   // 将信息进行哈希散列，达到信息加密的目的
        },
        select:false    // 使字段不可查
    },
    currentAuthority:{type:String},
    registerTime: {type:String}     // 用户注册时间
})

module.exports = mongoose.model('adminuser',AdminUserSchema)