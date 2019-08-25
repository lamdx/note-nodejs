var url = require('url')

// 使用 url.parse 方法将路径解析为一个方便操作的对象，
// 第二个参数为 true 表示直接将查询字符串转为一个对象(通过 query 属性来访问)
var obj = url.parse('/pinglun?name=雪儿&message=美丽', true)

console.log(obj)
console.log(obj.query)
