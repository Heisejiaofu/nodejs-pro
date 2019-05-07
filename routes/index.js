var express = require('express');
var router = express.Router();
var indexController = require('../contorllers/indexController.js')

/* GET home page. */
router.get('/', indexController.index)

// 列表页
router.get('/list/:_id',indexController.list)

// router.get('/list/:_id',function(){
//     console.log('red')
// })


// 详情页
router.get('/reding/:_id',indexController.reding)

module.exports = router;
