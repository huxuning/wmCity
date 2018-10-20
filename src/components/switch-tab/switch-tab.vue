<template>
  <ul class="switch-tab">
    <li class="item" v-for="(item,index) in switches" :class="{'active':currentIndex===index}" @click="switchItem(index)">
      <span>{{item}}</span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem (index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .switch-tab {
    display: flex;
    align-items: center;
    margin: 0 auto;
    .item {
      flex: 1;
      text-align: center;
    }
  }
</style>