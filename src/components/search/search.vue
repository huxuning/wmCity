<template>
  <div class="search-wrapper" ref="searchWrapper" :class="[showFlag ? 'show-search' : '' ]">
    <v-header @clickBack="hide">
      <div slot="center">
        <search-box ref="searchbox" @query="searchQuery"></search-box>
      </div>
      <i @click="search" slot="right" class="icon-search"></i>
    </v-header>

    <div class="search-panel">
      <p class="title">热门搜索</p>
      <ul class="hot-search">
        <li class="item" @click="handleItemClick(item)" v-for="item in hotSearch">{{item}}</li>
      </ul>
    </div>

    <div v-show="searchHistory.length">
      <div class="gutter"></div>
      <div class="search-panel">
        <p class="title">历史记录<i class="icon-trash" @click="showClearConfirm"></i></p>
        <scroll class="history-wrapper" :data="searchHistory" click>
          <ul class="history">
            <li v-for="item in searchHistory" @click="handleItemClick(item)" class="item">{{item}}
              <!-- <i class="icon-close" @click.stop="deleteSearchHistory(item)"></i> -->
            </li>
          </ul>
        </scroll>
      </div>
      <div class="clear">
          <v-button plain @click.native="showClearConfirm">清空历史记录</v-button>
      </div>
    </div>
    <confirm @confirm="clearConfirm" ref="clearConfirm">
      <p slot="content">
        确定清空全部历史记录？
      </p>
    </confirm>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import SearchBox from 'components/search-box/search-box'
  import VButton from 'components/v-button/v-button'
  import Scroll from 'components/scroll/scroll'
  import Confirm from 'components/confirm/confirm'
  import {getHotSearch} from 'api/common'
  import {searchMixin} from 'common/js/mixin'
  import {mapActions} from 'vuex'

  export default {
    mixins: [searchMixin],
    components: {
      VHeader,
      SearchBox,
      VButton,
      Scroll,
      Confirm
    },
    data () {
      return {
        showFlag: false,
        hotSearch: [],
        query: ''
      }
    },
    methods: {
      ...mapActions([
        'clearSearchHistory'
      ]),
      searchQuery (query) {
        this.query = query
      },
      search () {
        this.hide()
        this.$emit('searchItemClick', this.query)
        this.saveSearchHistory(this.query)
      },
      handleItemClick (keyword) {
        this.hide()
        this.$emit('searchItemClick', keyword)
      },
      showClearConfirm () {
        this.$refs.clearConfirm.show()
      },
      clearConfirm () {
        this.clearSearchHistory()
      },
      show () {
        this.showFlag = true
        this.$refs.searchWrapper.addEventListener('touchmove', function (event) { event.preventDefault() }, false)
      },
      hide () {
        this.showFlag = false
        this.$refs.searchbox.clear()
      },
      _getHotSearch () {
        getHotSearch().then(rs => {
          this.hotSearch = rs.data.keyword
        })
      }
    },
    created () {
      this._getHotSearch()
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import "~common/style/variable.scss";
  @import '~common/style/mixin.scss';
  .search-wrapper {
    position: fixed;
    z-index: 2001;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;
    transform: translate3d(100%, 0, 0);
    &.show-search {
      transform: translate3d(0, 0, 0);
    }
    .search-panel {
      background-color: $white;
      .title {
        position: relative;
        padding-left: .26rem;
        height: .76rem;
        line-height: .76rem;
        font-size: $font-size-large;
        color: $color-text-3;
        i {
          position: absolute;
          right: 10px;
          top: 2px;
          padding: 10px;
          font-size: $font-size-large-l;
        }
      }
    }
    .hot-search {
      overflow: hidden;
      padding: 0 .26rem;
      .item {
        float: left;
        height: .54rem;
        padding: 0 .34rem;
        margin-right: .2rem;
        margin-bottom: .2rem;
        line-height: .54rem;
        text-align: center;
        border-radius: 8px;
        background-color: #f5f5f5; 
        color: $color-text-6;
        font-size: $font-size-large;
      }
    }
    .gutter {
      height: .2rem;
      background-color: #f5f5f5;
    }
    .history-wrapper {
      height: 3.8rem;
      overflow: hidden;
      @include border-retina($color-border-e, top);
    }
    .history {
      .item {
        position: relative;
        @include border-retina($color-border-e);
        /* height: .76rem; */
        line-height: .76rem;
        padding-left: .26rem;
        color: $color-text-6;
        font-size: $font-size-large;
        i {
          position: absolute;
          right: 10px;
          top: 2px;
          padding: 10px;
        }
      }
    }
    .clear {
      width: 5rem;
      margin: 1rem auto 0;
      .v-btn {
        color: $color-text-9;
      }
    }
  }
</style>