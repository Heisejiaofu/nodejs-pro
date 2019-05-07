// 前台功能的控制
var indexController = {};
var itemModel = require('../models/itemModel.js');
var textModel = require('../models/textModel.js');
var loginController = require('../contorllers/loginController.js')

indexController.index = function(req,res){
    //
    // 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,items){
		if(err){
			res.send('查询数据失败');
		}else{
            textModel.find({}).limit(5).exec(function(err,data){
                if(err){
                    res.send('查询数据失败')
                }else{
                    textModel.find({}).limit(10).exec(function(err,dataAll){
                        if(err){
                            res.send('查询数据失败')
                        }else{
                            res.render('index',{items:items,datas:data,dataAll:dataAll})
                        }
                    })
                }
            })
			
		}
	})
}
// 列表页
indexController.list = function(req,res){
    var pageSize = 4;
	// 页面
	var page = req.query.page?req.query.page:1;
    // 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,items){
		if(err){
			res.send('查询数据失败');
		}else{
            textModel.find({}).limit(5).exec(function(err,data){
                if(err){
                    res.send('查询数据失败')
                }else{
                    textModel.find({itemId:req.params._id}).count(function(err,total){
                        if(err){
                            res.send('查询失败了')
                        }else{
                             // 最大的页码  
                            var pageMax = Math.ceil(total/pageSize);
                            // 处理 页面 边界
                            if(page<1) page = 1;
                            if(page>pageMax) page = pageMax;
                            //查询 的偏移量
                            var offsetPage = pageSize * (page-1);
                            textModel.find({itemId:req.params._id}).limit(pageSize).skip(offsetPage).exec(function(err,dataAll){
                                if(err){
                                    res.send('查询数据失败')
                                }else{
                                    res.render('list',{items:items,datas:data,dataAll:dataAll,pageMax:pageMax,page:page,Id:req.params._id})
                                }
                            })
                        }
                       
                    })
                    
                }
            })
			
		}
	})
}
// 详情页
indexController.reding = function(req,res){
       console.log(req.params._id)
    // 查询数据
	itemModel.find({}).sort({order:1}).exec(function(err,items){
		if(err){
			res.send('查询数据失败');
		}else{
            textModel.find({}).limit(5).exec(function(err,data){
                if(err){
                    res.send('查询数据失败')
                }else{
                    textModel.find({}).limit(10).exec(function(err,dataAll){
                        if(err){
                            res.send('查询数据失败')
                        }else{
                            textModel.findOne({_id:req.params._id},function(err,contents){
                                res.render('reding',{items:items,datas:data,dataAll:dataAll,contents:contents})
                            })
                            
                        }
                    })
                }
            })
			
		}
	})
    
}
// 暴露控制器
module.exports = indexController;