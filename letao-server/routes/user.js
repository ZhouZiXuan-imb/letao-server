// 引入koa-router
const router = require('koa-router')();
// 引入controllers文件
const {userRegister, login} = require('../controllers/user')
// 给路由加前缀/user
router.prefix('/user')
// 注册路由
router.post('/register', userRegister);
// 登陆路由
router.get('/login', login);

module.exports = router;