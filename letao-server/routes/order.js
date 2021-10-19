const router = require('koa-router')();

const {order} = require('../controllers/order')

router.prefix('/order')

router.post('/', order)


module.exports = router;