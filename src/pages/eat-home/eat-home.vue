<template>
	<div  @touchmove.prevent style="height:100%">
		
		<v-header :showLeft="false" :showRight="false" title="好吃首页"></v-header>
		<scroll :data="shopListData" class="shop-list-wrap"  :pullup="true">

			<div>
				<!-- banner -->
				<slider></slider>
				<!-- 首页分类 -->
				<div class="base-category-list">
					<div class="category-item" v-for="item in baseCategory" :key="item.id" @click="clickBaseCategory(item.id)">
						<img v-lazy="item.image"/>
						<p>{{item.name}}</p>
					</div>
				</div>

				<!-- 标签列表 -->
				<mark-list :markListData="markListData" :isTakeUp="true" :indexUse="true" @clickMore="clickMore"></mark-list>
				
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
import {baseCategoryList, baseRestaurantList, querySubCategoryList} from 'api/eat.js'

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
			shopListData: [],
			shopPage: 1
		}
	},
	mounted () {
		this.getBaseCategoryList()
		this.getBaseRestaurantList()
		this.getQuerySubCategoryList()
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
			let page = this.shopPage
			baseRestaurantList({pageNum: page}).then(rs => {
				if (this.shopListData.length == 0) {
					this.shopListData = rs.resultData
				} else {
					this.shopListData.concat(rs.resultData)
				}
			})
		},
		getQuerySubCategoryList () {
			querySubCategoryList().then(rs=>{
				console.log(rs)
			})
		},
		clickMore (id) {
			this.$router.push({
				path: '/EatStoreList',
				query: {
					category: id
				}
			})
		},
		clickBaseCategory (id) {
			this.$router.push({
				path: '/EatStoreList',
				query: {
					baseCategoryId: id
				}
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
