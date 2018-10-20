<template>
  <picker ref="picker" :columns="pickerColumns" show-toolbar :title="title" :visible-item-count="visibleItemCount" @change="handlePickerChange" @confirm="handlePickerConfirm"
    @cancel="handleCancel" showToolbar>
  </picker>
</template>

<script>
  import Picker from '../picker'
  //import {getArea} from 'api/common'
  var getArea = function (){
    
  }
  export default {
    components: {
      Picker
    },
    props: {
      columns: {
        type: Array,
        default: null
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      defaultCityCode: {
        type: Array,
        default: null
      },
      title: {
        type: String,
        default: '地区选择'
      }
    },
    data () {
      return {
        inited: false,
        pickerColumns: [
          {
            values: [],
            className: 'privince'
          },
          {
            values: [],
            className: 'city'
          },
          {
            values: [],
            className: 'area'
          }
        ],
        selectedIds: []
      }
    },
    methods: {
      handlePickerChange (picker, value, index) {
        if (index === 0) {
          let text = value[index]
          let privinceId = this.pickerColumns[index].base.filter(item => {
            return item.text === text
          })[0].id

          this.selectedIds[0] = privinceId

          getArea({id: privinceId}).then(rs => {
            if (rs.data) {
              picker.setColumnValues(1, rs.data.map(item => {
                return item.text
              }))

              let columnTextData = rs.data.find(item => {
                return item.id === this.defaultCityCode[1]
              })

              if (this.defaultCityCode && this.defaultCityCode.length && !this.inited && columnTextData) {
                picker.setColumnValue(1, columnTextData.text)
              }
              this.pickerColumns[1].base = rs.data
            } else {
              picker.setColumnValues(1, '')
              picker.setColumnValues(2, '')
            }
          })
        } else if (index === 1) {
          let text = value[index]
          let arr = this.pickerColumns[index].base.filter(item => {
            return item.text === text
          })
          if (arr.length > 0) {
            let cityId = arr[0].id
            this.selectedIds[1] = cityId

            getArea({id: cityId}).then(rs => {
              if (rs.data) {
                picker.setColumnValues(2, rs.data.map(item => {
                  return item.text
                }))
                let columnTextData = rs.data.find(item => {
                  return item.id === this.defaultCityCode[2]
                })
                if (this.defaultCityCode && this.defaultCityCode.length && !this.inited && columnTextData) {
                  picker.setColumnValue(2, columnTextData.text)
                }
                this.pickerColumns[2].base = rs.data
                if (!this.inited) {
                  this.inited = true
                }
              } else {
                picker.setColumnValues(2, '')
              }
            })
          } else {
            this.selectedIds[1] = ''
          }
        } else if (index === 2) {
          let text = value[index]
          let arr = this.pickerColumns[index].base.filter(item => {
            return item.text === text
          })
          if (arr.length > 0) {
            let areaId = arr[0].id
            this.selectedIds[2] = areaId
          } else {
            this.selectedIds[2] = ''
          }
        }
      },
      handlePickerConfirm (value) {
        value = value.filter((val) => {
          return !!val
        })
        this.$emit('area-confirm', this.selectedIds, value)
      },
      handleCancel () {
        this.$emit('cancel')
        this._reset()
      },
      _getDefaultPrivince () {
        getArea({id: ''}).then(rs => {
          this.pickerColumns[0].base = rs.data
          this.pickerColumns[0].values = rs.data.map(item => {
            return item.text
          })
          this.pickerColumns[0].defaultIndex = rs.data.findIndex(item => {
            return item.id === this.defaultCityCode[0]
          })
        })
      },
      _reset () {
        if (this.defaultCityCode && this.defaultCityCode.length) {
          // this.$refs.picker.setColumnValue(0, this.pickerColumns[0].base.find(item => {
          //   return item.id === this.defaultCityCode[0]
          // }).text)
        } else {
          this.$refs.picker.setColumnValue(0, this.pickerColumns[0].values[0])
        }
      }
    },
    created () {
      this._getDefaultPrivince()
    },
    watch: {
      defaultCityCode () {
        this.inited = false
        this._getDefaultPrivince()
      }
    }
  }
</script>