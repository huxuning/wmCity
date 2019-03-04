<template>
	<div @touchmove.prevent style="height:100%">
		<v-header :showLeft="false" :showRight="false" title="支付成功" @clickBack="goback"></v-header>
	</div>
</template>
<script>
	import VHeader from 'components/v-header/v-header'
	import Scroll from 'components/scroll/scroll'
	export default{
		data () {
			return {

			}
		},
		components: {
			VHeader,
			Scroll,
		},
		mounted () {
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	@import '~common/style/mixin.scss';

</style>
