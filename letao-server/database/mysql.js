// 引入mysql库
const mysql = require('mysql');
// 引入mysql配置文件
const config = require('./config')
// 连接池的作用，数据库可能有很多的用户连接，所以需要连接池，连接池可以让很多用户同时使用
// 每个用户使用完都会释放
// {
//     host: config.dev.host,
//     user: config.dev.username,
//     password: config.dev.password,
//     database: config.dev.database
// }
const pool = mysql.createPool(config[process.env.DB_ENV])

// 创建这个类是因为在文件外部想使用Mysql.query使用query方法，而不是直接mysql();
class Mysql {
    /***
     *
     * @param sql   sql语句
     * @param values
     * @returns {Promise<unknown>}  返回一个Promise对象，返回的数据是数据库中获取的数据
     */
    query(sql, values) {
        // 使用Promise对象返回从数据库获取到的数据
        return new Promise((resolve,reject) => {
            // 获取数据库链接，在getConnection方法中获取到connection参数
            pool.getConnection(function(err,connection) {
                if(err) {
                    return err;
                }
                // 使用connection参数中的query方法传入sql语句，去到数据库中查询
                connection.query(sql, values, (err,result) => {
                    if(err) {
                        reject(err);
                    } else {
                        // 如果没有错误，使用Promise的resolve返回正确结果
                        resolve(result);
                    }
                    connection.release();
                })
            })
        })
    }
}

module.exports = new Mysql() ;
