// 引入koa-router
const router = require('koa-router')();
// 引入controllers文件
const {postUserRegister} = require('../controllers/user')
// 给路由加前缀/user
router.prefix('/user')
// 声明路由
router.post('/register', postUserRegister);

module.exports = router;