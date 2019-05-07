// 管理员功能的控制
var adminController = {};
var itemModel = require('../models/itemModel.js');
var textModel = require('../models/textModel.js');
var adminModel = require('../models/adminModel.js');
var loginController = require('../contorllers/loginController.js')
adminController.index = function(req,res){
	
	loginDo(req,res)
    res.render('admin/index')
}
adminController.itemAdd = function(req,res){
	
	loginDo(req,res)
    res.render('admin/itemAdd')
}
// 添加项目名称
adminController.itmeInsert = function(req,res){
	
	loginDo(req,res)
    itemModel.create(req.body,function(err){
		if(err){
			res.send('插入数据失败');
		}else{
			res.redirect('/admin/itemList');
		}
	})
}
// 栏目列表
adminController.itemList = function(req,res){
	
	loginDo(req,res)
	var pageSize = 8;
	var page = req.query.page?req.query.page:1;
	itemModel.find({}).count(function(err,total){
		if(err){
			res.send('查询数量失败')
		}else{
			var maxPage = Math.ceil(total/pageSize);
			if(page<1) page = 1;
			if(page>maxPage) page = maxPage;
			var offsetPage =  pageSize * (page-1);
			itemModel.find({}).sort({order:1}).limit(pageSize).skip(offsetPage).exec(function(err,item){
				if(err){
					res.send('查询数据失败')
				}else{
					res.render('admin/itemList',{items:item,maxPage:maxPage,page:page})
				}
			})
		}
	})
	
}
// 栏目信息修改
adminController.itemEdit = function(req,res){
	
	loginDo(req,res)
	itemModel.findOne({_id:req.params._id},function(err,data){
		if(err){
			res.send('数据查询失败')
		}else{
			res.render('admin/itemEdit',{datas:data})
		}
	})
}
adminController.itemFind = function(req,res){
	
	loginDo(req,res)
	itemModel.update({_id:req.body._id},req.body,function(err,data){
		if(err){
			res.send('数据更新失败')
		}else{
			res.redirect('/admin/itemList')
		}
	})
}
// 删除栏目信息
adminController.itemRemove = function(req,res){
	
	loginDo(req,res)
	itemModel.remove({_id:req.params._id},function(err){
		if(err){
			res.send('删除数据失败')
		}else{
			res.redirect('/admin/itemList')
		}
	})
}
// 文章添加
adminController.textAdd = function(req,res){
	
	loginDo(req,res)
	itemModel.find({}).sort({order:1}).exec(function(err,item){
		if(err){
			res.send('查询数据失败')
		}else{
			res.render('admin/textAdd',{items:item})
		}
	})
	
}
adminController.textInsert = function(req,res){
	
	loginDo(req,res)
	// 引入图片上传
	var uploadImage = require('../configs/uploadImage_config.js');
	// 图片存放的位置
	var imagePath = 'uploads';
	// 允许接收图片的类型
	var imageType = ['image/jpeg','image/png'];
	// 图片的大小
	var fileSize = 1024*1024*5;
	// 上传图片
	var upload = uploadImage(imagePath,imageType,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 把接收到的图片路径存到 关联的数据
			req.body.imgurl = req.file.filename;
			// 添加数据
			textModel.create(req.body,function(err){
				if(err){
					res.send('发布文章失败');
				}else{
					res.redirect('/admin/textList');
				}
			})
		}
	})
}
// 文章列表
adminController.textList =function(req,res){
	
	loginDo(req,res)
	var pageSize = 4;
	// 页面
	var page = req.query.page?req.query.page:1;
	// 数据总的条数
	textModel.find({}).count(function(err,total){
		if(err){
			res.send('查收数据失败');
		}else{
			// 最大的页码  
			var pageMax = Math.ceil(total/pageSize);
			// 处理 页面 边界
			if(page<1) page = 1;
			if(page>pageMax) page = pageMax;
			//查询 的偏移量
			var offsetPage = pageSize * (page-1);
			// 查询文章数据
			textModel.find({}).limit(pageSize).skip(offsetPage).populate('itemId',{name:1}).exec(function(err,data){
				if(err){
					res.send('查收数据失败');
				}else{
					// 响应模板
					res.render('admin/textList',{datas:data,pageMax:pageMax,page:page});
				}
			})
		}
	})
}
adminController.textEdit = function(req,res){
	
	loginDo(req,res)
	itemModel.find({},function(err,item){
		if(err){
			res.send('数据查询失败')
		}else{
			textModel.findOne({_id:req.params._id},function(err,data){
				if(err){
					res.send('数据查询失败')
				}else{
					res.render('admin/textEdit',{items:item,datas:data})
				}
			})
		}
	})
	
}
// 封面修改
adminController.textImgEidt = function(req,res){
	
	loginDo(req,res)
	// 引入图片上传
	var uploadImage = require('../configs/uploadImage_config.js');

	// 图片存放的位置
	var imagePath = 'uploads';
	// 允许接收图片的类型
	var imageType = ['image/jpeg','image/png'];
	// 图片的大小
	var fileSize = 1024*1024*5;

	// 上传图片
	var upload = uploadImage(imagePath,imageType,fileSize).single('imgurl');
	upload(req,res,function(err){
		if(err){
			res.send('图片上传失败');
		}else{
			// 更新文章封面
			textModel.update({_id:req.body._id},{$set:{imgurl:req.file.filename}},function(err){
				if(err){
					res.send('更新封面数据失败');
				}else{
					res.redirect('/admin/textList');
				}
			})
		}
	})		
}
// 文章内容修改
adminController.textContentEidt = function(req,res){
	
	loginDo(req,res)
	textModel.update({_id:req.body._id},{$set:req.body},function(err){
		if(err){
			res.send('更新栏目数据失败');
		}else{
			res.redirect('/admin/textList');
		}
	})
}
// 删除文章
adminController.textRemove = function(req,res){
	
	loginDo(req,res)
	textModel.remove({_id:req.params._id},function(err){
		if(err){
			res.send('删除数据失败');
		}else{
			res.redirect('/admin/textList');
		}
	})
}
// 添加管理员页面
adminController.adminAdd = function(req,res){
	
	loginDo(req,res)
	res.render('admin/adminAdd')
}
adminController.adminInsert = function(req,res){
	
	loginDo(req,res)
	// 获取用户输入的验证码
	var userCode = req.body.code;
	// 获取存在 session 里的验证码
	var sessionCode = req.session.code;
	console.log(userCode)
	console.log(req.session.code)
	// 判断验证码
	if(userCode != sessionCode){
		res.send('验证码不正确');
		return;
	}
	// 判断两次输入的密码是否一致
	if(req.body.password != req.body.reqpassword){
		res.send('两次输入的密码不一样');
		return;
	}

	// 取消用户名 两端的空白字符、
	req.body.name = req.body.name.trim();
	req.body.password = req.body.password.trim();


	// 引入 md5(加密) 模块
	var md5 = require('md5');

	// 对密码进行加密
	req.body.password = md5(req.body.password);
	adminModel.create(req.body,function(err,data){
		if(err){
			res.send('数据存储失败')
		}else{
			res.send('添加管理员成功')
		}
	})

}
// 登录
adminController.login = function(req,res){
	res.render('admin/login')
}
adminController.dologin = function(req,res){
	var md5 = require('md5');
	// 接收 账户 和密码 处理
	var name = req.body.name.trim();
	var password = md5(req.body.password);

	adminModel.findOne({name:name},function(err,data){
		if(err){
			res.send('登录失败');
		}else{
			if(data==null){
				res.send('用户名不存在');

			}else{
				if(password == data.password){
					// 用户登录成功
					// 把用户信息 存储到 session 里
					req.session.user = 	data;
					// res.send('ok');
					res.redirect('/admin');
				}else{
					// 密码不正确
					res.send('密码不正确');
				}
			}
		}
	})
}
adminController.nosign = function(req,res){
	res.send('注册功能不对外开放')
}

// 验证码
adminController.code = function(req,res){
	// 引入验证码模块
	var captchapng = require('captchapng');
	// 验证码的内容
	var code = parseInt(Math.random()*9000+1000);
	// 把 验证码 内容存 到 session 里
	req.session.code = code;
	// width,height,numeric captcha
    var p = new captchapng(80,30,code); 
    // First color: background (red, green, blue, alpha)
    p.color(0, 0, 0, 0);  
    // Second color: paint (red, green, blue, alpha)
    p.color(80, 80, 80, 255); 
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.send(imgbase64);
}
// 退出登录
adminController.exit = function(req,res){
		// 清空 session 里的 user 信息
		req.session.user = null;
		// 跳转到登录页面
		res.redirect('/admin/login');
}
// 登录函数
loginDo = function(req,res){
	if(!req.session.user) res.redirect('/admin/login');
}
// 暴露控制器
module.exports = adminController;