<template>
	<div>
		<router-view></router-view>
		<v-header title="好吃首页"></v-header>
		<div class="hoho">
		</div>
		<!-- <slider class="eat-home-slide">
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
			<li>5</li>
		</slider> -->

		<div class="mark-list">
			<ul :style="{maxHeight: (isTakeUp ? '0.6rem' : '100%'), maxWidth: (isTakeUp ? 'calc(100% - 1.6rem)' : '100%')}">
				<li v-for="(item, index) in markList" :key="index" :class="{'active-mark' : activeIndex === index}" @click="markListClickHandle(index)">{{item.name}}</li>
			</ul>
			<p class="more-list-btn" @click="isTakeUp = !isTakeUp" v-show="isTakeUp">
				更多标签↓
			</p>
			<p class="take-up-btn" @click="isTakeUp = !isTakeUp" v-show="!isTakeUp">
				收起标签↑
			</p>
		</div>

		<div class="shop-list">
			<div class="shop-item">
				<div class="left-shop-img" :style="{ background: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg) no-repeat', backgroundSize: 'cover'}">
				</div>
				<div class="right-shop-detail">
					<p class="shop-name">香辣馆</p>
					<div class="star-line">
						<div class="star"></div>
						<p class="kilo-meters">12668.39km</p>
					</div>
					<p class="shop-address">
						40 rue alexandre dumas 75011 paris pre st Grevey
					</p>
					<p class="shop-mark">川湘菜系，烧烤</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import RatingStar from 'components/ratingStar/ratingStar'
import Slider from 'components/slider/slider'

export default {
	data () {
			return {
				markList: [
					{
						id: 1,
						name: '川湘菜系1'
					},
					{
						id: 2,
						name: '烧烤1'
					},
					{
						id: 3,
						name: '粉面粥1'
					},
					{
						id: 4,
						name: '川湘菜系2'
					},
					{
						id: 5,
						name: '烧烤2'
					},
					{
						id: 6,
						name: '粉面粥2'
					},
					{
						id: 7,
						name: '川湘菜系3'
					},
					{
						id: 8,
						name: '烧烤3'
					},
					{
						id: 9,
						name: '粉面粥3'
					}
				],
				isTakeUp: true, // 是否收起标签页
				activeIndex: -1 // active状态的标签的下标，默认没有任何标签初始为active状态
			}
    },
    mounted () {
        console.log('首页')
    },
    components: {
        VHeader,
        Slider,
        RatingStar
    },
    computed: {
	
    },
    methods: {
			markListClickHandle (currentIndex) {
				if (this.activeIndex === currentIndex) {
					this.activeIndex = -1
				} else {
					this.activeIndex = currentIndex
				}
			}
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
	.eat-home-slide {
		width: 100%;
		overflow: hidden;
	}
	.mark-list{
		color: #595959;
		font-size: 14px;
		background: #fafafa;
		overflow: hidden;
		position: relative;
		li {
			display: inline-block;
			padding: 0 0.1rem;
			height: 0.4rem;
			line-height: 0.4rem;
			border: 1px solid #8f8f8f;
			margin: 0 0 0.16rem 0.12rem;
			&.active-mark{
				background: red;
				border-color: red;
				color: #fff;
			}
		}
		ul {
			padding: 0.16rem 0 0 0.1rem;
		}
		.take-up-btn{
			text-align: center;
			height: 0.38rem;
			line-height: 0.38rem;
			margin-bottom: 0.16rem;
			cursor: pointer;
		}
		.more-list-btn{
			position: absolute;
			top: 0.25rem;
			left: auto;
			right: 0.3rem;
		}
	}
	.shop-list{
		background: #fafafa;
		.shop-item{
			padding: 0.3rem 0.26rem;
			overflow: hidden;
			margin-bottom: 0.16rem;
			color: #000;
			font-size: 14px;
			background: #fff;
			.left-shop-img{
				float: left;
				width: 1.38rem;
				height: 1.38rem;
				border-radius: 5px;
			}
			.right-shop-detail{
				width: calc(100% - 1.38rem - 0.18rem);
				float: left;
				margin-left: 0.18rem;
				.shop-name{
					font-size: 16px;
					height: 0.44rem;
					line-height: 0.44rem;
					margin-bottom: 0.16rem;
				}
				.star-line{
					height: 0.22rem;
					line-height: 0.22rem;
					margin-bottom: 0.12rem;
					overflow: hidden;
					.kilo-meters{
						float: right;
						color: #f8b72a;
					}
				}
				.shop-address{
					height: 0.28rem;
					line-height: 0.28rem;
					overflow : hidden; 
					text-overflow: ellipsis; 
					display: -webkit-box; 
					-webkit-line-clamp: 1; 
					-webkit-box-orient: vertical; 
					-webkit-line-clamp: 1; 
					margin-bottom: 0.2rem;
				}
			}
		}
	}
</style>
