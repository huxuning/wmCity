<template>
	<div>
		<v-header showLeft title="订单支付" @clickBack="goback"></v-header>
		<scroll class="order-comfirm-scroll">
			<div>
				<div class="shipping-type">
					<div class="shipping-now" @click="activeRadioNum = 0">
						<span class="radio-btn" :class="{'active-radio': activeRadioNum === 0}">
							<i class="icon-iconfontcheck"></i>
						</span>
						<span class="type-text">配送</span>
					</div>
					<div class="shipping-later" @click="activeRadioNum = 1">
						<span class="radio-btn" :class="{'active-radio': activeRadioNum === 1}">
							<i class="icon-iconfontcheck"></i>
						</span>
						<span class="type-text">自取-享9折优惠</span>
					</div>
				</div>
				<div class="order-top">
					<div class="peisong" v-show="activeRadioNum == 0">
						<img src="../../common/image/dingwei.png" alt="">
						<span>收货人：</span>
						<span>{{contact.name}}</span>
						<span>{{contact.phone}}</span>
						<div>
								{{contact.address ? contact.address : '请点击编辑收货人信息'}}
						</div>
					</div>
					<div class="ziqu" v-show="activeRadioNum == 1">
					<div class="shipping-address-form">
						<div class="address-form-item">
							<div class="form-label">
								<span class="icon-smile"></span>
								<span>收货人</span>
							</div>
							<div class="form-content">
								<input type="text" placeholder="请输入收货人">
							</div>
						</div>
						<div class="address-form-item">
							<div class="form-label">
								<span class="icon-phone"></span>
								<span>手机号</span>
							</div>
							<div class="form-content">
								<input type="text" placeholder="请输入手机号">
							</div>
						</div>
						<div class="address-form-item" v-if="activeRadioNum === 1">
							<div class="form-label">
								<span class="icon-rili1"></span>
								<span>配送时间</span>
							</div>
							<div class="form-content">
								<input readonly type="text" v-model="peisongTime" placeholder="点击选择配送时间" class="address-input" @click="showTimePick">
							</div>
						</div>

					</div>
					</div>
					<div class="order-top-bg"></div>
				</div>

				<div class="order-detail">
					<div class="shop-name">
						<img :src="shopInfo.coverPicture" alt="" style="width: .45rem; height:.45rem;border-radius: 50%">
						<span>{{shopInfo.name}}</span>
					</div>
					<div class="good-item" v-for="(item, index) in  chooseGoods" :key="index">
						<img v-lazy="item.coverPicture" alt="">
						<div class="good-info">
							<span class="good-name">{{item.name}}</span>
							<span class="good-num">×{{chooseGoodsNumber[index]}}</span>
							<span class="good-price">€{{item.price}}</span>
						</div>
					</div>
					<div class="order-item">
						<label for="">配送费</label>
						<span class="item-right">€0</span>
					</div>
					<div class="order-item">
						<label for="">红包</label>
						<span class="item-right">€0</span>
					</div>
					<div class="order-item">
						<label for="">小计</label>
						<span class="item-right" style="color:#ffad41">€{{totalPrice()}}</span>
					</div>
					<div class="mark">
						<input type="text" placeholder="备注">
					</div>
				</div>

				<p class="changeRate">当前人民币欧元汇率:  1:{{changeRate}}</p>
			</div>
		</scroll>
		<div class="footer-btn">
			<span class="pay-left">现金支付</span>
			<span class="pay-right">在线支付</span>
		</div>
		<popup ref="pickTime" closeOnClickMask position="bottom">
			<datetime-picker :minDate="new Date()" class="date-pick-container" @confirm="dateConfirm"></datetime-picker>
		</popup>
	</div>    
</template>

