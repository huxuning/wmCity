<template>
	<div  @touchmove.prevent style="height:100%">
		
		<v-header :showLeft="false" :showRight="false" title="好吃首页"></v-header>
		<scroll :data="shopListData" :pullup="true" class="shop-list-wrap" @scrollToEnd="scrollToEnd">

			<div>
				<!-- banner -->
				<div class="bannerSlider" v-if="bannerList.length">
					<slider>
						<div v-for="(item, index) in bannerList" :key="index">
							<img :src="item.img" alt="">
						</div>
				</slider>
				</div>
				
				<!-- 首页分类 -->
				<div class="base-category-list">
					<div class="category-item" v-for="item in baseCategory" :key="item.id" @click="clickBaseCategory(item.code)">
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
				<div class="loading" v-show="scrollFlag && isLoading">
					<img src="../../common/image/loading.gif" alt="">
				</div>
				<div class="loading" v-show="scrollFlag && !isLoading">我们是有底线的</div>
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
import {baseCategoryList, baseRestaurantList, querySubCategoryList, cateringRecommendList} from 'api/eat.js'

export default {
	data () {
		return {
			baseCategory: [],
			markListData: [],
			shopListData: [],
			bannerList: [],
			shopPage: 1,
			maxPage: 0,
			scrollFlag: false,
			isLoading: false
		}
	},
	mounted () {
		this.getBaseCategoryList()
		this.getBaseRestaurantList()
		this.getCateringRecommendList()
		//为了不在其他页面搞一个1-4循环请求，把数据放到storage
		if (sessionStorage.CategoryList) {
			this.markListData = JSON.parse(sessionStorage.CategoryList)
		} else {
			this.getQuerySubCategoryList()
		}
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
			this.isLoading = true
			baseRestaurantList({pageNum: page}).then(rs => {
				this.isLoading = false
				
				this.scrollFlag = false
				if (this.shopListData.length == 0) {
					this.shopListData = rs.resultData
				} else {
					if (rs.resultData.length) {
						this.shopListData= [...this.shopListData, ...rs.resultData]
					} else {

					}
				}
			})
		},
		// 循环1-4一级分类请求二级分类。 迷之接口导致代码没眼看系列。
		getQuerySubCategoryList () {
			var CategoryList = []
			querySubCategoryList({id: 1}).then(rs=>{
				var arr = rs.resultData.map(item=>{return {code: item.code, parentCode: item.parentCode, name: item.name}})
				CategoryList.push(...arr)
				querySubCategoryList({id: 2}).then(rs=>{
					var arr = rs.resultData.map(item=>{return {code: item.code, parentCode: item.parentCode, name: item.name}})
					CategoryList.push(...arr)
					querySubCategoryList({id: 3}).then(rs=>{
						var arr = rs.resultData.map(item=>{return {code: item.code, parentCode: item.parentCode, name: item.name}})
						CategoryList.push(...arr)
						querySubCategoryList({id: 4}).then(rs=>{
							var arr = rs.resultData.map(item=>{return {code: item.code, parentCode: item.parentCode, name: item.name}})
							CategoryList.push(...arr)
							sessionStorage.CategoryList = JSON.stringify(CategoryList)
							this.markListData =CategoryList;
						})
					})
				})
			})
		},
		getCateringRecommendList () {
			cateringRecommendList({cityName: '广州'}).then(rs=>{
				this.bannerList = rs.resultData
			})
		},
		clickMore (item) {
			this.$router.push({
				path: '/EatStoreList',
				query: {
					categoryId: item ? item.code : null,
					baseCategoryId: item ? item.parentCode : null
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
		},
		scrollToEnd() {
			if (this.scrollFlag) return;
			this.shopPage++
			this.scrollFlag = true
			this.isLoading = true
			this.getBaseRestaurantList()
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
    bottom: .74rem;
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
	.bannerSlider{
		height: 3.24rem;
	}
	.loading{
		padding:0.3rem 0.26rem;
		text-align: center;
		line-height: 1.38rem;
		img{
			width:1.38rem;
			height:1.38rem;
		}
		p{
			font-size: 16px;
		}
	}
</style>
