<template>
	<div>
		<div class="search">
			<router-link to="/index" id="fan" ><</router-link>
			<input type="text" placeholder="搜索饿了么商家、商品名称" v-model="search" />
			<section id="navs">
				<figure v-for="(items,index) in searchData" v-bind:key="index">
					<figcaption v-for="value in items.some">{{value.name}}</figcaption>
				</figure>
			</section>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	export default {
		data(){
			return {
				search:"",
				msgs:"",
				get:axios.get("http://localhost:3000/addget").then((res)=>{
					console.log(res.data);
					this.msgs=res.data;
				})
			}
		},
		computed:{
			searchData(){
				if(this.search){
					//数组过滤方法，true false
					let resultsArr=this.msgs.filter((items)=>{
						if(items.name.indexOf(this.search)!=-1){
							return true;
						}else{
							return false;
						}
					})
					return resultsArr;
				}else{
					return [];
				}
			}
		}
	}
</script>

<style>
	#navs figure {
		font-size: 26px;
		text-align: center;
	}
	
	#fan {
		font-size: 80px;
		position: absolute;
		top: 0;
	}
	.search{
		width: 100%;
	}
	.search #fan{
		font-size: 36px;
	}
	.search input {
		display: block;
		margin-top: 15px;
		width: 70%;
		height: 50px;
		font-size: 20px;
		text-align: center;
		margin: auto;
	}
</style>