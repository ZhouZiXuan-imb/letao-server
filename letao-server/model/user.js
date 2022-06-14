// 引入mysql
const mysql = require('../database/mysql')
// 导出注册方法
module.exports.register = async (username, password, mobile, smsCode) => {
    // 定义SQL语句
    let sql = `insert into user (username,password,mobile,smscode) values ("${username}", "${password}", "${mobile}", "${smsCode}")`;
    // 调用query方法发起数据库连接并传入sql语句
    return await mysql.query(sql);
}

// 查找数据库中用户名是否存在
module.exports.findUserByUserName = async (username) => {
    const sql = `select * from user where username = "${username}"`
    return await mysql.query(sql)
}

module.exports.login = async (username) => {
    const sql = `select username, password, mobile from user where username = "${username}"`;
    return await mysql.query(sql);
}