// 引入mysql库
const mysql = require('mysql');
// 引入mysql配置文件
const config = require('../conf/default').database

const pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
})

class Mysql {
    query(sql, values) {
        return new Promise((resolve,reject) => {
            pool.getConnection(function(err,connection) {
                if(err) {
                    return err;
                }
                connection.query(sql,values,(err,rows) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                })
            })
        })
    }
}

module.exports = new Mysql() ;