<script>
import Scroll from 'components/scroll/scroll'
import VHeader from 'components/v-header/v-header'
import {restaurantInfo, getExchangeRate} from 'api/eat.js'
import util from 'common/js/util.js'
import dateFormat from 'common/js/dateFormat.js'
import Popup from 'components/popup/popup'
import DatetimePicker from 'components/datetime-picker/datetime-picker'
import { formatDate } from '../../common/js/dateFormat';
export default {
	data(){
		return {
			activeRadioNum: 0,
			shopInfo: {},
			contact: {
				name: '测试',
				phone: '18888888888',
				cityCode: '',
				cityName: '',
				districtCode: '',
				districtName: '',
				address: '测试地址',
				longitude: '',
				latitude: '',
				takeTime: ''
			},
			peisongTime: '',
			chooseGoods: [],
			chooseGoodsNumber: [],
			changeRate: ''
		}
	},
	mounted(){
		this.getRestaurantInfo ()
		this.getExchangeRate()
		this.chooseGoods = this.$route.params.chooseGoods
		this.chooseGoodsNumber = this.$route.params.chooseGoodsNumber
	},
	components: {
		Scroll,
		VHeader,
		DatetimePicker,
		Popup
	},
	computed: {

	},
	methods: {
		goback() {
			this.$router.go(-1)
		},
		getPrices(index) {
			return util.numMulti(this.chooseGoods[index].discountPrice, this.chooseGoodsNumber[index])
		},
		totalPrice () {
			let total = 0
			for (let i = 0, len=this.chooseGoods.length; i<len; i++) {
				let num = util.numMulti(this.chooseGoods[i].discountPrice, this.chooseGoodsNumber[i])
				total = util.numAdd(total, num)
			}
			return total
		},
		showTimePick () {
			this.$refs.pickTime.show()
		},
		getRestaurantInfo () {
			let id = this.$route.params.shopId
			restaurantInfo({id: id}).then(rs => {
				this.shopInfo = rs.resultData
				this.shopInfo.notice = rs.resultData.notice.replace(/[\n]/g, '<br/>')
			})
		},
		getExchangeRate () {
			getExchangeRate().then(rs=>{
				this.changeRate = rs.resultData.euros
			})
		},
		dateConfirm(val) {
			this.contact.takeTime = val
			console.log(formatDate(val, 'yyyy-MM-dd hh:mm:ss'))
			this.peisongTime = formatDate(val, 'yyyy-MM-dd hh:mm:ss')
		}
	},
	watch: {

	}
}

</script>

