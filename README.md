#简介#
可以指定某个文件夹下面的js文件为路由处理，类似Java中的controller。
#安装#
支持express4.x版本

npm install express-mapping
#使用#

	var express = require('express');
	var router = require('express-mapping');

	var app=express();
	app.use(router('lib/controller'));
路径相对于项目根路径
#router代码#
例如controller下的vo.js

	module.exports = {
		mapping:'/vo',
	    get: {       
	        '/': function (req, res) {
	           //todo				
	        },       
	        '/inbox': function (req, res) {
	           //todo				
	        }
	    },
	    post: {        
	        '/add': function (req, res) {
	           //todo				
	        }
	    },
		delete: {        
	        '/delete': function (req, res) {
	           //todo				
	        }
	    },
		put: {        
	        '/update': function (req, res) {
	           //todo				
	        }
	    }
	};
将会生成五个url分别为：

- /vo/       GET请求
- /vo/inbox  GET请求
- /vo/add    POST请求
- /vo/delete DELETE请求
- /vo/update PUT请求

mapping参数可选，可以要可以不要
