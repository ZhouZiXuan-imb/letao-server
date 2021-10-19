const router = require('koa-router')();
const {sms} = require('../controllers/sms')

router.get('/sms', sms)

module.exports = router;