// 引入获取数据库数据方法
const mysql = require('../database/mysql')
// 导出方法
module.exports.oneCategory = () => {
    // 获取数据库数据
    return mysql.query('select * from category');
}

