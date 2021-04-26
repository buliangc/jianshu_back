const express = require('express');
const router = express.Router();
const HomeList = require('../models/homeList')
let listSerial = 1;     //文章序列号
function genSerialCode(){
    return ((listSerial++)+1);
}
let num = 0;
/**
 * 
 * @param {*} sequenceName: findOneAndUpdate函数的conditions
 * @returns 新的id值
 */
async function getNextSequenceValue(sequenceName) {
    let sequenceDocument  = await HomeList.findOneAndUpdate(
            {id: sequenceName },
            { $inc:{sequence_value:0.5} },
            {new:true},function(err, data) {
                if(err) {
                    console.log('数据库发生错误')
                }
                else if(!data) {
                    console.log('未查找到相关数据')
                    console.log(data)
                    
                }
                else if(data){
                    console.log('修改数据成功')
                    console.log(data)
                }
            }
        )
    return sequenceDocument.sequence_value;
 }

router.post('/addList', (req, res, next) => {
    const {title,desc,imgUrl}  = req.body;
    getNextSequenceValue(0).then((data) => {
        // console.log('当前的'+data);
        var user = new HomeList({
        id: data,   // 序列号
        title,      // 文章名
        desc,       // 描述
        imgUrl,
      });
            user.save((err, docs) => {
        if(err) {
            res.send({
                status: 'error',
                statusCode: res.statusCode,
                msg: '保存失败'+err,
            });
        } else {
          res.send({
            status : "success",
            data: docs
          });
        }
      })
    })
})

router.get('/', (req, res, next) => {
    const {page} = req.query;
    const PageSize = 2;
    let countNum = 0;
    // let countNum = HomeList.estimatedDocumentCount({});
    HomeList.count({}, (err, count) => {
        // console.log('总共有多少', count);
        if(((page -1)*PageSize+1)>=count) {
        res.send({
            status: "extend",
        })
    }else {
        HomeList.find({}).skip((page -1)*PageSize+1).limit(PageSize)
        .then((dosc) => {
            res.send({
                status: "success",
                data: dosc,
                count: countNum
            })
            return res;
        })
        .catch((error) => {
            console.log(`分页失败${error}`);
            return false;
            })
        }
    });
})


module.exports = router;