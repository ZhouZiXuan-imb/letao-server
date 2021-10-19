const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// 引入koa-jwt
const KoaJwt = require('koa-jwt');
// 引入加密字符串
const {jwtSecret} = require('./config/index');

require('dotenv').config()

// 导出路由文件
const index = require('./routes/index')
const oneCategory = require('./routes/oneCategory');
const twoCategory = require('./routes/twoCategory');
const user = require('./routes/user')
const sms = require('./routes/sms')
const order = require('./routes/order')


// error handler
onerror(app)


// 使用koa-jwt中间件，来拦截客户端和服务端再调用接口时，如果请求头中没有设置token，返回401
// app.use(function (ctx, next) {
//     return next().catch((err) => {
//         if (401 == err.status) {
//             ctx.status = 401;
//             ctx.body = 'Protected resource, use Authorization header to get access\n';
//         } else {
//             throw err;
//         }
//     });
// });

// 设置哪些接口需要带token
// jwt(加密信息) 加密信息一定要跟token生成使用加密字符串保持一致
// unless排除哪些不需要带token
// app.use(KoaJwt({secret: jwtSecret}).unless({path: [/^\/public/, /^\/user\/login/, /^\/sms/]}));

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(oneCategory.routes(), oneCategory.allowedMethods());
app.use(twoCategory.routes(), twoCategory.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(sms.routes(), sms.allowedMethods());
app.use(order.routes(), order.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
