<template>
	<div  @touchmove.prevent style="height:100%">
		<v-header showLeft  title="店铺详情" @clickBack="goback"></v-header>
		<!-- <scroll v-if="shopInfo" :data="shopInfo" class="shop-info-wrap"> -->
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
		<!-- </scroll> -->
		<div class="stro-content">
			<scroll :data="goodsCategoryList" class="goods-category-scroll" :stopPropagation="true">
			
				<div class="content-left">
					<p v-for="(item, index) in goodsCategoryList" :key="item.id" class="category-item" :class="{active: targetCategory == item.id}" @click="clickCategory(item.id)">{{item.name}}</p>
				</div>
			</scroll>
				
			<scroll :data="goodsList" class="goods-list-scroll" :stopPropagation="true">
				<div class="content-right">
					<div class="goods-item" v-for="item in goodsList" :key="item.id">
						<img v-lazy="item.coverPicture" alt="">
						<div class="goods-info">
							<p><i class="icon-ai45"></i><span>{{item.name}}</span></p>
							<div>
								<p class="good-price">€{{item.discountPrice}} <span v-if="item.discountPrice != item.price">€{{item.price}}</span></p>
								<span class="add" @click="addCart(item)"> <i class="icon-jiahao"></i></span>
							</div>
						</div>
					</div>
				</div>
			</scroll>
		</div>
    <Popup ref="cart" position="bottom" closeOnClickMask>
			<div class="cart-list" @click.stop="">
				<div class="list-head"><span>已选商品</span> <span @click="clearCartList" style="font-size:14px;float:right;">清空</span></div>
				<scroll class="cart-list-scroll">
					<div>
						<div class="list-item" v-for="(item,index) in chooseGoods" :key="index">
							<span>{{item.name}}</span>
							<div style="float:right;line-height:.68rem;font-size: 17px">
								<span style="color:#ffac40;margin:0 .3rem;">€{{getPrices(index)}}</span>
								<i class="icon-jian" @click.stop="minusGoodNum(index)"></i>
								<span>{{chooseGoodsNumber[index]}}</span>
								<i class="icon-jia" @click.stop="addGoodNum(index)"></i>
							</div>
						</div>
					</div>
					
				</scroll>		
			</div>
		</Popup>
		
		<div class="cart-wrap">
			<div class="cart" @click="showCart"><i class="icon-gouwuche"></i> <span v-show="totalNumber">{{totalNumber}}</span></div>
			<div class="total-price"><span>{{totalPrice ? '€'+totalPrice : '未选购商品'}}</span></div>
			<div class="confirm" :class="{'can-confirm': canConfirem}" @click="goPay">{{ !canConfirem ?　('€'+shopInfo.amountLimit+'起送') : '立即结算'}}</div>
		</div>	
		
	</div>  
</template>

