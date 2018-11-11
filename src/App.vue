<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="root-footer" v-if="$route.meta.hasFooter">
      <div>
        <i class="icon-fangzidichan"></i>
        <span>租房</span>
      </div>
      <div>
        <i class="icon-xuesheng"></i>
        <span>留学</span>
      </div>
      <div class="active">
        <i class="icon-caipin-"></i>
        <span>好吃</span>
      </div>
      <div>
        <i class="icon-zhanshiwenzhang"></i>
        <p>视野</p>
      </div>
      <div>
        <i class="icon-wo10"></i>
        <span>我</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style rel="stylesheet/scss" lang="scss">
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.root-footer{
  width: 100%;
  height:.74rem;
  position: fixed;
  bottom:0;
  z-index: 200;
  background: #fff;
  border-top: 1px solid #eee; 
  &>div{
    width: 20%;
    float: left;
    text-align: center;
    &.active{
      color: #ffad41;
    }
  }
  i{
    font-size: .3rem;
    display: block;
    margin:.1rem 0;
  }
}
</style>
