const router = require('koa-router')()
// 引入controller中的逻辑文件
const {gridList, banners, sports} = require('../controllers/index')
// 宫格数据获取路由
router.get('/gridlist', gridList)
// 轮播图数据获取路由
router.get('/banners', banners)
// 运动模块数据获取路由
router.get('/sports', sports)

module.exports = router
