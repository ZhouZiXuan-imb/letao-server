const {appid, mch_id, notify_url, orderUrl} = require('../config/wx')
const {createSign, createOrder} = require('../utils/order')
const {getRandomByLength, getTrade_no} = require('../utils/order')
// 引入生成二维码插件
const QRcode = require('qrcode');

const commonParams = {
    // 随机字符串
    nonce_str: getRandomByLength(),
    // 生成商户订单号
    out_trade_no: getTrade_no()
}

// 微信下单操作
module.exports.order = async (ctx) => {
    const {body, total_fee, spbill_create_ip, trade_type} = ctx.request.body;
    let params = {
        appid, // appid
        mch_id, // 商户号
        nonce_str: commonParams.nonce_str, // 随机字符串
        out_trade_no: commonParams.out_trade_no, // 商户订单号
        notify_url, // 通知地址
        // 下面四项是调用下单接口时传来的参数
        body, // 商品描述
        total_fee, // 标价金额
        spbill_create_ip, // 终端IP
        trade_type, // 交易类型
    }

    // 生成签名
    const sign = createSign(params);
    params.sign = sign;
    // 定义请求参数
    const sendData = `
            <xml>
                <appid>${appid}</appid>
                <body>${body}</body>
                <mch_id>${mch_id}</mch_id>
                <nonce_str>${commonParams.nonce_str}</nonce_str>
                <notify_url>${notify_url}</notify_url>
                <out_trade_no>${commonParams.out_trade_no}</out_trade_no>
                <spbill_create_ip>${spbill_create_ip}</spbill_create_ip>
                <total_fee>${total_fee}</total_fee>
                <trade_type>${trade_type}</trade_type>
                <sign>${sign}</sign>
            </xml>
   `;
    // 发起请求
    const data = await createOrder(orderUrl, sendData);
    const {return_code, return_msg, result_code, code_url} = data;
    if (return_code === 'SUCCESS' && return_msg === 'OK' && result_code === "SUCCESS") {
        data.payUrl = await QRcode.toDataURL(code_url);
        console.log(data.payUrl)
    }
    ctx.body = {
        status: 200,
        data
    }
}