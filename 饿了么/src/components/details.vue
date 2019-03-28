<template>
	<div class="details">
		<figure>
			<img v-bind:src="msgs.imgUrl"/>
			<figcaption><span>{{msgs.name}}</span><span>{{msgs.price}}</span></figcaption>
			<p @click="add(msgs.id)">加入订单</p>
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
						for (var j = 0; j < res.data[i].some.length; j++) {
							if(res.data[i].some[j].id==this.$route.params.id){
								this.msgs=res.data[i].some[j];
							}
						}
					}
//					console.log(this.msgs)
				})
			}
		},
		methods:{
			add(data){
				let params=new URLSearchParams();
				params.append("id",data);
				axios.post("http://localhost:3000/addShop",params).then(res=>{
					console.log(res);
					this.$router.push({path:"/order"})
				})
			}
		}
	}
</script>

<style>
	.details figure {
		width: 100%;
		font-size: 20px;
	}
	
	.details figure img {
		width: 100%;
	}
	
	.details figure figcaption span:first-child {
		font-size: 25px;
		padding-left: 3%;
	}
	
	.details figure figcaption span:last-child {
		color: red;
		float: right;
		padding: 2%;
	}
	
	.details figure p {
		background: #FFC0CB;
		color: white;
		width: 22%;
		padding: 10px;
		margin-top: 10px;
		position: absolute;
		right: 0;
	}
</style>