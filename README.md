## 使用express框架搭建项目 express [项目名] 添加依赖项 npm install git init 

## 添加db.js 用于连接数据库（plugins目录用于存放db.js） 通过require引入
1. 首先引入mongoose模块, 创建连接[buliangc]数据库。将mongoose暴露出去, 用于创建模型
2. 定义数据库表存储结构, 在models目录下, 创建user.js, 用于构建user的存储结构, 然后将使用schema注入model中, 生成一个模型, 用于操作数据库。mongoose.model('User', UserSchema);暴露出去, 在路由中进行使用。
3. 在routes目录下, 创建不同的子路由。在user.js中使用引入的User模型, 对数据库中用户的增删改查进行操作。
[补充]: 在user.js中引入 [const User = require('../models/user.js');  // User模型 用于处理数据库] 就利用到了数据库, 就会自动进行连接。