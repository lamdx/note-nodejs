var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });

// 2. 设计文档结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的是为了保证数据的完整性，不要有脏数据

var UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_time: {
    type: Date,
    // 注意：这里不要写 Date.now() 因为会即刻调用
    // 这里直接给了一个方法：Date.now
    // 当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会
    // 调用 default 指定的Date.now 方法，使用其返回值作为默认值
    default: Date.now
  },
  last_modified_time: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    default: "/public/img/avatar-default.png"
  },
  bio: {
    type: String,
    default: ""
  },
  gender: {
    type: Number,
    enum: [-1, 0, 1],
    default: -1
  },
  birthday: {
    type: Date
  },
  status: {
    type: Number,
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    enum: [0, 1, 2],
    default: 0
  }
});

// 3. 将文档结构发布为模型
//    mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//
//    返回值：模型构造函数
var User = mongoose.model("User", UserSchema);

// 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据
// 为所欲为了（增删改查）

// **********************
// #region /新增数据
// **********************
// var admin = new User({
//     nickname: 'lam456',
//     password: '123456',
//     email: '513256@qq.com'
// })

// admin.save(function(err, res) {
//     if (err) {
//         console.log('save failure')
//     } else {
//         console.log('save success')
//         console.log(res)
//     }
// })

// **********************
// #endregion /新增数据
// **********************

// **********************
// #region /查询数据
// **********************
// User.find(function(err, data) {
//     if (err) {
//         console.log('查询失败')
//     } else {
//         console.log(data)
//     }
// })

// 数组套对象
// User.find({ nickname: "kan" }, function(err, data) {
//   if (err) {
//     console.log("查询失败2");
//   } else {
//     console.log(data);
//   }
// });

// 对象
// User.findOne({nickname:'lam'},function(err,data){
//  if (err) {
//      console.log('查询失败2')
//  }else{
//      console.log(data)
//  }
// })

// **********************
// #endregion /查询数据
// **********************

// **********************
// #region /删除数据
// **********************
// User.deleteOne({ nickname: 'lam' }, function(err, data) {
//     if (err) {
//         console.log('删除失败')
//     } else {
//         console.log('删除成功')
//         console.log(data)
//     }
// })

// User.findOneAndDelete({ _id: "5d02075f13ee4705b8abc83d" }, function(err, data) {
//   if (err) {
//     console.log("删除失败");
//   } else {
//     console.log("删除成功");
//     console.log(data);
//   }
// });

// User.findByIdAndDelete("5d4c3ade6435611ad049c745", function(err, data) {
//   if (err) {
//     console.log("删除失败");
//   } else {
//     console.log("删除成功");
//     console.log(data);
//   }
// });

// **********************
// #endregion /删除数据
// **********************

// **********************
// #region /更新数据
// **********************
// User.findByIdAndUpdate(
//   "5d0b47d42385c42674224a30",
//   {
//     nickname: "admin1"
//   },
//   function(err, data) {
//     if (err) {
//       console.log("更新失败");
//     } else {
//       console.log("更新成功");
//       //   console.log(data);
//     }
//   }
// );

User.findOneAndUpdate(
  { _id: "5d0b48292385c42674224a32" },
  {
    email: "admin3@lam.com"
  },
  function(err, data) {
    if (err) {
      console.log("更新失败");
    } else {
      console.log("更新成功");
      console.log(data);
    }
  }
);
// **********************
// #endregion /更新数据
// **********************

// User.find(function(err, data) {
//   if (err) {
//     console.log("查询失败");
//   } else {
//     console.log(data);
//   }
// });
