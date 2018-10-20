<template>
  <div class="picker">
    <div class="picker-toolbar hairline-top-bottom" v-show="showToolbar">
      <slot>
        <a href="javascript:void(0)" class="picker-cancel" @click="handlePickerCancel">取消</a>
        <a href="javascript:void(0)" class="picker-confirm" @click="handlePickerConfirm">完成</a>
        <div v-if="title" class="picker-title">{{ title }}</div>
      </slot>
    </div>
    <div class="picker-columns" :class="['picker-columns-' + columns.length]">
      <picker-column v-for="(item, index) in columns" :key="index" v-model="values[index]" :values="item.values" :class-name="item.className"
        :itemHeight="itemHeight" :visible-item-count="visibileColumnCount" :value-key="valueKey" @columnChange="columnValueChange(index)"
      />
      <div class="picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>

<script>
  import PickerColumn from './picker-column'
  const DEFAULT_ITEM_HEIGHT = 44
  export default {
    name: 'picker',
    components: {
      [PickerColumn.name]: PickerColumn
    },
    props: {
      /**
       * 每一列可见备选元素的个数
       */
      visibileColumnCount: {
        type: Number,
        default: 5
      },
      /**
       * 选中元素区高度
       */
      itemHeight: {
        type: Number,
        default: DEFAULT_ITEM_HEIGHT
      },
      /**
       * 对象数组，配置每一列显示的数据
       */
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      /**
       * 否在组件顶部显示一个toolbar
       */
      showToolbar: {
        type: Boolean,
        default: false
      },
      /**
       * 顶部toolbar 显示的title
       */
      title: String,
      valueKey: String
    },
    computed: {
      values () {
        const columns = this.columns || []
        const values = []
        columns.forEach(column => {
          values.push(column.value || column.values[column.defaultIndex || 0])
        })
        return values
      }
    },
    methods: {
      handlePickerCancel () {
        this.$emit('cancel', this.values)
      },
      handlePickerConfirm () {
        this.$emit('confirm', this.values)
      },
      /**
       * 处理列`change`事件
       */
      columnValueChange (index) {
        this.$emit('change', this, this.values, index)
      },
      /**
       * 获取对应索引的列的实例
       */
      getColumn (index) {
        const children = this.$children.filter(child => child.$options.name === 'picker-column')
        return children[index]
      },
      /**
       * 获取对应列中选中的值
       */
      getColumnValue (index) {
        const column = this.getColumn(index)
        return column && column.values[column.valueIndex]
      },
      /**
       * 设置对应列中选中的值
       */
      setColumnValue (index, value) {
        const column = this.getColumn(index)
        if (column) {
          column.currentValue = value
        }
      },
      /**
       * 获取对应列中所有的备选值
       */
      getColumnValues (index) {
        const column = this.getColumn(index)
        return column && column.currentValues
      },
      /**
       * 设置对应列中所有的备选值
       */
      setColumnValues (index, values) {
        const column = this.getColumn(index)
        if (column) {
          column.currentValues = values
        }
      },
      /**
       * 获取所有列中被选中的值，返回一个数组
       */
      getValues () {
        return this.values
      },
      /**
       * `values`为一个数组，设置所有列中被选中的值
       */
      setValues (values) {
        values.forEach((value, index) => {
          this.setColumnValue(index, value)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "~common/style/variable.scss";
  .picker {
    position: relative;
    z-index: 1002;
    overflow: hidden;
    background-color: $white;

    &-toolbar {
      height: .6rem;
      line-height: .6rem;
      overflow: hidden;
      padding:.15rem;
      font-size: $font-size-mid-l;
    }

    &-cancel {
      color: #3388FF;
      float: left;
    }

    &-confirm {
      color: #3388FF;
      float: right;
    }

    &-title {
      height: 40px;
      padding: 0 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      word-break: break-all;
      text-align: center;
    }

    &-columns {
      position: relative;
      overflow: hidden;

      &-1 {
        .picker-column {
          width: 100%;
        }
      }

      &-2 {
        .picker-column {
          width: 50%;
        }
      }

      &-3 {
        .picker-column {
          width: 33.333%;
        }
      }

      &-4 {
        .picker-column {
          width: 25%;
        }
      }

      &-5 {
        .picker-column {
          width: 20%;
        }
      }
    }

    .picker-center-highlight {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      width: 100%;
      top: 50%;
      margin-top: -18px;
      pointer-events: none;
    }

    .picker-center-highlight:before,
    .picker-center-highlight:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 100%;
      background-color: #eaeaea;
      display: block;
      transform: scaleY(0.5);
    }

    .picker-center-highlight:before {
      left: 0;
      top: 0;
      bottom: auto;
      right: auto;
    }

    .picker-center-highlight:after {
      left: 0;
      bottom: 0;
      right: auto;
      top: auto;
    }

    &-column {
      font-size: 18px;
      overflow: hidden;
      position: relative;
      max-height: 100%;
      float: left;
      text-align: center;

      &-item {
        height: 44px;
        line-height: 44px;
        padding: 0 10px;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #707274;
        left: 0;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        transition-duration: .3s;

        &-selected {
          color: $black;
        }
      }
    }

    .picker-column-wrapper {
      transition-duration: 0.3s;
      transition-timing-function: ease-out;
    }

    .picker-column-wrapper.dragging,
    .picker-column-wrapper.dragging .picker-item {
      transition-duration: 0s;
    }
  }
</style>