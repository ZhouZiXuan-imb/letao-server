// 引入数据层获取oneCategory数据的方法
const {oneCategory} = require('../model/category')
module.exports.oneCategory = async (ctx) => {
    // 调用获取数据的方法
    const result = await oneCategory();
    // 返回给前端
    ctx.body = {
        status: 200,
        oneCategory: result,
    }
}