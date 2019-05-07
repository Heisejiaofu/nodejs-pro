var express = require('express');
var router = express.Router();
var adminController = require('../contorllers/adminController.js')

/* GET home page. */
router.get('/',adminController.index)
router.get('/itemAdd',adminController.itemAdd)
// 添加项目
router.post('/itmeInsert',adminController.itmeInsert)
router.get('/itemList',adminController.itemList)
// 修改项目信息
router.get('/itemEdit/:_id',adminController.itemEdit)
router.post('/itemFind',adminController.itemFind)
// 删除栏目信息
router.get('/itemRemove/:_id',adminController.itemRemove)
// 文章添加
router.get('/textAdd',adminController.textAdd)
router.post('/textInsert',adminController.textInsert)
// 文章列表
router.get('/textList',adminController.textList)
// 文章信息编辑
router.get('/textEdit/:_id',adminController.textEdit)
// 封面修改
router.post('/textImgEidt',adminController.textImgEidt)
// 文章信息修改
router.post('/textContentEidt',adminController.textContentEidt)
// 删除文章
router.get('/textRemove/:_id',adminController.textRemove)
// 添加管理员
router.get('/adminAdd',adminController.adminAdd)
router.post('/adminInsert',adminController.adminInsert)
// 验证码
router.get('/code',adminController.code)
// 登录
router.get('/login',adminController.login)
router.post('/dologin',adminController.dologin)
router.get('/nosign',adminController.nosign)
// 退出登录

router.get('/noLogin',adminController.exit)
module.exports = router;