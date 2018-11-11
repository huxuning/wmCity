<template>
	<div @touchmove.prevent style="height:100%">
		<v-header showLeft title="配送地址" @clickBack="goback"></v-header>
		<scroll class="shipping-address-wrap">
			<div class="content">
				<div class="open-time">
					店铺营业时间：星期一二三四五六12:00-22:30
				</div>
				<div class="shipping-type">
					<div class="shipping-now" @click="activeRadioNum = 0">
						<span class="radio-btn" :class="{'active-radio': activeRadioNum === 0}">
							<i class="icon-iconfontcheck"></i>
						</span>
						<span class="type-text">尽快配送</span>
					</div>
					<div class="shipping-later" @click="activeRadioNum = 1">
						<span class="radio-btn" :class="{'active-radio': activeRadioNum === 1}">
							<i class="icon-iconfontcheck"></i>
						</span>
						<span class="type-text">预约下单</span>
					</div>
				</div>
				<div class="shipping-address-form">
					<div class="address-form-item">
						<div class="form-label">
							<span class="icon-smile"></span>
							<span>收货人</span>
						</div>
						<div class="form-content">
							<input type="text" placeholder="请输入收货人" v-model="newContactData.contactName">
						</div>
					</div>
					<div class="address-form-item">
						<div class="form-label">
							<span class="icon-phone"></span>
							<span>手机号</span>
						</div>
						<div class="form-content">
							<input type="text" placeholder="请输入手机号" v-model="newContactData.phone">
						</div>
					</div>
					<!-- <div class="address-form-item">
						<div class="form-label">
							<span class="icon-dingwei"></span>
							<span>邮编</span>
						</div>
						<div class="form-content">
							<input type="text" placeholder="例：75000">
						</div>
					</div> -->
					<div class="address-form-item">
						<div class="form-label">
							<span class="icon-dingwei"></span>
							<span>收货地址</span>
						</div>
						<div class="form-content">
							<input type="text" placeholder="请输入地址或点击右侧图标选择地址" class="address-input" v-model="newContactData.address">
							<span class="position-btn">
								<i class="icon-dangqian"></i>
							</span>
						</div>
					</div>
					<div class="address-form-item" v-if="activeRadioNum === 1">
						<div class="form-label">
							<span class="icon-rili1"></span>
							<span>配送时间</span>
						</div>
						<div class="form-content">
							<input type="text" placeholder="点击选择配送时间" class="address-input" @focus="showTimePick" v-model="shippingTime">
						</div>
					</div>

				</div>
				<div class="history-acepter" v-if="historyListData.length > 0">
					<p class="title">历史收货人</p>
					<div class="history-list">
						<div class="history-item" @click="activeHistoryAddress = index" v-for="(item, index) in historyListData" :key="index">
							<p class="radio-item" :class="{'active-radio-btn' : activeHistoryAddress === index}">
								<span></span>
							</p>
							<div class="detail-content">
								<div class="name-detail">
									<p class="name">收货人：{{item.name}}</p>
									<p class="phone">{{item.phone}}</p>
								</div>
								<p class="address">{{item.address}}</p>
							</div>
							<p class="right-btn">
								<i class="icon-xiangzuo"></i>
							</p>
						</div>
					</div>
				</div>
				<div class="ok-btn">
					<button @click="submitNewContact">确定</button>
				</div>
			</div>
		</scroll>
		<popup ref="pickTime" closeOnClickMask position="bottom">
			<div class="date-pick-container">
				<datetime-picker></datetime-picker>
			</div>
		</popup>
	</div>
