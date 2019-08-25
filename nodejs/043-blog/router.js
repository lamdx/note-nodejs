var express = require('express')
var User = require('./models/user')
var router = express.Router()
var md5 = require('blueimp-md5')

router.get('/', function(req, res) {
    // console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function(req, res) {
    res.render('login.html')
})

router.post('/login', function(req, res) {
    // 1. 获取表单数据
    // 2. 查询数据库用户名密码是否正确
    // 3. 发送响应数据
    var body = req.body
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function(err, data, next) {
        if (err) {
            // return res.status(500).json({
            //     err_code: 500,
            //     message: 'Server error'
            // })
            return next(err)
        }
        if (!data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname is invalid.'
            })
        }
        req.session.user = data
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})


router.get('/register', function(req, res) {
    res.render('register.html')
})

router.post('/register', function(req, res) {
    // 1.获取表单提交数据
    //   req.body
    // 2.操作数据库
    // 判断改用户是否存在
    //    如果已存在，不允许注册
    //    如果不存在，注册新建用户
    // 3.发送响应
    var body = req.body
    User.findOne({
        $or: [{ email: body.email }, { nickname: body.nickname }]
    }, function(err, data, next) {
        if (err) {
            // return res.status(500).json({
            //     err_code: 500,
            //     message: 'Server error'
            // })
            return next(err)
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname already exists'
            })
        }
        // 对密码进行 md5 重复加密
        body.password = md5(md5(body.password))
        new User(body).save(function(err, data, next) {
            if (err) {
                // return res.status(500).json({
                //     err_code: 500,
                //     message: 'Server error'
                // })
                return next(err)
            }

            req.session.user = data

            // Express 提供了一个响应方法：json
            // 该方法接收一个对象作为参数，它会自动把对象转为字符串再发送给浏览器
            res.status(200).json({
                err_code: 0,
                message: 'OK'
            })

            // 服务端重定向只针对同步请求才有效，异步请求无效
            // res.redirect('/')
        })
    })
})

router.get('/logout', function(req, res) {
    // 清除登录状态
    req.session.user = null

    // 重定向到登录页
    res.redirect('/login')
})

// 当前阶段扩展async try await 语法
// router.post('/register', async function(req, res) {
//     var body = req.body
//     try {
//         if (await User.findOne({ email: body.email })) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: '邮箱已存在'
//             })
//         }

//         if (await User.findOne({ nickname: body.nickname })) {
//             return res.status(200).json({
//                 err_code: 2,
//                 message: '昵称已存在'
//             })
//         }

//         // 对密码进行 md5 重复加密
//         body.password = md5(md5(body.password))

//         // 创建用户，执行注册
//         await new User(body).save()

//         res.status(200).json({
//             err_code: 0,
//             message: 'OK'
//         })
//     } catch (err) {
//         res.status(500).json({
//             err_code: 500,
//             message: err.message
//         })
//     }
// })

module.exports = router