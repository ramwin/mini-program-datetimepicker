// components/datetimepicker.js
var now = new Date();
function get_initial_range() {
  var YEAR_RANGE = []
  for (var i=2018; i<=2021; i++) {
    YEAR_RANGE.push({"text": `${i}年`, value: i})
  }
  var MONTH_RANGE = []
  for (var i=1; i<=12; i++) {
    MONTH_RANGE.push({"text": `${i}月`, value: i})
  }
  var DAY_RANGE = []
  for (var i=1; i<=31; i++) {
    DAY_RANGE.push({"text": `${i}日`, value:i})
  }
  var HOUR_RANGE = []
  for (var i=1; i<=23; i++) {
    HOUR_RANGE.push({"text": `${i}时`, value:i})
  }
  var MINUTE_RANGE = []
  for (var i=1; i<=60; i++) {
    MINUTE_RANGE.push({"text": `${i}分`, value:i})
  }
  return [YEAR_RANGE, MONTH_RANGE, DAY_RANGE, HOUR_RANGE, MINUTE_RANGE]
}

function formattime(date) {
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分`
}

function date2object(date) {
  return {
    "year": date.getFullYear(),
    "month": date.getMonth(),
    "day": date.getDate(),
    "hour": date.getHours(),
    "minute": date.getMinutes(),
    "second": date.getSeconds(),
  }
}

const INIT_CONFIG = {
  placeholder: "请选择开始时间",
  init_datetime: now,
}

Component({
  properties: {
    config: {
      type: Object,
      value: INIT_CONFIG,
      observer: function(newVal, oldVal) {
        // console.info("传入了新的配置", newVal);
        this.setData({
          "config_inner": newVal,
        })
        if (newVal.placeholder) {
        }
      }
    },
  },
  data: {
    range: get_initial_range(),
    date_str: undefined,
    date: undefined,
    config_inner: INIT_CONFIG,
    selected_value: date2object(now),  // 仅仅是选择的，但是没有确定
    column_match: {
      "0": "year",
      "1": "month",
      "2": "day",
      "3": "hour",
      "4": "minute",
      "5": "second",
    },
  },
  methods: {
    bindchange: function(res) {
      // console.info("选择了时间", res);
      var year = this.data.range[0][res.detail.value[0]].value
      var month = this.data.range[1][res.detail.value[1]].value
      var day = this.data.range[2][res.detail.value[2]].value
      var hour = this.data.range[3][res.detail.value[3]].value
      var minute = this.data.range[4][res.detail.value[4]].value
      var date = new Date(year, month-1, day, hour, minute)
      this.setData({
        "date": date,
        "date_str": formattime(date),
      })
      this.triggerEvent("datetimechange", {
        "date": this.data.date,
      })
    },
    bindcolumnchange: function(res) {
      // console.info("修改了一列", res);
      var name = this.data.column_match[res.detail.column];
      this.data.selected_value[name] = this.data.range[
        res.detail.column][res.detail.value]["value"]
      // console.info(this.data.selected_value)
      this.setData({
        "selected_value": this.data.selected_value,
      })
    },
  }
})