<style lang="scss" scoped>
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
	.order-comfirm-scroll{
		position: absolute;
		top: 0.86rem;
		bottom: .85rem;
		left: 0;
		right: 0;
		z-index:1;
		background: #fef6dd;
		padding:0 .2rem .3rem;
		overflow: hidden;
	}
	.shipping-type{
		padding: .3rem 0;
		font-weight: 700;
		.shipping-now, .shipping-later{
			margin-right: 0.32rem;
			display: inline-block;
		}
		.radio-btn{
			display: inline-block;
			width: 0.25rem;
			height: 0.25rem;
			line-height: 0.25rem;
			border-radius: 100%;
			border: 1px solid #cbcbcb;
			text-align: center;
			background: #fff;
			margin-right: 0.1rem;
			.icon-iconfontcheck{
				font-size: 12px;
				color: #fff;
			}
			&.active-radio{
				border-color: #ffa024;
				background: #ffac40;
			}
		}
	}
	.order-top{
		background: #fff;
		border-radius: 10px 10px 0 0;
		.order-top-bg{
			background: url('../../common/image/bg-1.png') -10px 0;	
			height:9px;
			widht: 100%;
		}
	}
	.peisong{
		padding: .25rem .25rem 0 .25rem;
		img{
			width:.33rem;
			height:.39rem;
			margin-right:.15rem;
		}
		span{
			font-size: 16px;
			padding-right: .2rem;
		}
		div{
			padding:.25rem .48rem;
			color: #999;
		}
	}
	.order-detail{
		background: #fff;
		padding: .2rem;
		border: 1px solid #cbcaca;
		border-radius: 10px;
		margin-top:.3rem;
		.shop-name {
			line-height: .45rem;
			height:.45rem;
			margin-bottom:.2rem;
			img{
				display:inline-block;
				float: left;
				margin-right: .2rem;
			}
			span{
				display: inline-block;
				vertical-align: center;
				float: left;
			}
		}
		.good-item{
			background: #f5f5f5;
			margin-bottom: .1rem;
			padding: .15rem;
			img {
				width: .8rem;
				height: .8rem;
				display: inline-block;
			}
			.good-info{
				display: inline-block;
				vertical-align: top;
				min-height:.6rem;
				width: 80%;
				position: relative;
				padding-bottom: .2rem;
				font-size: 14px;
				span{
					display: inline-block;
				}
				.good-name{
					width: 90%;
				}
				.good-num {
					display: block;
					position: absolute;
					bottom:0;
					left:0;
					font-size: 16px;
				}
				.good-price {
					position: absolute;
					right: .1rem;
					top: 50%;
					margin-top:-7px;
					font-size: 18px;
				}
			}
		}
		.order-item{
			height:.8rem;
			line-height: .8rem;
			@include border-retina(#eee);	
			.item-right{
				float: right;
				padding-right:.1rem;
			}
		}
		.mark{
			width: 100%;
			input {
				display:border-box;
				width:100%;
				height:.68rem;
				padding: 0;
				text-indent: .1rem;
				border: 1px solid #eee;
			}
		}
	}
	.changeRate{
		padding: .3rem;
	}
	.footer-btn{
		width:100%;
		height:.85rem;
		bottom:0;
		text-align: center;
		line-height: .85rem;
		@include border-retina(#eee, top);	
		position: absolute;
		z-index: 200;
		span{
			display: inline-block;
			float: left;
			width: 50%;
			font-size: 18px;
		}
		.pay-left{
			color:#000;
			background: #f5f5f5;
		}
		.pay-right{
			color:#fff;
			background: $color-primary;
		}
	}
	.shipping-address-form{
			font-size: 14px;
			background: #fff;
			.address-form-item{
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.22rem;
				@include border-retina(#ebebeb);
				overflow: hidden;
				&:last-child{
					@include border-retina(#fff);
				}
			}
			.form-label, .form-content{
				float: left;
			}
			.form-label{
				width: 1.65rem;
			}
			.form-content{
				width: calc(100% - 1.65rem);
				overflow: hidden;
			}
			.icon-smile{
				display: inline-block;
				width: 0.35rem;
				height: 0.35rem;
				background: url(../../common/image/smile.png) no-repeat;
				background-size: cover;
				position: relative;
				top: 0.1rem;
				margin-right: 0.1rem;
			}
			.icon-phone{
				display: inline-block;
				width: 0.3rem;
				height: 0.37rem;
				background: url(../../common/image/phone.png) no-repeat;
				background-size: cover;
				position: relative;
				top: 0.1rem;
				margin-right: 0.15rem;
			}
			.icon-dingwei{
				display: inline-block;
				width: 0.32rem;
				height: 0.35rem;
				background: url(../../common/image/dingwei.png) no-repeat;
				background-size: cover;
				position: relative;
				top: 0.1rem;
				margin-right: 0.13rem;
			}
			.icon-rili1{
				display: inline-block;
				width: 0.35rem;
				height: 0.33rem;
				background: url(../../common/image/rili.png) no-repeat;
				background-size: cover;
				position: relative;
				top: 0.08rem;
				margin-right: 0.1rem;
			}
			input{
				width: 100%;
				border: none;
				outline: none;
				line-height: 0.8rem;
			}
			.address-input{
				float: left;
				width: calc(100% - 0.38rem - 0.1rem);
				margin-right: 0.1rem
			}
			.position-btn{
				float: left;
				width: 0.38rem;
				height: 0.38rem;
				line-height: 0.38rem;
				text-align: center;
				border-radius: 5px;
				background: #ececec;
				position: relative;
				top: 0.2rem;
				cursor: pointer;
			}
			.icon-dangqian{
				font-size: 14px;
				color: #666;
			}
			
		}
		.date-pick-container{
			position: absolute;
			width:100%;
			bottom:0;
		}
</style>
