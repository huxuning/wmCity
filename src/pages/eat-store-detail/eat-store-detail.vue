<template>
	<div  @touchmove.prevent style="height:100%">
		<v-header showLeft  title="店铺详情" @clickBack="goback"></v-header>
		<scroll v-if="shopInfo" :data="shopInfo" class="shop-info-wrap">
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
				<div class="stro-content">
					<div class="content-left">
						<p v-for="(item, index) in goodsCategoryList" :key="item.id" class="category-item" :class="{active: targetCategory == item.id}" @click="clickCategory(item.id)">{{item.name}}</p>
					</div>
					<scroll :data="goodsList" class="goods-list-scroll">
						<div class="content-right">
							<div class="goods-item" v-for="item in goodsList" :key="item.id">
								<img v-lazy="item.coverPicture" alt="">
								<div class="goods-info">
									<p><i class="icon-ai45"></i><span>{{item.name}}</span></p>
									<div>
										<p class="good-price">€{{item.discountPrice}} <span>€{{item.price}}</span></p>
										<span class="add" @click="addCart(item)"> <i class="icon-jiahao"></i></span>
									</div>
								</div>
							</div>
						</div>
					</scroll>
				</div>
			</div>			
		</scroll>
		<div class="cart-wrap">
			<div class="cart"><i class="icon-gouwuche"></i></div>
			<div class="total-price"><span>{{totalPrice ? totalPrice : '未选购商品'}}</span></div>
			<div class="confirm" :class="{'can-confirm': canConfirem}">{{ !canConfirem ?　('€'+shopInfo.amountLimit+'起送') : '立即结算'}}</div>
		</div>	
		
	</div>  
</template>

<script>
import {restaurantInfo, goodsCategoryList, goodsList, restaurantLocation} from 'api/eat.js'
import VHeader from 'components/v-header/v-header'
import Scroll from 'components/scroll/scroll'
export default {
	data(){
		return {
			shopInfo: {},
			showNotice: false,
			goodsCategoryList:[],
			targetCategory: -1,
			shopTab: 1,
			goodsList:[],
			totalPrice: 0,
			chooseGoods: []
		}
	},
	mounted(){
		this.getRestaurantInfo()
		this.getGoodsCategoryList()
		this.getRestaurantLocation()
		console.log('详情页！')
	},
	components: {
		VHeader,
		Scroll

	},
	computed: {
		canConfirem: function (){
			return this.shopInfo.amountLimit < this.totalPrice
		}
	},
	methods: {
		getRestaurantInfo () {
			let id = this.$route.query.shopId
			restaurantInfo({id: id}).then(rs => {
				this.shopInfo = rs.resultData
				console.log(rs.resultData.notice)
				this.shopInfo.notice = rs.resultData.notice.replace(/[\n]/g, '<br/>')
			})
		},
		getGoodsList (page = 1) {
			let data ={
				goodsCategoryId: this.targetCategory,
				status: 'all',
				pageNum: page
			}
			goodsList(data).then(rs => {
				this.goodsList = rs.resultData
			})
		},
		getGoodsCategoryList () {
			let id = this.$route.query.shopId
			goodsCategoryList({id: id}).then(rs => {
				this.goodsCategoryList = rs.resultData
				this.targetCategory = this.goodsCategoryList[0].id
			})
		},
		noticeShow() {
			this.showNotice = !this.showNotice
		},
		clickTab(index) {
			this.shopTab = index;
																																																		
		},
		clickCategory(id){
			this.targetCategory = id
		},
		goodsScroll() {
			console.log(this.$refs)
			this.$refs.shopScroll.disable()
		},
		addCart() {
			
			chooseGoods.push()
		},
		getRestaurantLocation () {
			let id = this.$route.query.shopId
			restaurantLocation({id:id}).then(rs=>{
				console.log(rs)
			})
		},
		goback() {
			this.$router.go(-1)
		}
	},
	watch: {
		targetCategory: function (val) {
			if (val === -1) return;
			this.getGoodsList()
		}
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
					color: $color-primary;
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
		margin: .3rem auto .3rem;
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
	.stro-content{
		padding-bottom:1rem;
		width:100%;
		position: relative;
		overflow: hidden;
		.content-left{
			width:1.4rem;
			min-height:7rem;
			max-height:9rem;
			background: #f3f7fb;
			.category-item{
				text-align: center;
				line-height: .9rem;
				height:.9rem;
				&.active{
					background: #fff;
				}
			}
		}
		.goods-list-scroll{
			position: absolute;
			left:1.4rem;
			top:0;
			right:0;
			bottom:1rem;
			overflow: hidden;
		}
		.content-right{
			overflow: hidden;
			padding-left:.15rem;
			.goods-item{
				position: relative;
				margin-bottom:.15rem;
				img{
					display: inline-block;
					border-radius: 5px;
					width:1rem;
					height:1rem;
				}
				.goods-info{
					display: inline-block;
					vertical-align: top;
					font-size: 16px;
					height:1rem;
					.icon-ai45{
						color: $color-primary;
						padding:0 .05rem;
					}
					.good-price{
						color: $color-primary;
						margin-top:.5rem;
						padding-left:.05rem;
						span{
							color:#999;
							text-decoration: line-through;
							font-size: 12px;
							padding-left:5px;
						}
					}
					.add{
						position: absolute;
						width:.4rem;
						height:.4rem;
						text-align: center;
						font-size: 18px;
						color: #fff;
						line-height: .4rem;
						border-radius: 50%;
						background: $color-primary;
						right:.2rem;
						top:.55rem;
					}
				}
			}
		}
	}
	.cart-wrap{
		width: 100%;
		height:1rem;
		position: fixed;
		bottom:0;
		z-index:200;
		line-height: 1rem;
		background: #fff;
		.cart{
			width:.88rem;
			height:.88rem;
			border-radius: 50%;
			background: $color-primary;
			position: absolute;
			top: -0.15rem;
			left:.1rem;
			text-align: center;
			line-height: .88rem;
			i{
				color: #fff;
				font-size: .55rem;
			}
		}
		.total-price{
			color: $color-primary;
			padding-left:1.2rem;
			display: inline-block;
		}
		.confirm{
			float: right;
			width:2rem;
			text-align: center;
			color: #fff;
			font-size: 18px;
			background: #585858;
			&.can-confirm{
				background: $color-primary;
			}
		}
	}
</style>
