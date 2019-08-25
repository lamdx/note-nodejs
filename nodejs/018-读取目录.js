var fs = require('fs')

fs.readdir('D:/phpstudy_pro/WWW/node.js', function (err, files) {
  if (err) {
    return console.log('目录不存在')
  }
  // files返回的是一个数组
  console.log(files)
})
