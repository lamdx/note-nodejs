// 默认得到的是对象
// 使用对象中的成员必须 . 点某个成员来访问
// 有时候，对于一个模块，仅仅就是希望导出一个方法就可以
var fooExports = require('./foo')

console.log(fooExports)


// 如果你实在分不清楚 exports 和 module.exports
// 你可以选择忘记 exports
// 而只使用 module.exports 也没问题
// 
// module.exports.xxx = xxx
// moudle.exports = {}