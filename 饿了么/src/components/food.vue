<template>
	<div class="meishi">
		<router-link to="/index" id="head" ><</router-link>
		<figure v-for="(items,index) in msgs" v-bind:key="index">
			<router-link :to="{path:'/details/'+items.id}" >
				<p><img v-bind:src="items.imgUrl"/></p>
				<ul>
					<li>{{items.name}}</li>
					<li>
						<span>{{items.price}}</span>
						<span>{{items.juli}}</span>
					</li>
					<li><span>减</span>{{items.jian}}</li>
					<li><span>热</span>{{items.te}}</li>
				</ul>
			</router-link>
		</figure>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data(){
			return {
				msgs:"",
				get:axios.get("http://localhost:3000/getNav").then((res)=>{
					for(var i=0;i<res.data.length;i++){
						if(res.data[i].id==this.$route.params.id){
							this.msgs=res.data[i].some
						}
					}
				})
			}
		}
	}
</script>

<style>
	li{list-style: none;}
	.meishi {
		width: 100%;
	}
	
	.meishi a {
		display: flex;
		vertical-align: middle;
	}
	
	.meishi figure p {
		width: 30%;
	}
	
	.meishi figure p img {
		width: 70%;
		padding: 26px;
	}
	
	.meishi ul{
		padding-top: 20px;
		color: #000;
	}
	.meishi ul li:first-of-type{
		font-size: 15px;
		font-weight: 700;
	}
	.meishi ul li{
		font-size: 12px;
		line-height: 2;
	}
	.meishi ul li:nth-of-type(2) span:first-of-type{
		padding-right: 35px;
	}
	.meishi ul li:nth-of-type(3) span{
		background: red;
		color: white;
		margin-right: 5px;
	}
	.meishi ul li:nth-of-type(4) span{
		background: orange;
		color: white;
		margin-right: 5px;
	}
	#head {
		width: 100%;
		background: #0094FF;
		padding: 15px 0;
		font-size: 25px;
		color: white;
	}

</style>