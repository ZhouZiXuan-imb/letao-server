const router = require('koa-router')();
const {sms} = require('../controllers/sms')

router.post('/sms', sms)

module.exports = router;