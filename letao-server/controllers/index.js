/*
*  首页的逻辑处理文件
*/

const mysql = require('../database/mysql')
module.exports = {
    // 宫格数据处理方法
    async gridList(ctx) {
        // 应该要加一个数据请求错误给前端返回的状态，这里直接写了死数据，所以不需要加
        // 请求成功返回的数据
        ctx.body = {
            status: 200,
            message: "宫格数据请求成功",
            gridList: [
                {
                    id: 1,
                    img_src: "/images/nav1.png"
                },
                {
                    id: 2,
                    img_src: "/images/nav2.png"
                },
                {
                    id: 3,
                    img_src: "/images/nav3.png"
                },
                {
                    id: 4,
                    img_src: "/images/nav4.png"
                },
                {
                    id: 5,
                    img_src: "/images/nav5.png"
                },
                {
                    id: 6,
                    img_src: "/images/nav6.png"
                }
            ]
        }


    },
    // 轮播图数据处理方法
    async banners(ctx) {
        ctx.body = {
            status: 200,
            message: "轮播图数据请求成功",
            bannerList: [
                {
                    id: 1,
                    img_src: "/images/banner1.png",
                },
                {
                    id: 2,
                    img_src: "/images/banner2.png",
                },
                {
                    id: 3,
                    img_src: "/images/banner3.png",
                },
                {
                    id: 4,
                    img_src: "/images/banner4.png",
                },
                {
                    id: 5,
                    img_src: "/images/banner5.png",
                },
            ]
        }
    },
    // 运动模块数据处理方法
    async sports(ctx) {
        ctx.body = {
            status: 200,
            message: "运动模块数据请求成功",
            sportList: [
                {
                    name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
                    img: '/images/product.jpg',
                    price: 1.00,
                    oldPrice: 888.00
                },
                {
                    name: 'FORUM 84 LOW 新款低帮经典运动鞋',
                    img: '/images/product.jpg',
                    price: 1.00,
                    oldPrice: 899.00
                },
                {
                    name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
                    img: '/images/product.jpg',
                    price: 1.00,
                    oldPrice: 888.00
                },
                {
                    name: 'adidas阿迪达斯 男式 场下休闲篮球鞋S83700',
                    img: '/images/product.jpg',
                    price: 1.00,
                    oldPrice: 888.00
                }
            ]
        }
    }
}