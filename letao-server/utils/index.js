// 引入nodejs的内置的加密包
const {createHash} = require('crypto');

module.exports.cryptoPwd = (password) => {
    return createHash('MD5').update(password).digest('hex');
}

module.exports.createSign =  (args) => {
    let stringA = Object.keys(args).sort().reduce((prev,curr) => {
        return prev += `${curr}=${args[curr]}`;
    },"");
    return stringA;
}