//middleware/Auth.js
module.exports = (options) => { //options是为了以后扩展使用，一般中间件都写成带参返回的函数
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../models/adminuser");
    const assert = require("http-assert");
  
    return async (req, res, next) => {
      const token = (req.headers.authorization || " ").split(" ").pop();//提取请求头中的token pop是将数组最后一个元素取出来
      assert(token, 401, "请提供 jwt token，请先登录");
      const { id } = jwt.verify(token, req.app.get("secret"))//通过secret解码token，注意这里的req.app 等于 express实例app
      assert(id, 401, "请先登录");
      req.user = await AdminUser.findById(id); //根据id找用户，验证是否为伪造的token
      assert(req.user, 401, "用户不存在，请先登录")
      await next();
    };
  }
