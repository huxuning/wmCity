<template>
  <div class="root-footer">
      <div @click="goIndex('login')" :class="{active: active == 0}">
        <i class="icon-fangzidichan"></i>
        <span>租房</span>
      </div>
      <div @click="goIndex('login')" :class="{active: active == 1}">
        <i class="icon-xuesheng"></i>
        <span>留学</span>
      </div>
      <div @click="goIndex('EatHome')" :class="{active: active == 2}">
        <i class="icon-caipin-"></i>
        <span>好吃</span>
      </div>
      <div @click="goIndex('login')" :class="{active: active == 3}">
        <i class="icon-zhanshiwenzhang"></i>
        <p>视野</p>
      </div>
      <div @click="goIndex('PersonCenter')"  :class="{active: active == 4}">
        <i class="icon-wo10"></i>
        <span>我</span>
      </div>
    </div>	
</template>

<script>
  export default {
    name: 'v-footer',
    props: ['active'],
    methods: {
      goIndex(name) {
        this.$router.push({
          name: name
        })
      }
    }

  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
</style>