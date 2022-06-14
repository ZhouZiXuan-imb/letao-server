// 引入数据层方法
const { twoCategory } = require('../model/brand')
// 导出方法
module.exports.twoCategory = async (ctx) => {
    const { id } = ctx.request.query
    console.log(id);
    // 调用获取数据库数据的方法
    const result = await twoCategory(id)
    // 给前端返回数据
    ctx.body = {
        status: 200,
        bannerList: result,
    }
}