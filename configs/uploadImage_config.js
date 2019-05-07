// 图片上传的 配置模块

// 格式化时间
const timestamp = require('time-stamp');
// 获取 唯一数
var uid = require('uid');
// 引入文件上传模块
var multer  = require('multer');
var path = require('path');


/**
* 功能: 利用 multer 模块 接收 图片
* 参数:
* 	imagePath	-String  - 保存图片的路径
*	imageType	-Array   - 允许接收图片的类型  例：['image/jpeg','image/png','image/gif']
*	fileSize    -Number  - 允许图片的最大大小  单位：字节
* 返回值: 
*	upload 		-Object  - multer 提供的对象
* 作者： 孙悟空
* 时间：2019-03-15
* 版本：1.0.0
* 邮箱:dfsfs
*/ 
function uploadImage(imagePath,imageType,fileSize){

	// 文件上传的配置
	var storage = multer.diskStorage({
		// 接收文件的路径
		destination: function (req, file, cb) {
			cb(null, imagePath)
		},
		filename: function (req, file, cb) {
			var extname = path.extname(file.originalname);
			// 文件重新名字
			cb(null, timestamp('YYYYMMDD')+'_'+uid()+extname);
		}
	})

	// 过滤函数
	function fileFilter (req, file, cb) {
		// 判断用户上传的图片 是不是我们要的
		if(imageType.indexOf(file.mimetype)==-1){
			// 拒绝这个文件
			cb(null, false)
			cb(new Error('请上传 jpeg ping 和 gif 格式的图片'))
		}else{
			// 接受这个文件
			cb(null, true)
		}
	}

	// 配置 文件上传参数
	var upload = multer({
		// 基本的配置
		storage: storage,
		// 过滤函数
		fileFilter:fileFilter,
		// 过滤文件大小
		limits:{
			fileSize:  fileSize // 单位： 字节
		}
	})


	return upload;
}

// 暴露 接收图片的函数
module.exports = uploadImage;