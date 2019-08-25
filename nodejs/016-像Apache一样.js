var http = require('http')
var fs = require('fs')

var server = http.createServer()

var wwwDir = 'D:/phpstudy_pro/WWW/node.js'

server.on('request', function(req, res) {
    var url = req.url
    // / index.html
    // /a.txt wwwDir + /a.txt
    // /apple/login.html wwwDir + /apple/login.html
    // /img/ab1.jpg wwwDir + /img/ab1.jpg
    // 可以根据路径动态显示目录文件

    var filePath = '/index.html'
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function(err, data) {
        if (err) {
            return res.end('404 Not Found.')
        }
        res.end(data)
    })
})

// 3. 绑定端口号，启动服务
server.listen(3000, function() {
    console.log('running...')
})
