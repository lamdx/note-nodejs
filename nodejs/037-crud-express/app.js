/**
 * app.js 入口模块
 * 职责：
 * 		创建服务
 * 		做一些服务相关配置
 * 		模板引擎
 * 		body-parser 解析表单 post 请求体
 * 		提供静态资源服务
 * 		挂载路由
 * 		监听端口启动服务
 */

var express = require('express')
var router = require('./router.js')
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'));

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 将路由挂载到 app 服务中
app.use(router)
// app.get('/', function(req, res) {
//     // res.send('hello world')
//     // readFile 的第二个参数是可选的，传入 utf8 就是告诉它把读取到的文件直接按照 utf8 
//     // 编码转成我们能认识的字符
//     // 除了这样来转换之外，也可以通过 data.toString() 的方式
//     fs.readFile('./db.json', 'utf8', function(err, data) {
//         if (err) {
//             return res.status(500).send('Sever error.')
//         }
//         // 从文件中读取到的数据一定是字符串
//         // 所以这里一定要手动转成对象
// 		var students = JSON.parse(data).students
//         res.render('index.html', {
//         fruits: [
//             'apple',
//             'banana',
//             'orange'
//         ],
//         students: students
//     	})
//     });
// })

app.listen(3000, function() {
    console.log('running......')
})
