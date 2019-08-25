var express = require('express')

var bodyParser = require('body-parser')

var app = express()

app.use('/public/', express.static('./public/'))

// 配置使用 art-template 模板引擎
// 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 虽然这里不需要加载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
// app.engine('art', require('express-art-template'))
app.engine('html', require('express-art-template'))

// Express 为 Response 相应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的视图文件都放到 views 目录中

// 如果想要修改默认的 views 目录，则可以
// app.set('views', render函数的默认路径)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var comments = [{
        name: 'jack',
        message: 'just for fun',
        dateTime: '2019-06-01'
    },
    {
        name: 'lucy',
        message: 'everything will be better',
        dateTime: '2019-06-01'
    },
    {
        name: 'tom',
        message: 'hello world',
        dateTime: '2019-06-01'
    },
]

app.get('/', function(req, res) {
    res.render('index.html', {
        comments: comments
    })
})

app.get('/post', function(req, res) {
    res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', function(req, res) {
	// 1. 获取表单 POST 请求体数据
  	// 2. 处理
  	// 3. 发送响应
	
  	// req.query 只能拿 get 请求参数
  	// console.log(req.query)
    var comment = req.body
    comment.dateTime = '2019年6月10日12:05:49'
    comments.unshift(comment)
    res.redirect('/')
})

// app.get('/comments', function(req, res) {
// 	var comment = req.query
// 	comment.dateTime = '2019年6月10日12:05:49' 
// 	comments.unshift(comment)
// 	// res.statusCode = 302 
// 	// res.setHeader('Location', '/')
// 	// res.end()
// 	res.redirect('/')

// 	// res.send
//  // res.redirect
//  // 这些方法 Express 会自动结束响应
// })

app.listen(3000, function() {
    console.log('running......')
})