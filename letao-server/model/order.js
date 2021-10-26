// 引入封装好的mysql数据库
const mysql = require('../database/mysql')
// 下单后把数据存入数据库的方法
module.exports.orderPay = async (appid, mch_id, body, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, trade_state) => {
    // 下单成功把数据写入数据库
    await mysql.query(`insert into payorder (appid, mch_id, body, nonce_str, notify_url, out_trade_no, spbill_create_ip, total_fee, trade_type, trade_state) values("${appid}", "${mch_id}", "${body}", "${nonce_str}", "${notify_url}", "${out_trade_no}", "${spbill_create_ip}", "${total_fee}", "${trade_type}", "${trade_state}")`)
}

// 修改数据库中订单的支付状态
module.exports.orderChangeTradeState = async (out_trade_no) => {
    // 根据商户号来修改订单表中的支付状态
    await mysql.query(`update payorder set trade_state = 'SUCCESS' where out_trade_no = "${out_trade_no}"`);
}