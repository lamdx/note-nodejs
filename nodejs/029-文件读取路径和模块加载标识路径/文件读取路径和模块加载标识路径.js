// 文件路径中的 `/` 和模块标识中的 `/`

var fs = require('fs')

// 使用的所有文件操作的 API 都是异步的
// 就像 ajax 请求一样

// 文件操作中的相对路径可以省略 ./
fs.readFile('data/a.txt', function (err, data) {
  if (err) {
    return console.log('读取失败')
  }
  console.log(data.toString())
})

// 在模块加载中，相对路径中的 ./ 不能省略
// Error: Cannot find module 'data/foo.js'
// require('data/foo.js')

require('./data/foo.js')('hello')

// 在文件操作的相对路径中
//    ./data/a.txt 相对于当前目录
//    data/a.txt   相对于当前目录
//    /data/a.txt  绝对路径，当前文件模块所处磁盘根目录
//    c:/xx/xx...  绝对路径
