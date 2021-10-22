const router = require('koa-router')();

const {order, queryOrder, native} = require('../controllers/order')


router.post('/order', order)

router.post('/pay/queryOrder', queryOrder)

router.post('/pay/native', native)

module.exports = router;