<template>
  <div class="search-box">
    <i class="icon-search" v-show="searchIcon"></i>
    <input type="text" :readonly="readonly" ref="query" autocomplete="off" @focus="handleFocus" :placeholder="placeholder" class="box" v-model="query">
    <i class="icon-delete" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
  export default {
    props: {
      searchIcon: Boolean,
      readonly: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: '请输入搜索内容'
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      },
      handleFocus () {
        this.$emit('focus')
      }
    },
    created () {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style lang="scss">
  @import "~common/style/variable.scss";
  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: .58rem;
    background: $color-background;
    border-radius: 6px;
    .icon-search {
      font-size: $font-size-large;
      color: $color-text-c;
    }
    .box {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-background;
      color: $color-text-6;
      font-size: $font-size-mid;
      border: none;
      outline: none;
      &::placeholder {
        color: $color-text-9;
      }
    }
    .icon-delete {
      font-size: 16px;
      font-size: $font-size-large;
      color: $color-text-c;
    }
  }
</style>