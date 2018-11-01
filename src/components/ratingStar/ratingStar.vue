 <template>
	<div class="rating_container">
		<div class="start icon-star" v-for="(item, index) in max" @click="startHover(index)" :key="index" :class="{light: index <= targetIndex}"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				targetIndex: this.scope
			}
		},
		methods: {
			startHover (i) {
				if (this.disabled) return;
				this.targetIndex = i
				this.$emit('change', i+1)
			},
		},
		mounted(){
			
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			max: {
				type: Number,
				default: 5
			},
			scope: {
				type: Number,
				default: 5
			},
			change: {
				type: Function			
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rating_container{
		.start{
			display: inline-block;
			width:16px;
			height:16px;
			font-size: 16px;
			margin-right: .05rem;
			color:#ccc;
		}
		.light{
			color:#ffcc01;
		}
	}
</style>
