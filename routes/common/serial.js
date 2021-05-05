const Article = require('../../models/articles')

// 全局变量,记录着每次的编号
let SERIALCODE = {"D":100001,"U":1001,"M":1001,"O":1000001,"I":10000001} 
exports.genSerialCode = (serial) => {
    return ((SERIALCODE[serial]++)+1);
}

// 初始化序列变量
exports.getSerialNum = (serialCode) => {
  Article.count({},function(err, total){
    Article.find({},{"articleSerial": 1},{skip:total - 1},function(err, data){
        console.log(data[0].articleSerial);
        if(data==undefined)
            return data=[]
        serialCode["I"] = parseInt(data[0].articleSerial)|| SERIALCODE["I"];
        console.log(SERIALCODE['I']);

      })
  });
}

exports.SERIALCODE = SERIALCODE;