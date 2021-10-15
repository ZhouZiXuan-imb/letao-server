const router = require('koa-router')();

const { twoCategory } = require('../controllers/twoCategory')

router.get('/twocategory', twoCategory)

module.exports = router;