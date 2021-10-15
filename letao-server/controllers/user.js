// 引入数据层方法
const {register} = require('../model/register')
// 引入joi
const Joi = require('joi');

module.exports.postUserRegister = async (ctx) => {
    // 解构出post请求传来的数据
    const {username, password, mobile} = ctx.request.body
    // 声明Joi校验规则
    let schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(16).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
        mobile: Joi.string().pattern(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/)
    })
    // 使用校验规则，如果有错误
    const {error, value} = schema.validate({username, password, mobile});
    // 如果有错误就抛出错误
    if (error) throw new Error(error.message);
    // 没有错误就传给数据层
    await register(value.username, value.password, value.mobile)
    // console.log(ctx.response.body, "body");
    ctx.body = {
        status: 200,
        message: "注册成功",
    }
}