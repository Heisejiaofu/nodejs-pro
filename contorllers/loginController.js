// 后台登录的控制
var loginController = {};

loginController.loginDo = function(req,res){
    if(!req.session.user) res.redirect('/admin/login');
	// 响应模板
	res.render('admin/index');
}
// 暴露控制器
module.exports = loginController;