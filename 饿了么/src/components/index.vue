<template>
	<div>
		<div id="nav">
			<p><router-link to="/index">首页</router-link></p>
			<p><router-link to="/order">订单</router-link></p>
			<p><router-link to="/us">我的</router-link></p>
		</div>
		<div class="index">
			<router-link to="/search">
				<!--input框-->
				<header>
					<input type="text" placeholder="搜索饿了么商家、商品名称" />
				</header>
			</router-link>
		</div>
		<div id="con">
			<figure v-for="items in msgs" >
				<router-link :to="{path:'/food/'+items.id}" >
					<img :src="items.imgUrl"/>
					<figcaption>{{items.til}}</figcaption>
				</router-link>
			</figure>
		</div>
		<section id="rush">
			<div>
				<ul>
					<li>
						<h3>品质套餐</h3>
					</li>
					<li>搭配齐全吃得好</li>
					<li>
						<a>立即抢购 ></a>
					</li>
				</ul>
				<p>
					<img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/"/>
				</p>
			</div>
		</section>
		
		<section id="vip">
			<div id="vip-1">
				<img src="https://fuss10.elemecdn.com/8/0e/4dd212d831becab6e3ebd484c0941jpeg.jpeg?imageMogr/format/webp/thumbnail/34x/"/>
				<span>超级会员</span> ·
				<span>每月领20元红包</span>
			</div>
			<a>立即开通></a>
		</section>
		
		<div class="banner">
			<swiper :options="swiperOption" ref="mySwiper">
				<swiper-slide>
					<img src="https://fuss10.elemecdn.com/1/9c/d8da44b63fa1208476992df88edc9jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/" class="index_img">
				</swiper-slide>
				<swiper-slide>
					<img src="https://fuss10.elemecdn.com/4/48/37fce9a4ffbec79293357f68ecfcbjpeg.jpeg?imageMogr/format/webp/thumbnail/568x/" class="index_img">
				</swiper-slide>
				<swiper-slide>
					<img src="https://fuss10.elemecdn.com/8/19/d644c8673b60fe800b71b56be7f19jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/" class="index_img">
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<script>
	import axios from "axios"
	import Swiper from 'swiper';
	export default {
		data () {
	  		return {
	  			imgIndex: 1,
		      	swiperOption: {
		        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
		        notNextTick: true,
		        //循环
		        loop: true,
		        //设定初始化时slide的索引
		        initialSlide: 0,
		        //自动播放
		        autoplay: {
			        delay: 1500,
			        stopOnLastSlide: false,
			        /* 触摸滑动后是否继续轮播 */
			        disableOnInteraction: false
		        },
		        //滑动速度
		        speed: 800,
		        //滑动方向
		        direction: "horizontal",
		        //小手掌抓取滑动
		        grabCursor: true,
		        on: {
			            //滑动之后回调函数
			          	slideChangeTransitionStart: function() {
			            /* realIndex为滚动到当前的slide索引值 */
			            this.imgIndex= this.realIndex - 1;
		          	},
		        },
		        //分页器设置
			        pagination: {
			          el: ".swiper-pagination",
			          clickable: true,
			          type: "bullets"
			        }	
		      	},
		      	msgs:"",
				get:axios.get("http://localhost:3000/getNav").then((res)=>{
					console.log(res.data);
					this.msgs=res.data;
				})
	  		}
	  	}
	}
</script>

<style>
	header {
		width: 100%;
		padding: 15px 0;
		background: #0094FF;
	}
	li{list-style: none;}
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
	.index input {
		width: 75%;
		text-align: center;
		display: block;
		height: 35px;
		font-size: 16px;
		margin: auto;
		border: none;
	}
	#con {
		width: 100%;
		padding: 20px 0;
		display: flex;
		flex-wrap: wrap;
	}
	#con a{
		display: block;
	}
	#con figure {
		width: 20%;
		font-size: 16px;
		text-align: center;
	}
	
	#con figure a img {
		width: 80%;
	}
	#con figcaption{
		color: #666666;
		font-size: 13px;
	}
	#rush{
		width: 100%;
	}
	#rush div{
		margin: auto;
		width: 95%;
		display: flex;
		background: #F7F7F7;
	}
	#rush ul{
		width: 50%;
		line-height: 1.7;
		padding: 10px 15px;
	}
	#rush img{
		width: 70%;
		padding-left: 20%;
	}
	#rush ul li:nth-of-type(2){
		color: #cdcdcd;
	}
	#rush ul li:nth-of-type(3){
		color: #AF8260;
	}
	#rush ul li:nth-of-type(2),#rush ul li:nth-of-type(3){
		font-size: 14px;
	}
	.banner{
    	width: 95%;
    	margin: auto;
	}
	.banner img{
		display: block;
		width: 100%;
		height: auto;
	
	}
	#vip{
		width: 95%;
		margin: auto;
		color: #644f1b;
		display: flex;
		justify-content: space-around;
		background: #F6E1A9;
		padding: 10px 0;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	#vip-1 img{
		width: 9%;
		vertical-align: middle;
	}
	#vip-1 span:first-of-type{
		font-size: 14px;
		font-weight: 700;
	}
	#vip-1 span:last-of-type{
		font-size: 12px;
	}
	#vip a{
		font-size: 12px;
		padding-top: 4px;
	}
</style>