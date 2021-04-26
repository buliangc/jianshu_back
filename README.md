## 使用express框架搭建项目 express [项目名] 添加依赖项 npm install git init 

## 添加db.js 用于连接数据库（plugins目录用于存放db.js） 通过require引入
1. 首先引入mongoose模块, 创建连接[buliangc]数据库。将mongoose暴露出去, 用于创建模型
2. 定义数据库表存储结构, 在models目录下, 创建user.js, 用于构建user的存储结构, 然后将使用schema注入model中, 生成一个模型, 用于操作数据库。mongoose.model('User', UserSchema);暴露出去, 在路由中进行使用。
3. 在routes目录下, 创建不同的子路由。在user.js中使用引入的User模型, 对数据库中用户的增删改查进行操作。
[补充]: 在user.js中引入 [const User = require('../models/user.js');  // User模型 用于处理数据库] 就利用到了数据库, 就会自动进行连接。

token鉴权登录的优势：无状态、可以跨域、可以防止csrf、性能好（每次请求不用去服务器查询相应的session），客户端只需要将token存入本地，每次访问服务端headers加上token即可

## 登录鉴权
使用[bcrypt] 将信息进行哈希散列，达到信息加密的目的
JWT 作为一个令牌（token) 用于验证身份 登录之后 会一直存储 除非过了时效。前端会放在Http请求的头信息 Authorization字段里面, 发送给后端。
后端校验token的值，判断当前的token是否有效。从请求头里面取出来校验。
在其他页面上面验证 token 验证成功则表示是当前的用户。
使用[jsonwebtoken] 用于加密生成token值, 
(前端JWT的使用方式 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。此后，客户端每次与服务器通信，都要带上这个 JWT。)
使用[http-assert]进行断言检测 判断某个值是否为真 返回true 假的话 返回false

## 注册登录
对注册的用户进行检测, 如果用户名注册过, 则返回status: false; 反之 保存进数据库, 并返回status: true

## 添加跨域插件 cors

## 分页获取数据并返回给前端