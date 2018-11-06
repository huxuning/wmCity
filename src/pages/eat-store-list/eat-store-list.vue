<template>
	<div @touchmove.prevent style="height:100%">
		<v-header showLeft title="商铺列表"></v-header>
		<scroll v-if="shopListData" :data="shopListData" class="shop-list-wrap"  :pullup="true">
			<div>
				<!-- 商铺类型 -->
				<div class="base-category">
					<ul>
						<li v-for="(item, index) in baseCategory" :key="index" :class="{'active-type': activeTypeIdx === index}" @click="activeTypeIdx = index">{{item.name}}</li>
					</ul>
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
import Scroll from 'components/scroll/scroll'
import MarkList from 'components/mark-list/mark-list'
import ShopList from 'components/shop-list/shop-list'
import {baseCategoryList, querySubCategoryList} from 'api/eat.js'
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
			],
			baseCategory: [],
			activeTypeIdx: 0,
			currentTypeId: ''
		}
	},
	mounted () {
		this.getBaseCategoryList()
	},
	components: {
		VHeader,
		Scroll,
		MarkList,
		ShopList
	},
	computed: {

	},
	methods: {
		getBaseCategoryList () {
			baseCategoryList().then(rs => {
				this.baseCategory = rs.resultData
			})
		},
		getQuerySubCategoryList () {
			querySubCategoryList().then(rs = {
			})
		}
	},
	watch: {

	}
}

</script>

<style lang="scss" scoped>
	@import '~common/style/variable.scss';
	.shop-list-wrap{
		position: absolute;
    top: 0.86rem;
    bottom: 0;
    left: 0;
    right: 0;
		z-index:9;
	}
	.base-category{
		ul{
			overflow: hidden;
			background: #fff;
			padding: 0.2rem 0.1rem;
		}
		li {
			float: left;
			height: 0.6rem;
			line-height: 0.6rem;
			padding: 0 0.41rem;
			color: #5e5e5e;
			font-size: 14px;
			&.active-type{
				color: #fff;
				background: $color-primary;
				border-radius: 0.6rem;
			}	
		}
	}
</style>
