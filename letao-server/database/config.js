// 数据库配置文件
const config = {
    // 开发环境
    dev: {
        connectionLimit: 10, // 最大连接数
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'letao'
    },
    // 测试环境
    uat:{
        connectionLimit: 10, // 最大连接数
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'letao'
    },
    // 生产环境
    prd:{
        connectionLimit: 10, // 最大连接数
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'letao'
    }
}

module.exports = config;