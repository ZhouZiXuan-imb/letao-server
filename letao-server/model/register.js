// 引入mysql
const mysql = require('../database/mysql')
// 导出注册方法
module.exports.register = async (username, password, mobile) => {
    // 定义SQL语句
    let sql = `insert into user (username,password,mobile) values ("${username}", "${password}", "${mobile}")`;
    // 调用query方法发起数据库连接并传入sql语句
    await mysql.query(sql);
}