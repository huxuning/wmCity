<template>
  <div class="demoapp">
    <div>
    <v-header :showLeft="false" rightTitle="客服">
      <div slot="center">
        <search-box searchIcon></search-box>
      </div>
      <i slot="right" class="icon-customer"></i>
    </v-header>

    <v-header>
      <div slot="center">
        <search-box></search-box>
      </div>
      <i slot="right" class="icon-search"></i>
    </v-header>

    <v-header :showRight="false">
      <i slot="left" class="icon-close"></i>
      <div slot="center">
        <search-box></search-box>
      </div>
    </v-header>

    <v-header>
      <div class="switch-wrapper" slot="center">
        <switch-tab :switches="switches" :currentIndex="switchIndex" @switch="handleSwitch"></switch-tab>
      </div>
      <div slot="right">
        <i class="icon-cart"></i>
      </div>
    </v-header>

    <v-header title="购物车" :goback="false"></v-header>
    
    <v-header title="更换手机">
      <div slot="right" class="right">
        <span @click="showConfirm">更换</span>
      </div>
    </v-header>
    <uploader :onFinish="uploadeFinish">
      <div style="height: 30px; width: 30px; background: #345;">上传图片</div>
    </uploader>
    <timer ref="timer" :time="5"></timer>
    <v-button type="btn" mini @click.native="timerhandler">timer</v-button>
    <v-button type="btn" mini @click.native="timerStophandler">timer stop</v-button>
    <confirm ref="confirm" title="拨打热线电话">
      <div slot="content">
        <p class="phone">4008-488-999</p>
      </div>
    </confirm>
    <v-button type="btn" mini @click.native="shwoDialog2">dialog</v-button>
    <panel title="业务联系人" status="status">
      <group label-width="80px">
        <cell title="公司类型" value="贸易型" isLink>
          <img style="display:inline-block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/FF3B3B/eeddff" slot="icon"
            alt="">
        </cell>
        <cell title="公型" value="贸易型" isLink></cell>
      </group>
    </panel>
    <count-down endTime="1506759600" :onFinish="countFinsh" dayClass="dayClass"  hourClass="hourClass" minuteClass="minuteClass"  secondClass="secondClass"></count-down>
    <count-down endTime="1506787200"></count-down>
    <v-button type="btn" mini @click.native="shwoSidePopupBottom">选择日期</v-button>
    <p>你选择的日期是：{{selectDate}}</p>
    <panel title="业务联系人2" status="status">
        <group label-width="80px" label-align="justify">
          <cell title="公司类型" value="贸易型" valueColor="#f44" isLink isLoading>
            <img style="display:inline-block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/FF3B3B/eeddff" slot="icon"
              alt="">
          </cell>
          <cell title="公型" value="贸易型" isLink></cell>
        </group>
      </panel>
    <stepper min="5" @input="handlerStepper" max="12"></stepper>
    
    <actionsheet ref="sheet" :menus="menus" @on-action-click="handleActionClick"></actionsheet>
    <v-button type="primary" mini @click.native="shwoActionsheet">show actionsheet</v-button>
    <v-button type="btn" mini @click.native="shwoToast">show Tosat</v-button>
    <v-button type="btn" mini @click.native="shwoTopTips">shwoTopTips</v-button>
    
    <v-button type="btn" mini @click.native="showDialog">showDialog</v-button>
    <v-button type="btn" mini @click.native="shwoSidePopupLeft">PopupLeft</v-button>
    <v-button type="btn" mini @click.native="shwoSidePopupTop">PopupCheck</v-button>
    <v-button type="btn" mini @click.native="shwoSidePopup">PopupRight</v-button>
    
    <area-select :defaultCityCode="defaultCityCode" @area-confirm="areaConfirm" @cancel="areaCancel"></area-select>
    <group label-width="80px" label-align="justify">
      <cell title="公司类型" value-align="left" value="贸易e型" isLink>
        <img style="display:inline-block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/FF3B3B/eeddff" slot="icon"
          alt="">
      </cell>
      <cell title="公型">
        <p slot="content">如果中间有一段很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的字...</p>
      </cell>
    </group>

    <group label-width="80px" title="标题文字">
      <cell title="公司类型" value="贸易型" @cell-click="cellClick" isLink>
        <img style="display:inline-block;margin-right:5px;" src="http://placeholder.qiniudn.com/20x20/FF3B3B/eeddff" slot="icon"
          alt="">
      </cell>
    </group>
    <group label-width="80px">
      <cell title="用户名" isLink required>
        <template slot="content">
          <field v-model="fieldText" style="width: 100%;" placeholder="请输入用户名" icon="delete_fill" @click-icon="fieldText=''" @input="fieldInput"
            @blur="fieldBlur"></field>
        </template>
      </cell>
      <cell title="密码" isLink required>
        <template slot="content">
          <field style="width: 50%;" v-model="fieldPass" type="password" placeholder="请输入密码" icon="delete_fill" @click-icon="fieldPass=''"
            @input="fieldInput" @blur="fieldBlur"></field>
          <p type="btn">获取验证码</p>
        </template>
      </cell>
    </group>
    
    <p>{{fieldText}}</p>
    <loading type="circle" title="loading"></loading>
    <loading></loading>
    <v-switch v-model="switchState" :on-change="chanageSwitch"></v-switch>
    <p>{{switchState}}</p>
    <v-button>submit</v-button>
    <v-button plain showLoading>default plain</v-button>
    <v-button type="primary">primary</v-button>
    <v-button type="primary" :disabled="disabledBtn" showLoading>primary</v-button>
    <v-button type="btn">btn</v-button>
    <v-button type="btn" plain>btn plain</v-button>
    <v-button type="primary" plain>primary plain</v-button>
    <v-button type="primary" disabled mini plain>primary mini</v-button>
    <v-button type="btn" mini plain>btn mini</v-button>
    <v-button mini plain>default mini</v-button>
    
    <check v-model="demo2" type="checkbox" :max="2" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <check-item :value="item" v-for="(item, index) in checkitems" :key="index">{{item.value}}</check-item>
    </check>
    <top-tips ref="topTips">
      <p style="height: 40px; line-height: 40px; text-align: center; color: #fff;">top tips....</p>
    </top-tips>
    <v-textarea :max="10" v-model="textareaInputText" placeholder="请输入点什么吧，求你了..." @input="textareaInput"></v-textarea>
    {{textareaInputText}}
    <popup ref="popup">
      <i class="icon-delete_fill" @click="closePopup" style="font-size: 40px; color: #f60;"></i>
      <div style="height: 1800px;"></div>
      <i class="icon-delete_fill" @click="closePopup" style="font-size: 40px; color: #f60;"></i>
    </popup>

    <!-- <picker :columns="pickerColumns" @change="handlePickerChangePP"></picker> -->

    <popup ref="popupCheck" position="top" closeOnClickMask>
        <check @on-change="changeOrderState" class="order-check-wrapper" v-model="demo1" default-item-class="order-select" selected-item-class="order-selected">
            <check-item value="1">全部订单<i class="icon-correct"></i></check-item>
            <check-item value="2">待协商<i class="icon-correct"></i></check-item>
            <check-item value="3">待买方付款<i class="icon-correct"></i></check-item>
            <check-item value="4">待卖方收货<i class="icon-correct"></i></check-item>
            <check-item value="5">待卖家发货<i class="icon-correct"></i></check-item>
          </check>
    </popup>
    <popup ref="datepick" position="bottom" closeOnClickMask>
      <datetime-picker
        style="position: absolute; bottom:0; width: 100%;"
        v-model="currentDate"
        type="date"
        :min-hour="minHour"
        :max-hour="maxHour"
        :min-date="minDate"
        :max-date="maxDate"
        @change="handlePickerChange"
        @confirm="handlePickerConfirm">
      </datetime-picker>
    </popup>
    <a ref="tel" href="tel:13512765863">13512765863</a>
    <nav-tab></nav-tab>
  </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/js/dateFormat'
  import VHeader from 'components/v-header/v-header'
  import SwitchTab from 'components/switch-tab/switch-tab'
  import SearchBox from 'components/search-box/search-box'
  import NavTab from 'components/nav-tab/nav-tab'
  import Confirm from 'components/confirm/confirm'
  import Actionsheet from 'components/actionsheet/actionsheet'
  import Loading from 'components/loading/loading'
  import VButton from 'components/v-button/v-button'
  import VTextarea from 'components/v-textarea/v-textarea'
  import Check from 'components/check/check'
  import CheckItem from 'components/check/check-item'
  import Group from 'components/group/group'
  import Cell from 'components/cell/cell'
  import Field from 'components/field/field'
  import Stepper from 'components/stepper/stepper'
  import CountDown from 'components/count-down/count-down'
  import Dialog from 'components/dialog/'
  import Panel from 'components/panel/panel'
  import DatetimePicker from 'components/datetime-picker/datetime-picker'
  import Popup from 'components/popup/popup'
  import VSwitch from 'components/v-switch/v-switch'
  import Toast from 'components/toast/'
  import TopTips from 'components/top-tips/top-tips'
  import Scroll from 'components/scroll/scroll'
  import Timer from 'components/timer/timer'
  import Uploader from 'components/uploader/uploader'
  import AreaSelect from 'components/area-select/area-select'
  import Picker from 'components/picker/'

  export default {
    name: 'app',
    components: {
      VHeader,
      Picker,
      SwitchTab,
      SearchBox,
      NavTab,
      Confirm,
      Panel,
      VTextarea,
      CountDown,
      DatetimePicker,
      Stepper,
      Actionsheet,
      Loading,
      VButton,
      Check,
      CheckItem,
      Group,
      Popup,
      Cell,
      Field,
      VSwitch,
      TopTips,
      Scroll,
      AreaSelect,
      Timer,
      Uploader
    },
    data () {
      return {
        defaultCityCode: ['225', '226', '227'],
        textareaInputText: 'rrr',
        selectDate: '',
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date(2018, 0, 1),
        switchState: true,
        fieldText: '',
        fieldPass: '',
        demo1: '1',
        demo2: null,
        checkitems: [{
          key: '1',
          value: 'A'
        }, {
          key: '2',
          value: 'B'
        }, {
          key: '3',
          value: 'C'
        }],
        switches: ['商品', '详情'],
        switchIndex: 0,
        menus: [{
          label: 'actionsheet header',
          type: 'info'
        }, {
          label: 'Primary',
          type: 'primary',
          value: 'primary',
          otherProp: 'hey'
        }, {
          label: 'Warn',
          type: 'warn'
        }, {
          label: 'Disabled',
          type: 'disabled'
        }, {
          label: 'Default'
        }],
        disabledBtn: true
      }
    },
    methods: {
      uploadeFinish (data) {
        console.log(data)
      },
      timerStophandler () {
        this.$refs.timer.stop()
      },
      timerhandler () {
        this.$refs.timer.start()
      },
      areaConfirm (ids, texts) {
        console.log(ids, texts)
      },
      areaCancel () {
        console.log('area cancel')
      },
      textareaInput (value) {
        console.log(value, this.textareaInputText)
      },
      countFinsh () {
        Toast.success('倒计时结束了...')
      },
      tickHandler (obj) {
        console.log(obj)
      },
      handlerStepper (value) {
  
      },
      changeOrderState (value) {
        Toast.loading('请稍等...')
      },
      handlePickerConfirm (value) {
        console.log(value)
        this.selectDate = formatDate(value)
        this.$refs.datepick.hide()
      },
      handlePickerChange (picker) {
      },
      cellClick () {
        Toast.success('okok')
      },
      closePopup () {
        this.$refs.popup.hide()
      },
      shwoSidePopup () {
        this.$refs.popup.show()
      },
      shwoSidePopupBottom () {
        this.$refs.datepick.show()
      },
      shwoSidePopupLeft () {

      },
      shwoSidePopupTop () {
        this.$refs.popupCheck.show()
      },
      shwoDialog2 () {
        Dialog.alert({
          message: '测试看看3232'
        }).then(rs => {
          this.$refs.tel.click()
          Dialog.close()
        }).catch(() => {
          Dialog.close()
        })
      },
      showDialog () {
        Dialog.confirm({
          message: '测试看看',
          title: 'dialog test'
        }).then(rs => {
          Dialog.close()
        }).catch(() => {
          Dialog.close()
        })
      },
      shwoTopTips () {
        this.$refs.topTips.show()
      },
      chanageSwitch (newState) {
        this.switchState = newState
        console.log(newState)
      },
      fieldInput (value) {
        console.log(value)
      },
      fieldBlur () {
        console.log('blur')
      },
      handleSwitch (index) {
        this.switchIndex = index
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      shwoActionsheet () {
        this.$refs.sheet.show()
      },
      shwoToast () {
        Toast('不要乱点，尼玛~')
      },
      handleActionClick (item, index) {
        this.$refs.sheet.hide()
        console.log(item)
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~common/style/variable.scss';
  .demoapp {
    position: relative;
    padding-bottom: .96rem;
    background: $color-background;
  }

  .switch-wrapper {
    margin: 4px auto;
    font-weight: normal;
    width: 60%;
    line-height: 100%;
  }

  .phone {
    font-size: $font-size-large-l;
    color: $color-theme;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    border: 1px solid green;
  }
  .order-check-wrapper {
    
    padding: 0 14px;
    background: #fff;
    i{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
    .order-select {
      position: relative;
      display: block;
      height: 40px;
      line-height: 40px;
      color: $color-text-3;
    }
    .order-selected {
      height: 40px;
      line-height: 40px;
      color: $color-theme;
    }
    
  }
  .dayClass, .hourClass, .minuteClass, .secondClass {
    display: inline-block; 
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
  .dayClass {
    background: #4FCDD1;
  }
  .hourClass {
    background: #FA8989;
  }
  .minuteClass {
    background: #7B65F3;
  }
  .secondClass {
    background: #57F36C;
  }
</style>