</template>
<script>
	import VHeader from 'components/v-header/v-header'
	import Scroll from 'components/scroll/scroll'
	import Popup from 'components/popup/popup'
	import DatetimePicker from 'components/datetime-picker/datetime-picker'
	import {insertCateringContacts, searchHistoryContacts} from 'api/eat.js'
	export default{
		data () {
			return {
				activeRadioNum: 0,
				activeHistoryAddress: 0,
				newContactData: {},
				shippingTime: '',
				historyListPageNum: 1,
				historyListData: []
			}
		},
		components: {
			VHeader,
			Scroll,
			Popup,
			DatetimePicker
		},
		mounted () {
			this.getHistoryContacts()
		},
		methods: {
			goback () {
				this.$router.go(-1)
			},
			showTimePick () {
				this.$refs.pickTime.show()
			},
			submitNewContact () {
				let ajaxData = {
					userKey: 'oGMYR0Vvcq0fg-V-KoE59ZEm671g', // 用户key先写死
					name: this.newContactData.contactName,
					phone: this.newContactData.phone,
					address: this.newContactData.address
				}
				insertCateringContacts(ajaxData).then(rs => {
				})
			},
			getHistoryContacts () {
				let ajaxData = {
					userKey: 'oGMYR0Vvcq0fg-V-KoE59ZEm671g', // 用户key先写死
					pageNum: this.historyListPageNum
				}
				searchHistoryContacts(ajaxData).then(rs => {
					if (rs) {
						this.historyListData = rs.resultData
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~common/style/mixin.scss';
	.shipping-address-wrap{
		position: absolute;
    top: 0.86rem;
    bottom: 0;
    left: 0;
    right: 0;
	}
	.content{
		background: #f8f8f8;
		height: 100%;
		.open-time{
			margin: 0.18rem 0.16rem;
			border: 1px solid #ebebeb;
			height: 0.62rem;
			line-height: 0.62rem;
			text-align: center;
			font-size: 14px;
			background: #fff;
		}
		.shipping-type{
			padding: 0.05rem 0 0.24rem 0;
			.shipping-now, .shipping-later{
				margin-left: 0.32rem;
				display: inline-block;
			}
			.radio-btn{
				display: inline-block;
				width: 0.28rem;
				height: 0.28rem;
				line-height: 0.28rem;
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
		.history-acepter{
			background: #fff;
			margin-top: 0.16rem;
			.title{
				height: 0.96rem;
				line-height: 0.96rem;
				text-align: center;
				color: #fccc00;
				font-size: 16px;
			}
			.history-item{
				padding: 0.26rem 0.3rem;
				overflow: hidden;
				@include border-retina(#ebebeb);
				display: flex;
				display: -webkit-flex;
				align-items: center;
				-webkit-align-items: center;
				justify-content: center;
				-webkit-justify-content: center;
				&:last-child{
					margin-bottom: 0;
					@include border-retina(#fff);
				}
			}
			.radio-item{
				float: left;
				width: 0.34rem;
				height: 0.3rem;
				line-height: 0.3rem;
				border-radius: 100%;
				border: 2px solid #0d1c31;
				text-align: center;
				span{
					display: inline-block;
					width: 0.18rem;
    			height: 0.18rem;
					border-radius: 100%;
					background: #fff;
				}
				&.active-radio-btn{
					span{
						background: #fdce04;
					}
				}
			}
			.detail-content{
				float: left;
				margin: 0 0.3rem 0 0.3rem;
			}
			.right-btn{
				float: right;
				color: #fccc00;
				transform: rotate(180deg);
				.icon-xiangzuo{
					font-size: 12px;
					font-weight: bold;
				}
			}
			.name-detail{
				overflow: hidden;
				font-size: 14px;
				margin-bottom: 0.1rem;
				.name{
					float: left;
				}
				.phone{
					float: right;
				}
			}
			.address{
				color: #717171;
				line-height: 0.34rem;
			}
		}
		.ok-btn{
			padding: 0.6rem 0.4rem;
			button{
				width: 100%;
				height: 0.8rem;
				line-height: 0.8rem;
				text-align: center;
				color: #fff;
				background: #f9ab0d;
				outline: none;
				border: 0;
				font-size: 16px;
				border-radius: 0.8rem;
			}
		}
	}
	.date-pick-container{
		position: relative;
		top: calc(100% - 4.66rem);
	}
</style>
