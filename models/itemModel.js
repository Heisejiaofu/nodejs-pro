// 栏目的数据模型
// 引入 数据库配置 模块
var mongoose = require('../configs/db_config.js');

// 2. 定义 集合的骨架 （用来约束 集合的）
const itmeSchema = new mongoose.Schema({
	name: String,   // 栏目名称
	info: String,   // 栏目简介
	order: Number,  // 排序
	ctime: {
		type:Date,
		default: new Date()
	}
});

// 3. 创建数据模型
var itemModel = mongoose.model('item',itmeSchema);

// 暴露栏目数据模型
module.exports = itemModel;