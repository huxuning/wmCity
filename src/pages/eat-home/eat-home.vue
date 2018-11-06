<template>
	<div  @touchmove.prevent style="height:100%">
		
		<v-header showLeft  title="好吃首页"></v-header>
		<scroll :data="shopListData" class="shop-list-wrap"  :pullup="true">

			<div>
				<!-- banner -->
				<slider></slider>
				<!-- 首页分类 -->
				<div class="base-category-list">
					<div class="category-item" v-for="(item, index) in baseCategory" :key="item.id">
						<img :src="item.image"/>
						<p>{{item.name}}</p>
					</div>
				</div>

				<!-- 标签列表 -->
				<mark-list :markListData="markListData" :isTakeUp="true"></mark-list>
				
				<!-- 商家列表 -->
				<div class="list-wrap">
					<shop-list :shopListData="shopListData"></shop-list>
				</div>
			</div>
			
		</scroll>
			
		
	</div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import RatingStar from 'components/ratingStar/ratingStar'
import Slider from 'components/slider/slider'
import MarkList from 'components/mark-list/mark-list'
import Scroll from 'components/scroll/scroll'
import ShopList from 'components/shop-list/shop-list'
import {baseCategoryList, baseRestaurantList, restaurantList} from 'api/eat.js'

export default {
	data () {
		return {
			baseCategory: [],
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
		this.getBaseRestaurantList()
		this.getRestaurantList()
	},
	components: {
		VHeader,
		Slider,
		RatingStar,
		MarkList,
		ShopList,
		Scroll
	},
	computed: {

	},
	methods: {
		getBaseCategoryList () {
			baseCategoryList().then(rs => {
				this.baseCategory = rs.resultData				
			})
		},
		getBaseRestaurantList () {
			baseRestaurantList().then(rs => {
				this.shopListData = rs.resultData
			})
		},
		getRestaurantList () {
			restaurantList().then(rs => {
				this.shopListData = rs.resultData
			})
		}
	}, 
	watch: {

	}
}

</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
	.eat-home-slide {
		width: 100%;
		overflow: hidden;
		height:1rem;
	}
	.shop-list-wrap{
		position: absolute;
    top: 0.86rem;
    bottom: 0;
    left: 0;
    right: 0;
		z-index:9;
	}
	.list-wrap{
		position: relative;
	}
	.base-category-list{
		width:100%;
		margin-bottom:.2rem;
		.category-item{
			width: 25%;
			display: inline-block;
			text-align: center;
			img {
				max-width: 70%;
			}
		}
	}
</style>
