<template>
	<div @touchmove.prevent style="height:100%">
		<v-header :showLeft="false" :showRight="false" title="个人中心"></v-header>
		<div class="content-wrap">
			<div class="person-content">
				<div class="person-info">
					<img src="http://b-ssl.duitang.com/uploads/item/201607/29/20160729155407_YSyLE.thumb.700_0.jpeg" alt="">
					<p class="person-name">测试测试君</p>
				</div>
				<i class="icon-shezhi"></i>
			</div>
			<div class="menu-list">
				<div class="menu-item">
					<i class="icon-xingxing left-icon"></i>
					<p class="menu-name">我的收藏</p>
					<i class="icon-xiangzuo"></i>
				</div>
				<div class="menu-item">
					<i class="icon-fangzi left-icon"></i>
					<p class="menu-name">租房订单</p>
					<i class="icon-xiangzuo"></i>
				</div>
				<div class="menu-item" @click="goIndex('EatOrderList')">
					<i class="icon-feiji left-icon"></i>
					<p class="menu-name">外卖订单</p>
					<i class="icon-xiangzuo"></i>
				</div>
				<div class="menu-item">
					<i class="icon-hongbao left-icon"></i>
					<p class="menu-name">我的红包</p>
					<i class="icon-xiangzuo"></i>
				</div>
			</div>
		</div>
		<v-footer active="4"></v-footer>		
	</div>
</template>
<script>
	import VHeader from 'components/v-header/v-header'
	import VFooter from 'components/footer/footer'
	export default{
		data () {
			return {

			}
		},
		components: {
			VHeader,
			VFooter
		},
		mounted () {

		},
		methods: {
			goIndex(name) {
        this.$router.push({
          name: name
        })
      }
		}
	}
</script>
<style lang="scss" scoped>
	@import '~common/style/mixin.scss';
	.content-wrap{
		.person-content{
			height: 2.7rem;
			background: #f0ece8;
			display: flex;
			display: flex;
			display: -webkit-flex;
			align-items: center;
			-webkit-align-items: center;
			justify-content: center;
			-webkit-justify-content: center;
			position: relative;
			@include border-retina(#e4e4e3);
			.person-info{
				display: inline-block;
				img{
					display: block;
					width: 0.88rem;
					height: 0.88rem;
					border: 1px solid #fff;
					border-radius: 100%;
					margin: 0 auto;
					margin-bottom: 0.26rem;
				}
				.person-name{
					font-size: 14px;
					color: #fff;
				}
			}
			.icon-shezhi{
				position: absolute;
				top: 0.3rem;
				left: auto;
				right: 0.5rem;
				color: #c5b8a7;
				font-size: 22px;
				font-weight: bold;
			}
		}
		.menu-list{
			.menu-item{
				overflow: hidden;
				height: 0.8rem;
				line-height: 0.8rem;
				padding: 0 0.24rem;
				@include border-retina(#f3f3f3);
				&:last-child{
					@include border-retina(#fff);
				}
			}
			.left-icon{
				float: left;
				color: #c5b8a7;
				font-size: 22px;
			}
			.menu-name{
				float: left;
				font-size: 16px;
				color: #c5b8a7;
				margin-left: 0.18rem;
			}
			.icon-xiangzuo{
				float: right;
				color: #c5b8a7;
				font-size: 14px;
				transform: rotate(180deg);
			}
			.icon-fangzi{
				font-size: 24px;
			}
			.icon-feiji, .icon-hongbao{
				font-size: 26px;
			}
		}
	}
	
</style>
