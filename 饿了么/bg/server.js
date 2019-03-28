const express=require("express");
const querystring=require("querystring");
const fs=require("fs");
var app=express();
const jwt=require("jsonwebtoken");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /*让options请求快速返回*/
    } else {
      next();
    }
})

app.get("/addget",function(req,res){
	fs.readFile("./assets/data.json",function(err,data){
		res.send(data);
	})
})

app.get("/getJson",function(req,res){
	fs.readFile("../src/assets/data1.json",function(err,data){
		res.send(data);
	})
})

app.get("/getNav",function(req,res){
	fs.readFile("../src/assets/data3.json",function(err,data){
		res.send(data);
	})
})

app.post("/addShop",(req,res)=>{
	//定义一个数据，接收一下前端发送的请求
	let obj=req.body;
	fs.readFile("../src/assets/data3.json",(err,data)=>{
		if(err){
			res.send({err:"数据库读取时候出现问题，请检查后台逻辑业务"})
		}else{
			//将读取到的数据转化为对象
			let arr=JSON.parse(data);
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].some.length; j++) {
					if(arr[i].some[j].id==obj.id){
						arr[i].some[j].num+=1;
						console.log(arr[i].some[j].num)
						let str=JSON.stringify(arr)
						//从新写入json文件
						fs.writeFile("../src/assets/data3.json",str,(err,data)=>{
							if(err){
								res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
							}else{
								res.send({
									success:"加入成功"
								})
							}
						})
					}
				}
			}
		}
	})
})

app.post("/subtractShop",(req,res)=>{
	//定义一个数据，接收一下前端发送的请求
	let obj=req.body;
	fs.readFile("../src/assets/data3.json",(err,data)=>{
		if(err){
			res.send({err:"数据库读取时候出现问题，请检查后台逻辑业务"})
		}else{
			//将读取到的数据转化为对象
			let arr=JSON.parse(data);
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].some.length; j++) {
					if(arr[i].some[j].id==obj.id){
						arr[i].some[j].num=arr[i].some[j].num-1;
						console.log(arr[i].some[j].num)
						let str=JSON.stringify(arr)
						//从新写入json文件
						fs.writeFile("../src/assets/data3.json",str,(err,data)=>{
							if(err){
								res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
							}else{
								res.send({
									success:"加入成功"
								})
							}
						})
					}
				}
			}
		}
	})
})

app.post("/delShop",(req,res)=>{
	//定义一个数据，接收一下前端发送的请求
	let obj=req.body;
	fs.readFile("../src/assets/data3.json",(err,data)=>{
		if(err){
			res.send({err:"数据库读取时候出现问题，请检查后台逻辑业务"})
		}else{
			//将读取到的数据转化为对象
			let arr=JSON.parse(data);
			for (var i = 0; i < arr.length; i++) {
				for (var j = 0; j < arr[i].some.length; j++) {
					if(arr[i].some[j].id==obj.id){
						arr[i].some[j].num=0;
						console.log(arr[i].some[j].num)
						let str=JSON.stringify(arr)
						//从新写入json文件
						fs.writeFile("../src/assets/data3.json",str,(err,data)=>{
							if(err){
								res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
							}else{
								res.send({
									success:"删除成功"
								})
							}
						})
					}
				}
			}
		}
	})
})

let userJson="../src/assets/data2.json"


//注册接口
app.post("/reg",(req,res)=>{
	//定义一个数据，接收一下前端发送的请求
	let obj=req.body;
	//先去密码和确认密码是否一致
	if(req.body.pwd==req.body.repwd){
		//手机号   密码   放入数据库
		//读取数据库
		fs.readFile(userJson,(err,data)=>{
			if(err){
				res.send({err:"数据库读取时候出现问题，请检查后台逻辑业务"})
			}else{
				//将读取到的数据转化为对象
				let arr=JSON.parse(data);
				obj.id=arr.length+1;
//				obj.repwd="";
				delete obj.repwd; //删除键值对
				delete obj.token;
				arr.push(obj)
				//arr变成字符串
				let str=JSON.stringify(arr)
				//从新写入json文件
				fs.writeFile(userJson,str,(err,data)=>{
					if(err){
						res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
					}else{
						res.send({
							success:"注册成功"
						})
					}
				})
			}
		})
	}
})

//token==>payload cert {过期时间}
let payload={
	user:"shao",
	admin:true
}
//自定义加密文件
let cert="今天天气还不错";

//登录的接口
app.post("/login",(req,res)=>{
	//登录  不是注册，
	//去数据库找数据   找到之后，登录成功   读取数据库中的数据
	fs.readFile(userJson,"utf-8",(err,data)=>{
		console.log(data);
		if(err){
			res.send({err:"数据库读取的时候有错误，请检查后台"})
		}else{
			//读取到数据转化为对象
			let arr=JSON.parse(data);
			//遍历数组
			for(let i in arr){
				if(req.body.phone==arr[i].phone&&req.body.pwd==arr[i].pwd){
					var token=jwt.sign(payload,cert,{expiresIn:"6000s"});
					res.send({
						success:"登录成功",
						token:token,
						id:arr[i].id,
						arr:arr[i]
					})
				}
			}
		}
	})
})

//注销
app.post("/cancel",(req,res)=>{
	console.log(req.body);
	let ids=req.body;
	fs.readFile(userJson,"utf-8",(err,data)=>{
		if(err){
			res.send({err:"数据库读取的时候有错误，请检查后台"})
		}else{
			//读取到数据转化为对象
			let arr=JSON.parse(data);
			//遍历数组
			for(let i in arr){
				if(ids.id==arr[i].id){
					arr.splice(i,1);
				}
			}
			//arr变成字符串
			let str=JSON.stringify(arr)
			//从新写入json文件
			fs.writeFile(userJson,str,(err,data)=>{
				if(err){
					res.send({err:"写入数据库的时候出现错误，请检查后台代码"})
				}else{
					res.send({
						success:"注销成功"
					})
				}
			})
		}
	})
})


//验证是否有token
app.use(function jwtVerify(req, res, next) {
    let token = req.body.token;
    // console.log(token) 
    // 先解密
    jwt.verify(token, cert,function(err,decoded){
        // console.log(decoded)
        //登陆过期
        if(err || !decoded){
            res.send({data:null,status:false,msg:err});
        }  
        //如果登录没有过期
        if(decoded.user == payload.user){
            next();
        }
    });
});


app.listen(3000,function(){
    console.log("8080欢迎你")
})