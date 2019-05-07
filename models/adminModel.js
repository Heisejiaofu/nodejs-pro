// 管路员的数据模型
// 引入 数据库配置 模块
var mongoose = require('../configs/db_config.js');

const adminSchema = new mongoose.Schema({
	name: String,   	// 账号
	password: String,	// 密码
	tel:Number,			// 电话
	info: String,   	// 栏目简介
	imgurl:String,		// 头像
	ctime: { 			// 添时间加
		type:Date,
		default: new Date()
	}
});

// 创建数据模型
var adminModel = mongoose.model('admin',adminSchema);

// 暴露栏目数据模型
module.exports = adminModel;