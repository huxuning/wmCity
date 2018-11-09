<template>
  <div class="mark-list">
		<ul :style="{maxHeight: (isShow ? '0.59rem' : '100%'), maxWidth: (isShow ? 'calc(100% - 1.6rem)' : '100%')}">
			<li v-for="(item, index) in markListData" :key="index" :class="{'active-mark' : currentTypeId === item.code}" @click="markListClickHandle(item)">{{item.name}}</li>
		</ul>
		<p class="more-list-btn" @click="isShow = !isShow" v-show="isShow && !indexUse">
			更多标签↓
		</p>
		<p class="more-list-btn" @click="clickHandle" v-show="isShow && indexUse">
			更多标签<i class="icon-jiahao"></i>
		</p>
		<p class="take-up-btn" @click="isShow = !isShow" v-show="!isShow">
			收起标签↑
		</p>
	</div>
</template>

<script>
  export default {
		props: {
			markListData: {
				type: Array
			},
			isTakeUp: {
				type: Boolean,
				default: true
			},
			indexUse: {
				type: Boolean,
				default: false
			},
			currentTypeId: {
				type: String
			}
		},
		data () {
			return {
				isShow: this.isTakeUp
			}
		},
		methods: {
			markListClickHandle (item) {
				if (this.indexUse) {
					this.$emit('clickMore', item)
				}else {
					this.$emit('clickCategory', item)
				}
			},
			clickHandle () {
				this.$emit('clickMore', null)
			}
		},
		watch: {
			isTakeUp: function (val) {
				this.isShow = val
			},
			currentTypeId: function (val) {
				console.log(val)
			}
		}
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .mark-list{
		color: #595959;
		font-size: 14px;
		background: #fafafa;
		overflow: hidden;
		position: relative;
		li {
			display: inline-block;
			padding: 0 0.1rem;
			height: 0.4rem;
			line-height: 0.4rem;
			border: 1px solid #8f8f8f;
			margin: 0 0 0.16rem 0.12rem;
			&.active-mark{
				background: #ff4b4b;
				border-color: #ff4b4b;
				color: #fff;
			}
		}
		ul {
			padding: 0.16rem 0 0 0.1rem;
		}
		.take-up-btn{
			text-align: center;
			height: 0.38rem;
			line-height: 0.38rem;
			margin-bottom: 0.16rem;
			cursor: pointer;
		}
		.more-list-btn{
			position: absolute;
			top: 0.25rem;
			left: auto;
			right: 0.3rem;
		}
		.icon-jiahao{
			font-size: 14px;
		}
	}
</style>