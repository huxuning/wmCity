<template>
	<div class="map-wrap">
		<v-header :showLeft="true" :showRight="true" title="位置"></v-header>
		<div class="map-content-wrap">
			<div class="search" @click="search">
				<input type="text">
			</div>
			<div id="mapContent"></div>

		</div>
	</div>
</template>
<script>

import VHeader from 'components/v-header/v-header'
	import {getBaiduLocation} from 'api/common.js'
	export default{
		data () {
			return {
				searchAddresList: [],
				map:null,
			}
		},
		components: {
			VHeader
		},
		mounted () {
			this.search()
			var map = new BMap.Map("mapContent");    // 创建Map实例
			let position = sessionStorage.position.split(',')
			var point = new BMap.Point(position[0], position[1]);
			map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
			var marker = new BMap.Marker(point);
			map.addOverlay(marker);
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
		},
		methods: {
			search () {
				getBaiduLocation({query: '棠下村', region: '广州市', ak: window.ak, output: 'json'}).then(rs=>{
					this.searchAddresList = rs.result
				})	
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import '~common/style/mixin.scss';
	#mapContent{
		width: 100%;
		height:40%;
		overflow: hidden;
	}
	.map-wrap{
		height:100%;
	}
	.map-content-wrap{
		height: 100%;
		// margin-top: .86rem;
		// overflow: hidden;
	}
</style>
