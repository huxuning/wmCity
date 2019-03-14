<template>
  <div @touchmove.prevent style="height: 100%;">
    <v-header showLeft title="外卖订单" @clickBack="goback"></v-header>
    <scroll class="order-list-wrap">
      <div class="content">
        <div class="order-list">
          <div class="order-list-item" v-for="(item, index) in orderListData" :key="index">
            <div class="order-base-info">
              <p class="order-state">{{item.status}}</p>
              <p class="order-address">配送地址：{{item.address}}</p>
              <p class="sender-info">
                <span class="sender-name">配送员：{{item.courierName}}</span>
                <span class="sender-phone">联系方式：{{item.courierPhone}}</span>
              </p>
            </div>
            <div class="order-detail">
              <p class="detail-info">订单号：{{item.code}}</p>
              <p class="detail-info">下单时间：{{item.confirmTime}}</p>
              <p class="detail-info">配送时间：{{item.distributionTime}}</p>
              <p class="detail-info">微米电话：0033642499657</p>
              <p class="detail-info shop-name">{{item.restaurant.name}}&nbsp;{{item.restaurant.address}}</p>
              <p class="goods-info detail-info">
                <span class="goods-name">糯米饭</span>
                <span class="goods-num">&times;7</span>
                <span class="goodes-pay">&euro;24.5</span>
              </p>
              <p class="pay-info">
                <span class="pay-label">配送费</span>
                <span class="pay-num">&euro;5</span>
              </p>
              <p class="pay-info">
                <span class="pay-label">小计</span>
                <span class="pay-num">&euro;29.5</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import VHeader from 'components/v-header/v-header'
  import Scroll from 'components/scroll/scroll'
  import Popup from 'components/popup/popup'
  import {queryMyOrderList} from 'api/eat'
  import Toast from 'components/toast/'
  export default {
    name: 'app',
    components: {
      VHeader,
      Scroll,
      Popup
    },
    data () {
      return {
        pageNum: 1,
        orderListData: []
      }
    },
    computed: {
      userKey () {
        return window.localStorage.getItem('userKey')
      }
    },
    methods: {
      goback () {
				this.$router.go(-1)
      },
      getOrderList () {
        let ajaxData = {
          userKey: this.userKey,
          pageNum: this.pageNum
        }
        queryMyOrderList(ajaxData).then(rs => {
          this.orderListData = rs.resultData
        })
      }
    },
    mounted () {
    },
    created () {
      this.getOrderList()
    },
    watch: {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .order-list-wrap {
    position: absolute;
    top: 0.86rem;
    bottom: 0;
    left: 0;
		right: 0;
  }
  .content {
    padding: 0.2rem;
    .order-list-item {
      border-radius: 3px;
    }
    .order-base-info {
      background: #ffad41;
      color: #fff;
      padding: 0.2rem 0.2rem 0.3rem 0.2rem;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .order-detail {
      border: 1px solid #efefef;
    }
    .order-state {
      font-size: 16px;
      margin-bottom: 0.15rem;
    }
    .sender-info {
      overflow: hidden;
    }
    .order-address {
      font-size: 14px;
      margin-bottom: 0.15rem;
    }
    .sender-name, .sender-phone {
      float: left;
      font-size: 14px;
    }
    .sender-name {
      margin-right: 0.22rem;
    }
    .order-detail {
      padding: 0 0.35rem;
    }
    .detail-info {
      border-bottom: 1px solid #efefef;
      padding: 0.2rem 0;
      color: #333;
      font-size: 14px;
      line-height: 0.4rem;
    }
    .pay-info {
      padding: 0.23rem 0;
      color: #000;
      overflow: hidden;
    }
    .pay-num {
      float: right;
      color: #ffad41;
      font-size: 16px;
    }
    .goods-info {
      overflow: hidden;
    }
    .goods-name {
      float: left;
      width: 60%;
    }
    .goods-num {
      float: left;
      width: 20%;
    }
    .goodes-pay {
      float: right;
      width: 20%;
      text-align: right;
    }
  }
</style>
