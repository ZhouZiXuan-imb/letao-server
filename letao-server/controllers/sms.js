const {smscode, sendSms} = require('../utils/sms');

module.exports.sms = async (ctx) => {
    // 请求参数手机号
    const {mobile} = ctx.request.body;
    // 短信验证码随机数 4位数字
    const code = smscode(4);
    const data = await sendSms(mobile, code)
    console.log(data)
    // 发送失败
    if (data.SendStatusSet[0].Code != 'Ok') {
        ctx.body = {
            status: 1040,
            msg: data.SendStatusSet[0].Message
        }
        return;
    }
    ctx.body = {
        status: 200,
        code,
        msg: '短信发送成功'
    }
}