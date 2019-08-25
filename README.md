# Node.js 是什么

- JavaScript 运行时
- 既不是语言，也不是框架，它是一个平台
- Node 是一个比肩 Java、PHP 的一个平台
  - JavaScript 既能写前端也能写服务端

## Node.js 中的 JavaScript

- 在 Node 中没有 BOM、DOM，和浏览器不一样
- EcmaScript 基本的 JavaScript 语言部分
  - 变量
  - 方法
  - 数据类型
  - 内置对象
  - Array
  - Object
  - Date
  - Math
- 在 Node 中为 JavaScript 提供了一些服务器级别的 API
  - 文件操作的能力
  - http 服务的能力

## 模块系统概念

- 在 Node 中没有全局作用域的概念
- 在 Node 中，只能通过 require 方法来加载执行多个 JavaScript 脚本文件
- require 加载只能执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
  - 模块完全是封闭的
  - 外部无法访问内部
  - 内部也无法访问外部
- 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污的
  问题
- 但是某些情况下，模块与模块是需要进行通信的
- 在每个模块中，都提供了一个对象：`exports`
- 该对象默认是一个空对象
- 你要做的就是把需要被外部访问使用的成员手动的挂载到 `exports` 接口对象中
- 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象

- 模块中需要通信的成员就挂载到 exports 对象中去，不需要通信的就留在模块内，可以想象为 unexports（其用处就只是简单执行而已，例如 console.log()）
- 模块中需要通信的成员常常是重复的代码

## exports 和 module.exports 的区别

- module.exports 和 exports 的区别

  - exports 只是 module.exports 的一个引用而已，目的只是为了简化写法
  - 每个模块最终 return 的是 module.exports

  - 每个模块中都有一个 module 对象
  - module 对象中有一个 exports 对象
  - 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
  - 也就是：`moudle.exports.xxx = xxx` 的方式
  - 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
  - 所以 Node 为了方便，同时在每一个模块中都提供了一个成员叫：`exports`
  - `exports === module.exports` 结果为 `true`
  - 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
  - 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
  - 不要使用 `exports = xxx` 不管用
  - 因为每个模块最终向外 `return` 的是 `module.exports`
  - 而 `exports` 只是 `module.exports` 的一个引用
  - 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
  - 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的
  - 之所以让大家明白这个道理，是希望可以更灵活的去用它

```javascript
moudle.exports = {
  a: 123
};

// 重新建立 exports 和 module.exports 之间的引用关系
exports = module.exports;

exports.foo = "bar";
```

## 模块中导出多个成员和导出单个成员的方式

- 出单个成员：`module.exports = xxx` xxx 代表字符串、变量、函数
- 导出多个可以通过多次：`exports.xxx = xxx`
- 导出多个也可以：`moudle.exports = {多个成员}` `moudle.exports = 构造函数`

## 模块系统

- 核心模块
- 第三方模块 必须先通过 npm 下载才可以使用，例如 art-template
- 自己写的模块
- 加载规则以及加载机制
- 循环加载

## 核心模块

- 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
  - fs 文件操作模块
  - http 网络服务构建模块
  - os 操作系统信息模块
  - path 路径处理模块
  - URL 路径操作模块
  - 。。。。
- 所有核心模块在使用的时候都必须先手动`require`加载，然后才可以使用，例如：
  - `var fs = require('fs')`

## require 方法加载规则

- 优先从缓存加载
- 核心模块
- 路径形式的模块
  - `./xxx`
  - `../xxxx`
  - `/xxxx` / 在这里表示的是磁盘根路径，绝对路径
  - `c:/xxx` 绝对路径
