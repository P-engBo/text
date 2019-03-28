<template>
	<div>
		<div id="nav">
			<p><router-link to="/index">首页</router-link></p>
			<p><router-link to="/order">订单</router-link></p>
			<p><router-link to="/us">我的</router-link></p>
		</div>
		<div class="order">
			<div v-for="item in menulist">
				<figure>
					<img :src="item.imgUrl"/>
					<figcaption><span>&yen;{{item.xiaoji}}</span>
						<button @click="add(item.id)">+</button>
						<span>{{item.num}}</span>
						<button @click="subtract(item.id)">-</button>
						<span @click="del(item.id)">删除</span></figcaption>
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data(){
			return {
				menulist:[]
			}
		},
		methods:{
			del(id){
				let params=new URLSearchParams();
				params.append("id",id);
				axios.post("http://localhost:3000/delShop",params).then(res=>{
					for (var i = 0; i < this.menulist.length; i++) {
						if (this.menulist[i].id==id) {
							this.menulist.splice(i,1)
						} 
					}
				})
			},
			add(id){
				let params=new URLSearchParams();
				params.append("id",id);
				axios.post("http://localhost:3000/addShop",params).then(res=>{
					console.log(res);
					this.huoqu()
				})
			},
			subtract(id){
				let params=new URLSearchParams();
				params.append("id",id);
				axios.post("http://localhost:3000/subtractShop",params).then(res=>{
					console.log(res);
					this.huoqu()
				})
			},
			huoqu(){
				get:axios.get("http://localhost:3000/getNav").then((res)=>{
					this.menulist =[]
					for(var i=0;i<res.data.length;i++){
						for (var j = 0; j < res.data[i].some.length; j++) {
							if(res.data[i].some[j].num>=1){
								res.data[i].some[j].xiaoji=res.data[i].some[j].price*res.data[i].some[j].num;
								this.menulist.push(res.data[i].some[j]);
							}
						}
					}
				})
			}
		},
		mounted(){
			this.huoqu()
		}
	}
</script>

<style>
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
	.order{
		padding: 15px 20px;
	}
	.order figure {
		width: 100%;
		display: flex;
		line-height: 4;
		font-size: 20px;
	}
	
	.order figure img {
		width: 25%;
		height: 30%;
	}
	
	.order figure figcaption{
		width: 75%;
	}
	
	.order figure figcaption span:last-child {
		color: red;
		display: block;
		float: right;
	}
	.order figure figcaption span:first-child{
		padding-left: 18px;
		padding-right: 10%;
	}
	.order figure figcaption button{
		width: 20px;
		height: 20px;
	}
</style>