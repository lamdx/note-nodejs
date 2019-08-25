// 异步编程很难保证代码的执行顺序，通过回调嵌套的方式保证顺序
// 嵌套太深，代码呈现'>'很丑，不好维护
// 凡是数据库操作都是异步的
// 为了解决以上编码方式带来的问题（回调地狱嵌套callback-hell），
// 所以在EcmaScript6中新增了一个API：`Promise`
var fs = require("fs");

fs.readFile("./public/data/a.txt", "utf8", function(err, data) {
  if (err) {
    // return console.log('读取失败')
    // 抛出异常
    //    1. 阻止程序的执行
    //    2. 把错误消息打印到控制台
    throw err;
  }
  console.log(data);
  fs.readFile("./public/data/b.txt", "utf8", function(err, data) {
    if (err) {
      // return console.log('读取失败')
      // 抛出异常
      //    1. 阻止程序的执行
      //    2. 把错误消息打印到控制台
      throw err;
    }
    console.log(data);
    fs.readFile("./public/data/c.txt", "utf8", function(err, data) {
      if (err) {
        // return console.log('读取失败')
        // 抛出异常
        //    1. 阻止程序的执行
        //    2. 把错误消息打印到控制台
        throw err;
      }
      console.log(data);
    });
  });
});