- 第三方模块
  - 第三方模块的标识就是第三方模块的名称（不可能有第三方模块和核心模块的名字一致）
  - npm
    - 开发人员可以把写好的框架、库发布到 npm 上
    - 使用者在使用的时候就可以很方便的通过 npm 来下载
  - 使用方式：`var 名字 = require('npm install 的那个包名')`
  - node_modules
  - node_modules/express
  - node_modules/express/package.json
  - node_modules/express/package.json main
  - 如果 package.json 或者 package.json main 不成立，则查找备选项：index.js
  - 如果以上条件都不成立，则继续进入上一级目录中的 node_modules 按照上面的规则继续查找
  - 如果直到当前文件模块所属磁盘根目录都找不到，最后报错：`can not find module xxx`

## nodejs 和 npm 的关系

- node.js 是 javascript 的一种运行环境，是对 Google V8 引擎进行的封装。是一个服务器端的 javascript 的解释器。
  包含关系，nodejs 中含有 npm，比如说你安装好 nodejs，打开 cmd 输入 npm -v 会发现 npm 的版本号，说明 npm 已经安装好。
- 引用大神的总结:
  其实 npm 是 nodejs 的包管理器（package manager）。我们在 Node.js 上开发时，会用到很多别人已经写好的 javascript 代码，如果每当我们需要别人的代码时，都根据名字搜索一下，下载源码，解压，再使用，会非常麻烦。于是就出现了包管理器 npm。
  大家把自己写好的源码上传到 npm 官网上，如果要用某个或某些个，直接通过 npm 安装就可以了，不用管那个源码在哪里。并且如果我们要使用模块 A，而模块 A 又依赖模块 B，模块 B 又依赖模块 C 和 D，此时 npm 会根据依赖关系，把所有依赖的包都下载下来并且管理起来。试想如果这些工作全靠我们自己去完成会多么麻烦！
- npm 官网：https://www.npmjs.com/

## npm 常用命令

- npm --version
  - 查看 npm 安装的版本
  - npm -v
- npm install --global npm
  - 升级 npm
- npm init
  - npm init -y 可以跳过向导，快速生成
- npm install
  - 一次性把 dependencies 选项中依赖项全部安装
  - npm i
- npm install 包名
  - 只下载
  - npm i 包名
- npm install --save 包名
  - 下载并且保存依赖项（package.json 文件中的 dependencies 选项）
  - npm i -S 包名
- npm uninstall 包名
  - 只删除，如果有依赖项依然会保存
  - npm un 包名
- npm uninstall --save 包名
  - 删除的同时也会把依赖项信息去掉
  - npm un -S 包名
- npm help
  - 查看使用帮助
- npm 命令 --help
  - 查看指定命令使用帮助
- npm ls -g --depth 0
  - 查看全局依赖模块命令
  - ls--list
  - 加上 --depth 0，来限制结果的层数

## npm 被墙问题

- 走国外的 npm 服务器，速度比较慢
- 安装 cnpm

```shell
npm install --global cnpm
# 使用cnpm就会通过淘宝的服务器下载包，用cnpm代替npm
cnpm install 包名
```

- 不安装 cnpm,就设置参数

```shell
npm install set registry https://registry.npm.taobao.org
# 查看npm配合信息
npm config list
```

## package.json 包描述文件

- 相当于产品的说明书
- 其中有`dependencies` 属性，用来保存项目的第三方包依赖项信息
- 如果你的`node_modules`删除了也不用担心，我们只需要:`npm istanll`就会自动把`package.json`中的`dependencies`中的所有依赖项都下载回来
- 所以建议每个项目都要有且只有一个 package.json (存放在项目的根目录)
- 我们可以通过 `npm init [--yes]` 来生成 package.json 文件
- 同样的，为了保存依赖项信息，我们每次安装第三方包的时候都要加上：`--save` 选项。
  - 建议执行`npm install 包名`的时候都加上`--save`这个选项，目的是用来保存依赖项信息

## package-lock.json 文件的作用

- 下载速度快了
- 锁定版本

## 代码风格

为了约定大家的代码风格，所以在社区中诞生了一些比较规范的代码风格规范：

