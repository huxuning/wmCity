<template>
		<div class="shop-list">
			<div class="shop-item" v-for="(item, index) in shopListData" :key="index" @click="linkToDetail(item.id)">
				<div class="left-shop-img">
					<img v-lazy="item.coverPicture" alt="">
				</div>
				<div class="right-shop-detail">
					<p class="shop-name">{{item.name}}</p>
					<div class="star-line">
						<ratingStar :disabled="true" style="display:inline-block"></ratingStar>
						<p class="kilo-meters">{{item.distance}}</p>
					</div>
					<p class="shop-address">
						<i class="icon-dizhi"></i>
						{{item.address}}
					</p>
					<p class="shop-mark">{{item.labelName}}</p>
				</div>
			</div>
		</div>
  
</template>

<script>
	import Scroll from '../scroll/scroll'
	import RatingStar from '../ratingStar/ratingStar'
  export default {
		name: 'shop-list',
    components: {
			RatingStar,
			Scroll
    },
		props: {
			shopListData: {
				type: Array
			}
		},
		data () {
			return {
			}
		},
		methods: {
			linkToDetail (shopId) {
				this.$router.push({
					path: '/EatStoreDetail',
					query: {
						shopId: shopId
					}
				})
			}
		}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
	@import '~common/style/variable.scss';
	@import '~common/style/mixin.scss';
	
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
				img{
					width:100%;
					height:100%;
				}
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