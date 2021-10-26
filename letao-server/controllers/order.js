const {appid, mch_id, notify_url, orderUrl, orderquery} = require('../config/wx')
const {createSign, orderHandle} = require('../utils/order')
const {getRandomByLength, getTrade_no} = require('../utils/order')
// 引入module层
const {orderPay, orderChangeTradeState} = require('../model/order')
// 引入生成二维码插件
const QRcode = require('qrcode');

const commonParams = {
    // 随机字符串
    nonce_str: "",
    // 生成商户订单号
    out_trade_no: ""
}

// 微信下单
module.exports.order = async (ctx) => {
    // 下单的时候生成商户号和随机字符串，这里应该前端传来商户号和随机字符串
    commonParams.nonce_str = getRandomByLength();
    commonParams.out_trade_no = getTrade_no();

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
    const data = await orderHandle(orderUrl, sendData);
    const {return_code, return_msg, result_code, code_url} = data;
    if (return_code[0] === 'SUCCESS' && return_msg[0] === 'OK' && result_code[0] === "SUCCESS") {
        // 把订单数据存入数据库
        await orderPay(appid, mch_id, body, commonParams.nonce_str, notify_url, commonParams.out_trade_no, spbill_create_ip, total_fee, trade_type, "NOTPAY")
        // 使用qrcode插件把bate64图片生成二维码
        data.payUrl = await QRcode.toDataURL(code_url);
        // 前端查询数据的时候需要用到这两个参数
        data.nonce_str = commonParams.nonce_str;
        data.out_trade_no = commonParams.out_trade_no;
    }
    ctx.body = {
        status: 200,
        data
    }
}

// 查询微信订单
module.exports.queryOrder = async (ctx) => {
    // 查询微信订单需要的请求参数
    const params = {
        appid, // appid
        mch_id, // 商户号
        nonce_str: commonParams.nonce_str, // 随机字符串
        out_trade_no: commonParams.out_trade_no, // 商户订单号
    }
    // 调用生成签名算法方法
    const sign = createSign(params);
    // 把生成的签名添加到params中
    params.sign = sign;

    // 声明请求参数
    const sendData = `
            <xml>
                <appid>${appid}</appid>
                <mch_id>${mch_id}</mch_id>
                <nonce_str>${commonParams.nonce_str}</nonce_str>
                <out_trade_no>${commonParams.out_trade_no}</out_trade_no>
                <sign>${sign}</sign>
            </xml>
   `;

    const data = await orderHandle(orderquery, sendData);
    ctx.body = {
        status: 200,
        data
    }
}

module.exports.native = async (ctx) => {
    // 调用修改订单支付状态的数据库方法
    await orderChangeTradeState(commonParams.out_trade_no);

    ctx.body = {
        status: 200,
        data: {
            message: "支付成功"
        }
    }
}