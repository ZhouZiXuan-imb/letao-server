// 引入生成随机数
const {smsCode} = require('../utils/sms')
// 引入商户号中的key
const {key} = require('../config/wx')
// 引入nodejs内置的加密方法
const {createHash} = require('crypto')
// 引入axios
const axios = require('axios')
// 引入xml转换插件
const xml = require('xml2js')
// 生成32位以内的随机字符串,而且是不重复的
module.exports.getRandomByLength = () => {
    return "letao" + smsCode(6) + new Date().getTime();
}
// 生成商户订单号
module.exports.getTrade_no = () => {
    return this.getRandomByLength() + smsCode(5);
}
// 生成签名
module.exports.createSign = (args) => {
    let stringA = Object.keys(args).sort().reduce((prev, curr) => {
        prev += `${curr}=${args[curr]}&`
        return prev;
    }, '').concat(`key=${key}`);
    // 使用MD5加密
    return createHash("MD5").update(stringA).digest("hex").toUpperCase();
}

// 微信下单
module.exports.createOrder = async (url, params) => {
    return new Promise(async (resolve, reject) => {
        const result = await axios({url:url, data: params, method: "POST"});
        xml.parseString(result.data, function (err, res) {
            const { return_code, result_code, return_msg } = res.xml;
            if (return_code === 'SUCCESS' && result_code === 'SUCCESS' && return_msg === 'OK') {
                resolve(res.xml);
            } else {
                reject(res);
            }
        })
    })
}