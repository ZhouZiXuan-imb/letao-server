// 引入数据层方法
const { register, findUserByUserName, login } = require('../model/user')
// 引入封装好的加密方法
const { cryptoPwd } = require('../utils/index')
// 引入加密字符串
const { secret, jwtSecret } = require('../config/index')
// 引入joi
const Joi = require('joi');
// 引入jwt鉴权
const jwt = require('jsonwebtoken');


// 注册功能
module.exports.userRegister = async (ctx) => {
    console.log(ctx.request.body);
    // 解构出post请求传来的数据
    const { username, password, mobile, smsCode } = ctx.request.body

    // 声明Joi校验规则
    let schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(16).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
        repeatPassword: Joi.ref('password'),
        mobile: Joi.string().pattern(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/).required(),
        smsCode: Joi.string().min(4).max(4).required()
    })
    // 使用校验规则，如果有错误
    const { error, value } = schema.validate({ username, password, mobile, smsCode });
    // 如果有错误就抛出错误
    if (error) throw new Error(error.message);

    // 判断用户名是否存在
    const user = await findUserByUserName(value.username);
    if (user[0]) {
        return ctx.body = {
            status: 0,
            message: "用户已存在，可直接登录",
        }
    }

    // 没有错误就传给数据层
    // 给model层传的password需要加密一下
    await register(value.username, cryptoPwd(value.password + secret), value.mobile, smsCode)
    // 给前端返回注册成功
    return ctx.body = {
        status: 200,
        message: "注册成功",
    }
}

// 登录功能
module.exports.login = async (ctx) => {
    console.log(ctx.request.body);
    // 解构出用户传来的用户名和密码
    const { username, password } = ctx.request.body;
    // console.log({ username, password }, "query");
    // 把用户名传给model层去数据库查找有没有这个用户
    const userNameExist = await login(username);
    console.log(userNameExist[0].mobile, "mobile");

    if (userNameExist[0]) {
        // 如果有这个用户，就判断一下密码是否相同
        if (userNameExist[0].password === cryptoPwd(password + secret)) {

            const token = jwt.sign({ password, username }, jwtSecret, { expiresIn: '1h' });
            // 密码相同就给前端返回登陆成功
            ctx.body = {
                status: 200,
                message: "登陆成功",
                mobile: userNameExist[0].mobile,
                token
            }
        } else {
            ctx.body = {
                status: 0,
                message: "请检查用户名和密码是否正确",
            }
        }
    } else {
        return ctx.body = {
            status: 0,
            message: "用户名不存在，请先注册",
        }
    }
    console.log(userNameExist[0])
}