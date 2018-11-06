<template>
	<div  @touchmove.prevent style="height:100%">
		<v-header showLeft  title="店铺详情"></v-header>
		<scroll v-if="shopInfo" :data="shopInfo" class="shop-info-wrap"  :pullup="true">
			<div>
				<div class="shop-item">
					<div class="left-shop-img" :style="{ background: 'url(' + shopInfo.coverPicture + ') no-repeat', backgroundSize: '100% 100%'}">
					</div>
					<div class="right-shop-detail">
						<p class="shop-name">{{shopInfo.name}}</p>
						<p class="shop-address">
							<i class="icon-dizhi"></i>
							<span>{{shopInfo.address}}{{shopInfo.address}}</span>
						</p>
						<p class="shop-tel">
							<i class="icon-dianhua"></i>
							{{shopInfo.phone}}
						</p>
						<p class="shop-mark">{{shopInfo.shopMark}}</p>
					</div>
				</div>
				<div class="notice" :class="{up: showNotice}">
					<i class="icon-shengyin"></i>
					<div v-html="shopInfo.notice"></div>
					<i class="icon-xiangzuo" :class="{up: showNotice}" @click="noticeShow"></i>
				</div>
				<div class="shop-tab">
					<span :class="{active: shopTab == 1}" @click="clickTab(1)">外卖</span>
					<span :class="{active: shopTab == 2}" @click="clickTab(2)">商家</span>
				</div>
			</div>
			
		</scroll>
			
		
	</div>  
</template>

<script>
import {restaurantInfo} from 'api/eat.js'
import VHeader from 'components/v-header/v-header'
import Scroll from 'components/scroll/scroll'
export default {
	data(){
		return {
			shopInfo: null,
			showNotice: false,
			shopTab: 1
		}
	},
	mounted(){
		this.getRestaurantInfo()
		console.log('详情页！')
	},
	components: {
		VHeader,
		Scroll

	},
	computed: {

	},
	methods: {
		getRestaurantInfo () {
			let id = this.$route.query.shopId
			console.log(this.$route)
			restaurantInfo({id: id}).then(rs => {
				this.shopInfo = rs.resultData
				console.log(rs.resultData.notice)
				this.shopInfo.notice = rs.resultData.notice.replace(/[\n]/g, '<br/>')
			})
		},
		noticeShow() {
			this.showNotice = !this.showNotice
		},
		clickTab(index) {
			this.shopTab = index;
			
		}
	},
	watch: {

	}
}

</script>

<style lang="scss" scoped>
  @import '~common/style/variable.scss';
	.shop-info-wrap{
		position: absolute;
		top: 0.86rem;
		bottom: 0;
		left: 0;
		right: 0;
		z-index:9;
	}
	.shop-item{
			padding: 0.3rem 0.26rem 0.2rem 0.26rem;
			overflow: hidden;
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
					line-height: 0.28rem;
					margin-bottom: 0.2rem;
					color: #666;
					position: relative;
					i{
						display: inline-block;
						position: absolute;
						top:0;
						left:0;
					}
					span{
						display: block;
						padding-left:20px;
						word-break: break-all;
					}
				}
				.shop-tel{
					color: #666;
					
				}
			}
		}
		.notice{
			position: relative;
			margin: 0 .26rem .1rem;;
			height:.28rem;
			overflow: hidden;
			&.up{
				height: auto;
			}
			i{
				font-size: 16px;
				line-height: .28rem;
			}
			.icon-shengyin{
				position: absolute;
			}
			.icon-xiangzuo{
				position: absolute;
				right:0;
				top:0;
				color:$color-primary;
				transform: rotate(-90deg);
				&.up {
					transform: rotate(90deg);
				}
			}
			div{
				padding:0 20px;
				font-size: 14px;
				line-height: .28rem;
			}
		}
		.shop-tab{
			width:60%;
			height: .50rem;
			border-radius: .29rem;
			border:2px solid $color-primary;
			margin: .2rem auto .1rem;
			display: flex;
			text-align: center;
			span{
				display: inline-block;
				flex:1;
				line-height: .5rem;
				color:$color-primary;
				&:first-child{
					border-radius: .27rem 0 0 .27rem;
				}
				&:last-child{
					border-radius: 0 .27rem .27rem 0;
				}
				&.active{
					background: $color-primary;
					color:#fff;
				}
			}
		}
</style>
