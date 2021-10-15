const router = require('koa-router')();
const {oneCategory} = require('../controllers/oneCategory')

router.get('/onecategory', oneCategory)

module.exports = router;