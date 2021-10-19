// 引入生成随机数
const {smscode} = require('../utils/sms')
const {cryptoPwd , createSign} = require('../utils')

// 微信下单操作
module.exports.order = (ctx) => {
    // 生成随机字符串(32位以内)
    return cryptoPwd(cryptoPwd('letao' + smscode(6)));
    let params = {
        "mchid": "1900006XXX",
        "out_trade_no": "native12177525012014070332333",
        "appid": "wxdace645e0bc2cXXX",
        "description": "Image形象店-深圳腾大-QQ公仔",
        "notify_url": "https://weixin.qq.com/",
        "amount": {
            "total": 1,
            "currency": "CNY"
        }
    }

    let a = createSign(params);
    console.log(a)
}