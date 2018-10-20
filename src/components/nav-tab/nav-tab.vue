<template>
  <ul class="nav-tab border-retina">
    <router-link tag="li" class="nav-tab-item" to="/home">
      <i class="icon icon-homepage_fill"></i>
      <p class="text">首页</p>
    </router-link>
    <router-link tag="li" class="nav-tab-item" to="/category">
      <i class="icon icon-manage_fill"></i>
      <p class="text">分类</p>
    </router-link>
    <router-link tag="li" class="nav-tab-item" to="/cart">
      <span class="remind-number"></span>
      <i class="icon icon-cart-filled"></i>
      <p class="text">购物车</p>
    </router-link>
    <router-link tag="li" class="nav-tab-item" to="/user">
      <i class="icon icon-seeuser"></i>
      <p class="text">我的</p>
    </router-link>
  </ul>
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  @import '~common/style/mixin.scss';
  .nav-tab {
    z-index: 2000;
    display: flex;
    padding: .04rem 0;
    height: .96rem;
    background: $color-background-base;
    @include border-retina($color-border-e, top);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
    .nav-tab-item {
      position: relative;
      flex: 1;
      width: 1%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $color-text-c;
      &.router-link-active {
        color: $color-link-active;
      }
      .remind-number {
        position: absolute;
        top: 0;
        left: 50%;
        border-radius: 10px;
        min-width: 17px;
        color: #fff;
        font-size: 12px;
        background-color: $color-danger;
        line-height: 1.2;
        text-align: center;
        padding: 0 4px;
        letter-spacing: 1px;
      }
    }
    .icon {
      font-size: $font-size-large-l;
    }
    .text {
      font-size: $font-size-mid;
    }
  }
</style>