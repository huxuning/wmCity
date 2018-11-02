<template>
	<div>
		<router-view></router-view>
		<v-header showLeft  title="好吃首页"></v-header>
		<div style="height:1rem;">
			<slider class="eat-home-slide">
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
			</slider>
		</div>
		
		<!-- 标签列表 -->
		<mark-list :markListData="markListData" :isTakeUp="true"></mark-list>
		
		<!-- 商家列表 -->
		<div class="list-wrap">
			<shop-list :shopListData="shopListData"></shop-list>
		</div>
			
		
	</div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import RatingStar from 'components/ratingStar/ratingStar'
import Slider from 'components/slider/slider'
import MarkList from 'components/mark-list/mark-list'
import ShopList from 'components/shop-list/shop-list'
import {baseCategoryList} from 'api/goods.js'

export default {
	data () {
		return {
			markListData: [
				{
					id: 1,
					name: '川湘菜系1'
				},
				{
					id: 2,
					name: '烧烤1'
				},
				{
					id: 3,
					name: '粉面粥1'
				},
				{
					id: 4,
					name: '川湘菜系2'
				},
				{
					id: 5,
					name: '烧烤2'
				},
				{
					id: 6,
					name: '粉面粥2'
				},
				{
					id: 7,
					name: '川湘菜系3'
				},
				{
					id: 8,
					name: '烧烤3'
				},
				{
					id: 9,
					name: '粉面粥3'
				}
			],
			shopListData: [
				{
					shopImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg',
					shopName: '香辣馆',
					kiloMeters: '12668.39km',
					address: '40 rue alexandre dumas 75011 paris pre st Grevey',
					shopMark: '川湘菜系，烧烤'
				},
				{
					shopImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg',
					shopName: '香辣馆',
					kiloMeters: '12668.39km',
					address: '40 rue alexandre dumas 75011 paris pre st Grevey',
					shopMark: '川湘菜系，烧烤'
				},
				{
					shopImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg',
					shopName: '香辣馆',
					kiloMeters: '12668.39km',
					address: '40 rue alexandre dumas 75011 paris pre st Grevey',
					shopMark: '川湘菜系，烧烤'
				},
				{
					shopImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg',
					shopName: '香辣馆',
					kiloMeters: '12668.39km',
					address: '40 rue alexandre dumas 75011 paris pre st Grevey',
					shopMark: '川湘菜系，烧烤'
				},
				{
					shopImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541091522971&di=969e224df11807f1bedf56036e5c77d9&imgtype=0&src=http%3A%2F%2Fuploads.5068.com%2Fallimg%2F1801%2F0U9561942-3.jpg',
					shopName: '香辣馆',
					kiloMeters: '12668.39km',
					address: '40 rue alexandre dumas 75011 paris pre st Grevey',
					shopMark: '川湘菜系，烧烤'
				}
			]
		}
	},
	mounted () {
		this.getBaseCategoryList()
	},
	components: {
		VHeader,
		Slider,
		RatingStar,
		MarkList,
		ShopList
	},
	computed: {

	},
	methods: {
		getBaseCategoryList () {
			baseCategoryList().then(rs => {
				console.log(rs)
			})
		}
	},
	watch: {

	}
}

</script>

<style lang="scss" scoped>
	.eat-home-slide {
		width: 100%;
		overflow: hidden;
		margin-top:.86rem;
		height:1rem;
	}
	.list-wrap{
		position: relative;
	}
</style>
