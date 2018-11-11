<template>
	<div @touchmove.prevent style="height:100%">
		<v-header :showLeft="false" :showRight="false" title="个人中心"></v-header>
		<div class="content">
			<div class="person-content">
				<div class="person-info">
					<img src="http://b-ssl.duitang.com/uploads/item/201607/29/20160729155407_YSyLE.thumb.700_0.jpeg" alt="">
					<p class="person-name">测试测试君</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import VHeader from 'components/v-header/v-header'
	export default{
		data () {
			return {

			}
		},
		components: {
			VHeader
		},
		mounted () {

		},
		methods: {
		}
	}
</script>
<style lang="scss" scoped>
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
	}
</style>
