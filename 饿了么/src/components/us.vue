<template>
	<div id="cons">
		<div id="nav">
			<p><router-link to="/index">首页</router-link></p>
			<p><router-link to="/order">订单</router-link></p>
			<p><router-link to="/us">我的</router-link></p>
		</div>
		<div class="us">
			<div id="us1" v-for="items in data">
				<router-link to="/register">{{items.reg}}</router-link> 
				<router-link to="/login">{{items.log}}</router-link>
				<p>{{items.p}}</p>
				<span>{{items.name}}</span><br />
				<span @click="cancel(items.id)">{{items.name1}}</span> <span @click="logout">{{items.name2}}</span>
			</div>
		</div>
		<section id="packed">
			<a>
				<p>
					<span>0</span>
					<span>个</span>
				</p>
				<p>红包</p>
			</a>
			<a>
				<p>
					<span>0</span>
					<span>个</span>
				</p>
				<p>金币</p>
			</a>
		</section>
		<section id="adress">
			<div>
				我的地址
				<span>></span>
			</div>
		</section>
	</div>
</template>

<script>
	import Axios from "axios";
	
	var arrs=[{
		reg:"注册",
		log:"登录",
		p:"登陆后享受更多特权"
	}]
	export default {
		data(){
			return {
				data:arrs
			}
		},
		methods:{
			logout(){
				localStorage.arr=""
				this.data=arrs;
			},
			cancel(id){
				let params=new URLSearchParams();
				params.append("id",id)
				Axios.post("http://localhost:3000/cancel",params).then(res=>{
					console.log(res);
					if(res.data.success=="注销成功"){
						localStorage.arr=""
						this.data=arrs;
					}
				})
			}
		},
		mounted(){
			if(localStorage.arr){
				this.data=JSON.parse(localStorage.arr)
				console.log(this.data.id)
				this.data=[{
						name:this.data.phone,
						name1:"注销",
						name2:"退出登录",
						id:this.data.id
					}]
			}
		}
	}
	
</script>

<style>
	#cons{
		background: #EFEFEF;
	}
	#nav {
		width: 100%;
		display: flex;
		position: fixed;
		bottom: 0;
		border-top: solid 1px #EFEFEF;
	}

	#nav p {
		width: 34%;
		text-align: center;
		padding: 15px 0;
		font-size: 20px;
	}
	
	#nav p a {
		color: #A8A8AC;
	}
	.us{
		width: 100%;
	}
	.us a{
		color: white;
		font-size: 20px;
	}
	#us1{
		color: white;
		padding: 20px 50px;
		background: #0094FF;
	}
	.us1 p{
		font-size: 14px;
	}
	#packed{
		width: 100%;
		display: flex;
		background: #fff;
	}
	#packed a{
		display: block;
		width: 50%;
		padding: 35px 0;
		text-align: center;
	}
	#packed a:first-child{
		border-right: solid 1px #EFEFEF;
	}
	#packed a:first-child span:first-child{
		font-size: 28px;
		font-weight: 700;
	}
	#packed a:first-child span{
		color: red;
	}
	#packed a:last-child span:first-child{
		font-size: 28px;
		font-weight: 700;
	}
	#packed a:last-child span{
		color: green;
	}
	#adress{
		background: #fff;
		margin-top: 10px;
		width: 100%;
	}
	#adress div{
		padding: 10px;
		overflow: hidden;
	}
	#adress div span{
		color: #bbb;
		float: right;
		text-align: right;
	}
</style>