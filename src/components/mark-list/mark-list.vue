<template>
  <div class="mark-list">
		<ul :style="{maxHeight: (isTakeUp ? '0.6rem' : '100%'), maxWidth: (isTakeUp ? 'calc(100% - 1.6rem)' : '100%')}">
			<li v-for="(item, index) in markListData" :key="index" :class="{'active-mark' : activeIndex === index}" @click="markListClickHandle(index)">{{item.name}}</li>
		</ul>
		<p class="more-list-btn" @click="isTakeUp = !isTakeUp" v-show="isTakeUp">
			更多标签↓
		</p>
		<p class="take-up-btn" @click="isTakeUp = !isTakeUp" v-show="!isTakeUp">
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
			}
		},
		data () {
			return {
				activeIndex: -1 // active状态的标签的下标，默认没有任何标签初始为active状态
			}
		},
		methods: {
			markListClickHandle (currentIndex) {
				if (this.activeIndex === currentIndex) {
					this.activeIndex = -1
				} else {
					this.activeIndex = currentIndex
				}
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
	}
</style>