<script>
import {restaurantInfo, goodsCategoryList, goodsList, restaurantLocation} from 'api/eat.js'
import VHeader from 'components/v-header/v-header'
import Scroll from 'components/scroll/scroll'
import util from 'common/js/util.js'
import Popup from 'components/popup/popup'
export default {
	data(){
		return {
			shopInfo: {},
			showNotice: false,
			goodsCategoryList:[],
			targetCategory: -1,
			shopTab: 1,
			goodsList:[],
			chooseGoods: [],
			chooseGoodsNumber: []
		}
	},
	mounted(){
		this.getRestaurantInfo()
		this.getGoodsCategoryList()
		this.getRestaurantLocation()
	},
	components: {
		VHeader,
		Scroll,
		Popup,

	},
	computed: {
		canConfirem: function (){
			return this.shopInfo.amountLimit < this.totalPrice
		},
		totalPrice: function () {
			let total = 0
			for (let i = 0, len=this.chooseGoods.length; i<len; i++) {
				let num = util.numMulti(this.chooseGoods[i].discountPrice, this.chooseGoodsNumber[i])
				total = util.numAdd(total, num)
			}
			return total
		},
		totalNumber: function () {
			var total = 0
			for (let i = 0, len=this.chooseGoodsNumber.length; i<len; i++) {
				total = total + 	this.chooseGoodsNumber[i]
			}
			return total
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
		showCart() {
			if (!this.chooseGoods.length) return
			this.$refs.cart.show()
		},
		minusGoodNum(index) {
			let num = this.chooseGoodsNumber[index] - 1

			if (num == 0) {
				this.chooseGoodsNumber.splice(index, 1)
				this.chooseGoods.splice(index, 1)
			} else {
				this.chooseGoodsNumber.splice(index, 1, num)			
			}

		},
		addGoodNum(index) {
				let num = this.chooseGoodsNumber[index] + 1
				this.chooseGoodsNumber.splice(index, 1, num)
		},
		getPrices(index) {
			return util.numMulti(this.chooseGoods[index].discountPrice, this.chooseGoodsNumber[index])
		},
		clearCartList () {
			this.chooseGoodsNumber = []
			this.chooseGoods = []
			this.$refs.cart.hide()
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
		addCart(item) {
			console.log(item)
			let index = this.chooseGoods.indexOf(item)
			console.log(index)			
			if (index == -1) {
				this.chooseGoods.push(item)
				this.chooseGoodsNumber.push(1)
			} else {
				let num = this.chooseGoodsNumber[index] + 1
				this.chooseGoodsNumber.splice(index, 1, num)
			}
			// chooseGoods.push()
		},
		getRestaurantLocation () {
			let id = this.$route.query.shopId
			restaurantLocation({id:id}).then(rs=>{
				console.log(rs)
			})
		},
		goPay () {
			if (!this.canConfirem) return;
			this.$router.push({
				path: '/EatStoreList'
			})
		},
		goback() {
			this.$router.go(-1)
		}
	},
	beforeRouteLeave (to, from, next) {
		if (to.name === 'EatStoreList') {
			console.log('keep')
			this.$route.meta.keepAlive = true
			next()
		} else {
			console.log('no keep')
			this.$route.meta.keepAlive = false	
			next()
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
  @import '~common/style/mixin.scss';
	.shop-info-wrap{
		position: absolute;
		top: 0.86rem;
		bottom: 0;
		left: 0;
		right: 0;
		z-index:1;
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
		width:100%;
		position: absolute;
		top: 4.5rem;
		bottom: 1rem;
		left:0;
		right:0;
		z-index:2;
		// overflow: hidden;
		.content-left{
			width:1.8rem;
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
			left:1.85rem;
			top:0;
			right:0;
			bottom:0;
			overflow: hidden;
		}
		.goods-category-scroll{
			position: absolute;
			left:0;
			top:0;
			right:1.8rem;
			bottom:0;
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
		z-index:2002;
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
			span{
				position: absolute;
				top:0rem;
				right:.01rem;
				width: .3rem;
				height: .3rem;
				border-radius: 50%;
				background: #f00;
				text-align: center;
				line-height: .3rem;
				font-size: .14rem;
				color: #fff;
			}
		}
		.total-price{
			color: $color-primary;
			font-size: 18px;
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
	.cart-list {
		background: #efefef;
		position: absolute;
		bottom:1rem;
		width: 100%;
		height: 40%;
		.list-head{
			padding: 0 .3rem;
			line-height: .7rem;
			background: #ffd161;
			color:#666;
			span{
				font-size: 18px;
			}
		}
		.cart-list-scroll {
			position: absolute;
			top: 0.7rem;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
		}
		.list-item{
			line-height: .68rem;
			padding:0 .3rem;
			background: #fff;
			margin-bottom:.1rem;
			@include border-retina(#eee);
			i{
				font-size: .35rem;
				color: $color-primary;
				margin: 0 10px;
			}
		}
	}
</style>
