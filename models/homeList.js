const mongoose = require('../plug/db');
// mongoose.set('useFindAndModify', false);
// mongoose.set('useUnifiedTopology', true);
// 定义结构表
const HomeListSchema = mongoose.Schema({
    id:{type:Number},
    title:{
        type:String,        
    },
    desc:{type:String},
    imgUrl: {type:String},     
    sequence_value: {type:Number, default:0},
})

module.exports = mongoose.model('homeList',HomeListSchema)