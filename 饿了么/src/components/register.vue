<template>
	<div class="reg">
		<p>注册</p>
		<label>用&nbsp;&nbsp;户&nbsp;&nbsp;名：<input type="text" v-model="phone" /></label><br />
		<label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<input type="text" v-model="pwd" /></label><br />
		<label>确认密码：<input type="text" v-model="repwd" /></label><br />
		<button @click="confirm(phone,pwd,repwd)">确认提交</button>
	</div>	
</template>

<script>
	import Axios from "axios";
	export default{
		data(){
			return {
				phone:"",
				pwd:"",
				repwd:""
			}
		},
		methods:{
			confirm(phone,pwd,repwd){
				let params=new URLSearchParams();
				params.append("phone",phone);
				params.append("pwd",pwd);
				params.append("repwd",repwd);
				params.append("token",localStorage.getItem("token"));
				Axios.post("http://localhost:3000/reg",params).then(res=>{
					console.log(res);
					if(res.data.success=="注册成功"){
//						this.$router.push({path:"/login"})
					}
				})
			}
		}
	}
</script>

<style>
	.reg{
		width: 100%;
		font-size: 20px;
		line-height: 5;
	}
	
	.reg p{
		width: 100%;
		text-align: center;
		background: #0094FF;
	}
	
	.reg label{
		padding: 15px;
	}
	
	.reg input{
		width: 52%;
		text-align: center;
		font-size: 20px;
		height: 46px;
	}
	.reg button{
		width: 90px;
		height: 50px;
		font-size: 20px;
		display: block;
		margin: auto;
	}
</style>