<template>
	<div class="login">
		<p>登录</p>
		<label>用户名:<input type="text" v-model="phone" /></label><br />
		<label>密&nbsp;&nbsp;&nbsp;码:<input type="text" v-model="pwd" /></label><br />
		<button @click="login(phone,pwd)">登录</button>
	</div>
</template>

<script>
	import Axios from "axios";
	export default{
		data(){
			return {
				phone:"",
				pwd:""
			}
		},
		methods:{
			login(phone,pwd){
				let params=new URLSearchParams();
				params.append("phone",phone);
				params.append("pwd",pwd);
				
				//传用户和密码
				Axios.post("http://localhost:3000/login",params).then(res=>{
					console.log(res);
					alert(res.data.success);
					//将token放进浏览器缓存中，相当于咱们前端的小数据库
					localStorage.setItem("token",res.data.token);
					//将id抓到，放到localStorage
					localStorage.setItem("id",res.data.id);
					localStorage.setItem("arr",JSON.stringify(res.data.arr));
					if(res.data.success=="登录成功"){
						this.$router.push({path:"/us"})
					}
				})
			}
		}
	}
</script>

<style>
	.login{
		width: 100%;
		font-size: 20px;
		line-height: 5;
	}
	
	.login p{
		width: 100%;
		text-align: center;
		background: #0094FF;
	}
	
	.login label{
		padding: 15px;
	}
	
	.login input {
		width: 52%;
		text-align: center;
		font-size: 20px;
		height: 46px;
	}
	.login button{
		width: 80px;
		height: 50px;
		font-size: 20px;
		display: block;
		margin: auto;
	}
</style>