- [JavaScript Standard Style](https://standardjs.com/)
- Airbnb JavaScript Style
- 无分号
  - `(`
  - `[`
  - `
  - 最好前面补分号，避免一些问题
  - 《编写可维护的 JavaScript》
  - 不仅是功能，还要写的漂亮

## 服务端渲染

- 说白了就是在服务端使用模板引擎
- 模板引擎最早诞生于服务端，后来才发展到了前端
- 模板引擎 既能在浏览器 也能在 node 中使用，它只操作字符串解析替换
- 渲染就是使用模板引擎
- 服务端渲染和客户端渲染的区别
  - 服务端比客户端更加安全、一致、稳定，前端不用写 js 脚本
  - 服务端压力大，用户体验一般
  - 客户端 交互方式更加丰富
  - 客户端渲染不利于 SEO 搜索引擎优化
  - 服务端渲染是可以被爬虫抓取到的，客户端异步渲染是很难被爬虫抓取到的
  - 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的
  - 而是两者结合来做的
  - 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  - 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染
  - Chrome F12 右键网页源代码/检查
- 客户端渲染和服务端渲染的区别
  - 最少两次请求，发起 ajax 在客户端使用模板引擎渲染
  - 客户端拿到的就是服务端已经渲染好的

## 网站开发模型

- Node Server
  - Node 比较偏底层，很多东西需要亲自写代码来实现
  - 自定义非常灵活，精简而漂亮，优雅而艺术
- PHP+Apache
  - 默认封装了很多底层细节操作
- 黑盒子、哑巴
  - 在 node 中开启的服务器，默认是黑盒子，所有资源都不允许用户来访问，用户可以访问那些资源由具体的开发人员编写设计的代码为准
  - 写代码让它变得更智能
  - 按照你设计好的套路供用户使用
- 使用 Node 编写应用程序主要就是在使用

  - EcmaScript 语言
    - 和浏览器不一样，在 Node 中没有 BOM、DOM
  - 核心模块
    - 文件操作的 fs
    - http 服务的 http
    - URL 路径操作模块
    - path 路径处理模块
    - OS 操作系统信息
  - 第三方模块
    - 必须通过 npm 下载才可以使用，例如 art-template
  - 自己写的模块

- art-template 里面用的语法是 jQuery？
  - art-template 和 jQuery 一毛钱关系都没有
  - each 是 art-template 的模板语法，专属的
  - {{each 数组}}
  - <li>{{ $value }}</li>
  - {{/each}} 这是 art-template 模板引擎支持的语法，只能在模板字符串中使用
- jQuery 的 each 和 原生的 JavaScript 方法 forEach
  - jQuery 的 each 由 jQuery 这个第三方库提供
    - \$.each(数组, function)
    - \$('div').each(function) 一般用于遍历 jQuery 选择器选择到的伪数组实例对象
  - forEach 是 EcmaScript 5 中的一个数组遍历函数，是 JavaScript 原生支持的遍历方法 可以遍历任何可以被遍历的成员
  - jQuery 的 each 方法和 forEach 几乎一致
    - 由于 forEach 是 EcmaScript 5 中的，所以低版本浏览器不支持，不兼容 IE 8
    - jQuery 2 以下的版本是兼容 IE 8 的
    - 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
    - 同时它也可以作为低版本浏览器中 forEach 替代品
  - jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用
    - `[].slice.call(jQuery实例对象)`

```javascript
//[].slice.call(jQuery实例对象)原理
Array.prototype.mySlice = function () {
  var start = 0
  var end = this.length
  if (arguments.length === 1) {
    start = arguments[0]
  } else if (arguments.length === 2) {
    start = arguments[0]
    end = arguments[1]
  }
  var tmp = []
  for (var i = start; i < end; i++) {
    // fakeArr[0]
    // fakeArr[1]
    // fakeArr[2]
    tmp.push(this[i])
  }
  return tmp
}

var fakeArr = {
  0: 'abc',
  1: 'efg',
  2: 'haha',
  length: 3
}

// 所以你就得到了真正的数组。
[].mySlice.call(fakeArr)
```

## nodemon

- nodemon 来帮我们解决频繁修改代码重启服务器问题
- nodemon 是一个基于 Node.js 开发的一个第三方命令行工具，我们使用时需要独立安装
- 安装

```shell
npm install --global nodemon
```

- 安装完后使用

```shell
node app.js
# 使用nodemon
nodemon app.js
```

- 退出 node http

```shell
ctrl+c
```

也可以直接关闭 cmd

## Express 基本使用

- Express
  - 第三方 Web 开发框架
  - `高度封装了 http 模块`
  - 更加专注于业务，而非底层细节
  - 知其所以然
- art-template 模板引擎的配置
- body-parser 解析表单 POST 请求体
- express 静态服务 API
- crud
- express-session 插件

## Express 中配置使用 `art-template` 模板引擎

- 在 Node 中使用 art-template 模板引擎
  - 安装
  - 加载
  - template.render()
- 安装

```shell
npm install --save art-template
npm install --save express-art-template
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
// 快捷安装
npm install art-template express-art-template
```

- 配置

```shell
var express = require('express');
var path = require('path')
var app = express();
// engine 第一个参数，表示，当渲染以 .art 结尾的文件的时候，使用 art-template模板引擎
// 虽然这里不需要加载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, './views/')) //默认就是./views目录
```

- 使用

```shell
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
app.get('/', function(req, res) {
    res.render('index.html',{
        comments:comments
    })
})
```

## Express 中配置使用 `body-parser`

- 安装

```shell
npm install --save body-parser
npm install body-parser
```

- 配置

```shell
var express = require('express')
// 引包
var bodyParser = require('body-parser')

var app = express()

// 配置 body-parser
// 只要加入这个配置，则在req请求对象上多出来一个属性：body
// 也就是说可以直接通过req.body 来获取表单POST请求体数据了
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

- 使用

```shell
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## Express 中配置处理静态资源

```shell
var express = require('express')
var path = require('path')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
```

## Express 中配置使用`express-session`插件

- 安装

```shell
npm install express-session
```

- 配置

```shell
// 该插件会为req请求对象添加一个成员：req.session，默认是一个对象
app.use(session({
    // 配置加密字符串，它会在原有加密基础之上和这个字符串拼起来去加密
    // 目的是为了增加安全性，防止客户端恶意伪造
    secret: 'keyboard cat',
    resave: false,
    // 默认值为true，即无论是否使用 Session ，都默认直接给你分配一把钥匙
    saveUninitialized: false
}))
```

- 使用

```shell
// 添加Session数据
req.session.foo = 'bar'
// 获取Session数据
req.session.foo
```

提示：默认 Session 数据是内存存储的，服务器一旦重启就会丢失，真正的生成环境会把 Session 进行持久化存储。

- Express 中配置使用 express-session 插件
  - 插件也是工具
  - 只需要明确目标就可以了
  - 最终的目标就是使用 Session 来管理一些敏感信息数据状态，例如保存登陆状态
  - 写 Session
    - req.session.xxx = xx
  - 读 Session
    - req.session.xxx
  - 删除 Session
    - req.session.xxx = null
    - 更严谨的做法是 `delete` 语法
    - delete req.session.xxx

## 中间件：http://www.expressjs.com.cn/guide/using-middleware.html

```shell
// 在app.use(router)之后
// 配置一个处理 404 的中间件---主要处理请求路径错误
app.use(function(req, res) {
    res.render('404.html')
})

// 配置一个处理全局错误中间件---主要处理服务端数据库连接失败
app.use(function(err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})
```

## 回调函数

- 异步编程
- 如果需要得到一个函数内部异步操作的结果，这个时候必须通过回调函数来获取
- 在调用的位置传递一个函数进来
- 在封装的函数内部调用传递进来的函数

- find、findIndex、forEach
  - 数组的遍历方法，都是对函数作为参数一种运用
  - every
  - some
  - includes
  - map
  - reduce
- 增删改查
  - 使用文件来保存数据（锻炼异步编码）
- MongoDB
  - CRUD 所有方法都封装好了

## 关系型数据库和非关系型数据库

- 表就是关系，或者说表与表之间存在关系
- 所有关系型数据库都需要通过`sql`语言来操作
- 所有关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
- 非关系型数据库非常的灵活
- 有些非关系型数据库就是 key-value 对

## MongoDB 数据库

- MongoDB 数据库
  - 灵活
  - 不用设计数据表
  - 业务的改动不需要关心数据表结构
  - DBA 架构师 级别的工程师都需要掌握这项技能
    - 设计
    - 维护
    - 分布式计算

### 安装 配置环境变量

- 此电脑--右键属性--高级系统设置--环境变量--Path--编辑--新建--粘贴(MongoDB 安装路径)
- C:\Program Files\MongoDB\Server\4.0\bin
- cmd 命令确认安装成功与否 mongod --version
- 启动 停止 MongoDB 数据库服务

```shell
# 启动
# mongodb 默认使用执行mongod命令所处盘符更目录下的/data/db作为自己的数据存储目录
# 所以在第一次执行该命令之前先手动新建/data/db
  mongod
# 如果想要修改默认的数据存储目录，可以：
  mongod --dbpath=数据存储目录路径
# 停止
  在开启服务的控制台，直接Ctrl+c即可停止
```

### 连接和退出数据库(新开一个 cmd 操作数据库)

```shell
# 该命令默认连接本机的MongoDB服务
  mongo
# 在连接状态下输入 exit 退出连接
  exit
```

### 基本命令

```shell
# 查看显示所有数据库
  show dbs
# 查看当前操作的数据库
  db
# 切换到指定的数据库（如果没有会新建）
  use 数据库名称
# 插入数据
```

### MongoDB 的数据存储结构

- 数据库
- 集合（表）
- 文档（表记录）

```json
{//MongoDB
  qq:{// 数据库
    user:[// 集合
    {name:'张三'，age:15},// 文档
    {name:'李四'，age:16},
    {name:'王五'，age:18},
    {name:'赵六'，age:17},
    ...
    ],
    product:[]
    },
  taobao:{},
  baidu:{}
}
```

- MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
  - 这个确实很强大，但是比较原始，麻烦，所以不使用它

### mongoose

- 真正在公司进行开发，使用的是 mongoose 这个第三方包
- 它是基于 MongoDB 官方的 mongodb 包进一步做了封装
- 可以提高开发效率
- 让你操作 MongoDB 数据库更方便
- 第三方包：WordPress 项目开发团队
- 设计 Schema
- 发布 Model（得到模型构造函数）
  - 查询
  - 增加
  - 修改
  - 删除
- 掌握使用 mongoose 对数据集合进行基本的 CRUD

### 使用 Node 操作 mysql 数据库

## Promise

- http://es6.ruanyifeng.com/#docs/promise
- 异步编程很难保证代码的执行顺序，通过回调嵌套的方式保证顺序
- 嵌套太深，代码呈现'>'很丑，不好维护
- 凡是数据库操作都是异步的
- 为了解决以上编码方式带来的问题（回调地狱嵌套 callback-hell）
- callback hell 回调地狱
- 回调函数中套了回调函数
- 所以在 EcmaScript6 中新增了一个 API：`Promise`
- 容器
  - 异步任务（pending）
  - resolve
  - reject
- then 方法获取容器的结果（成功的，失败的）
- then 方法支持链式调用
- 可以在 then 方法中返回一个 promise 对象，然后在后面的 then 方法中获取上一个 then 返回的 promise 对象的状态结果

## path 模块

- https://nodejs.org/dist/latest-v10.x/docs/api/path.html
- cmd node
- path 路径操作模块

  - path.basename(path[, ext])
    - 获取路径的文件名（默认包括扩展名）
  - path.dirname(path)
    - 获取一个路径中的目录部分
  - path.extname(path)
    - 获取一个路径中的扩展名部分
  - path.isAbsolute(path)
    - 判断一个路径是否是一个绝对路径
  - path.join([...paths])
    - 当你需要进行路径拼接的时候，推荐使用这个方法，因为 window 下是`\\`代表一个`/`
  - path.parse(path)
    - 把一个路径转换为一个对象
    - root 根路径
    - dir 目录
    - base 包含后缀名的文件名
    - ext 后缀名 文件扩展名
    - name 不包含后缀名的文件名

- Node 中的其他成员
- 在每个模块中，处理`require`、`exports`等模块相关 API 之外，还有两个特殊的成员

  - `__dirname` **动态获取**可以用来获取当前文件模块所属目录的绝对路径
  - `__filename` **动态获取**可以用来获取当前文件的绝对路径
  - `__dirname`和`__filename`是不受执行 node 命令所属路径影响的
  - `fs` 模块 和 `path` 模块成对加载引用

- **dirname 和 **filename
  - 在文件操作中，使用相对路径是不可靠的
  - 因为在 Node 中文件操作的路径被设计为相对于执行 node 命令所处的路径
  - 不是 bug，这样设计是有使用场景的
  - 为了解决这个问题，只需要把相对路径变成绝对路径就可以了
  - 因此可以使用`__dirname`或者`__filename`来解决问题
  - 在拼接路径的过程中，为了避免手动拼接带来的一些低级错误
  - 推荐使用：`path.join()`来辅助拼接
  - 建议：以后在文件操作使用的相对路径都统一转换为**动态的绝对路径**
  - 方式：`path.join(__dirname, '文件名')`

> 补充：模块中的路径标识和这里的路径没有关系，模块中的路径标识就是相对于当前文件模块，不受执行 node 命令所处路径影响

- 文件路径中的 `/` 和模块标识中的 `/`
  - 文件操作中的相对路径可以省略 ./
  - 在模块加载中，相对路径中的 ./ 不能省略
- 网页中所有的路径其实都是 url 路径，不是文件路径

## 课程

- B/S 编程模型
- 模块化编程
- Node 常用 API
- 异步编程 callback Promise csync generator
- Express 开发框架
- EcmaScript6
- 前端三大框架
  - vue
  - angular
  - react
- 书籍

  - 《深入浅出 Node.js》朴灵 偏理论 理解底层原理
  - 《Node.js 权威指南》 API 讲解

- query

  - Node.js 域名修改，默认主页
  - Mongo 文档添加属性

- http

  - require
  - 端口号
    - ip 地址定位计算机
    - 端口号定位具体的应用程序
  - Content-Type
    - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
    - 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
    - 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
  - 通过网络发送文件
    - 发送的并不是文件，本质上来讲发送是文件的内容
    - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理

- 表单同步提交和异步提交区别
  - 以前没有 ajax 都是这么干的，甚至有些直接就是渲染了提示信息出来了
  - 异步提交页面不会刷新，交互方式更灵活
- 表单同步提交和异步提交区别

  - 字符串交互
  - 请求（报文、具有一定格式的字符串）
  - HTTP 就是 Web 中的沟通语言
  - 服务器响应（字符串）
  - 01（二进制）
  - 服务器端重定向针对异步请求无效

- JavaScript 模块化

  - Node 中的 CommonJS
  - 浏览器中的
    - AMD require.js
    - CMD sea.js
  - EcmaScript 官方在 EcmaScript 6 中增加了官方支持
  - EcmaScript 6
  - 后面我们会学，编译工具

- art template 原生语法
  当模版引擎解析到<%%>时，会把其中的字符串作为 js 代码来执行，当<%%>中紧跟 “＝” 则会输出变量
  不关心字符串内容，只关心标记

---
