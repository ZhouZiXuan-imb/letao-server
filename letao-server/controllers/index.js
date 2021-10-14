/*
*  首页的逻辑处理文件
*/

const mysql = require('../database/mysql')
module.exports = {
    // 宫格数据处理方法
    async gridList(ctx) {
        let sql = `SELECT categoryName from category`
        let data = await mysql.query(sql);
        console.log(data)
        ctx.body = {
            status: 200,
            gridList: [
                {
                    id:1,
                    img_src: ""
                },
                {
                    id:2,
                    img_src: ""
                },
                {
                    id:3,
                    img_src: ""
                },
                {
                    id:4,
                    img_src: ""
                },
                {
                    id:5,
                    img_src: ""
                }
            ],
            aaa:data
        }
    },
    // 轮播图数据处理方法
    async banners(ctx) {
        ctx.body = {
            status: 200,
            bannerList:[]
        }
    },
    // 运动模块数据处理方法
    async sports(ctx) {
        ctx.body = {
            status: 200,
            sportList:[]
        }
    }
}