<template>
	<div @touchmove.prevent style="height:100%">
		<v-header showLeft title="商铺列表" @clickBack="goback"></v-header>
		<scroll v-if="shopListData" :data="shopListData" class="shop-list-wrap"  :pullup="true"  @scrollToEnd="scrollToEnd">
			<div>
				<!-- 商铺类型 -->
				<div class="base-category">
					<ul>
						<li v-for="(item, index) in baseCategory" :key="index" :class="{'active-type': baseCategoryId === item.code}" @click="clickBaseCategotry(item.code)">{{item.name}}</li>
					</ul>
				</div>
				<!-- 标签列表 -->
				<mark-list :markListData="markListData" :isTakeUp="isTakeUp" :currentTypeId="currentTypeId" @clickCategory="clickCategory"></mark-list>
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
import {baseCategoryList, querySubCategoryList, restaurantList, baseRestaurantList} from 'api/eat.js'
export default {
	data () {
		return {
			isTakeUp: true,
			shopPage: 1,
			baseCategoryId: 1,
			listType: 'base', // base 推荐列表,  normal  分类请求的列表
			markListData: [],
			shopListData: [],
			baseCategory: [],
			activeTypeIdx: 0,
			currentTypeId: null,
			scrollFlag: false
		}
	},
	mounted () {
		this.currentTypeId = this.$route.query.categoryId ? this.$route.query.categoryId : null
		this.isTakeUp = !(this.$route.query.categoryId == null)
		this.baseCategoryId = this.$route.query.baseCategoryId || null
		this.getBaseCategoryList()
		this.markListData = JSON.parse(sessionStorage.CategoryList)
		
		//首页
		if (!this.currentTypeId && !this.baseCategoryId) {
			this.getBaseRestaurantList()
		} else {
			this.getRestaurantList()
		}
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
		getRestaurantList (page) {
			let data = {
				parentCategoryCode: this.baseCategoryId,
				categoryCode: this.currentTypeId,
				pageNum: page,
				locationFlag: 'Y'
			}
			restaurantList(data).then(rs=>{
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
		clickBaseCategotry(id) {
			this.baseCategoryId = id
			this.currentTypeId = null //置空二级分类
			this.getRestaurantList()
		},
		clickCategory (item) {
			this.currentTypeId = item.code
			this.baseCategoryId = item.parentCode
			
			this.getRestaurantList()
		},
		getBaseRestaurantList (page = 1) {
			baseRestaurantList({pageNum: page}).then(rs => {
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
		goback () {
			this.$router.go(-1)
		},
		scrollToEnd() {
			if (this.scrollFlag) return;
			this.shopPage++
			this.scrollFlag = true
			if (!this.currentTypeId && !this.baseCategoryId) {
				this.getBaseRestaurantList(this.shopPage)
			} else {
				this.getRestaurantList(this.shopPage)
			}
		}
	},
	watch: {
		baseCategoryId: function (val) {
			this.shopPage = 1
			this.scrollFlag = false
			this.shopListData = []
		},
		currentTypeId: function (val) {
			this.shopPage = 1
			this.scrollFlag = false
			this.shopListData = []
		}
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
