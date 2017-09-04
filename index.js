
var express = require('express')
var config = require('./config/config.js')
var route = require('./route/index')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var winston = require('winston')
var expressWinston = require('express-winston')
var sqldb  = require('./mysql/connect')
var bodyParser = require('body-parser')

var app = express();
//var upload = multer({ dest: 'uploads/' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser());
app.use(express.static('./public'));
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/success.log'
        })
    ]
}));
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/error.log'
        })
    ]
}));

app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:7777");
        //res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTIONS");
        //res.header("Access-Control-Allow-Credentials", "true");
        //res.header("X-Powered-By",' 3.2.1');
        //res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });
route(app);
app.get('/test.html',function(req,res){
 // res.header(200,{"Content-Type":"text/html"});
  res.sendFile(__dirname + "/web/test.html" );
});
sqldb.sequelize.sync({force: false}).then(function() {
    console.log("Server successed to start");
}).catch(function(err){
    console.log("Server failed to start due to error: %s", err);
});
// userDetail.create(
// 	{
// 		userName:'laowang',
// 		email:'4545454@qq.com',
// 		sex:'男',
// 		age:'50',
// 		signature:'我住隔壁我叫老王'	
// 	}
// );
// userDetail.findOne({
// 	where:{age:'50'},
// 	limit:10
// }).then((data)=>{
// 	console.log(data.userName,data.signature);
// 	console.log(data.dataValues);
// },(error)=>{ 

// })



var server = app.listen(config.port, () => {
	var host = server.address().address;
	var port = server.address().port;
})
console.log('运行成功！')