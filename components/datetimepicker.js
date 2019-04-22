// components/datetimepicker.js
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
  for (var i=0; i<=23; i++) {
    HOUR_RANGE.push({"text": `${i}时`, value:i})
  }
  var MINUTE_RANGE = []
  for (var i=0; i<=59; i++) {
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
    "month": date.getMonth() + 1,
    "day": date.getDate(),
    "hour": date.getHours(),
    "minute": date.getMinutes(),
    "second": date.getSeconds(),
  }
}

function range_to_value(range, selected_value) {
  // 找到range里面每一列对应的value
  var result = [ ]
}

Component({
  properties: {
    config: {
      type: Object,
      observer: function(newVal, oldVal) {
        console.info("传入了新的配置", newVal);
        if (!newVal.init_datetime) {
          newVal.init_datetime = new Date();
        } else {
          console.info("有传入基础的时间");
          newVal.init_datetime = new Date(newVal.init_datetime);
          this.setData({
            "date_str": formattime(newVal.init_datetime),
          })
        }
        if (!newVal.placeholder) {
          newVal.placeholder = "请选择开始时间"
        }
        this.setData({
          "range": get_initial_range(),
          "placeholder": newVal.placeholder,
          "date": newVal.init_datetime,
        })
        this.update_value();
      }
    },
  },
  data: {
    range: undefined,  // 选择的范围
    date_str: undefined,  // 选择的时间的展示内容, 如果为空，说明还没有选择, 否则就是选择或者传入了初始时间
    date: undefined,  // 选择的时间, 必定存在
    placeholder: undefined,  // 如果没有选择时间，显示的内容
    selected_value: [0,0,0,0,0],  // 仅仅是选择的每列的index，但是没有确定
    column_match: {  // 每一列对应的名字
      0: "year",
      1: "month",
      2: "day",
      3: "hour",
      4: "minute",
    },
    column_match_reverse: {  // 每个名字对应的列
      "year": 0,
      "month": 1,
      "day": 2,
      "hour": 3,
      "minute": 4,
    },
  },
  lifetimes: {
    attached: function() {
      console.info("载入了初始组件");
    }
  },
  methods: {
    bindchange: function(res) {
      // console.info("选择了时间", res);
      var result = {
      }
      for (var name in this.data.column_match_reverse) {
        var column_index = this.data.column_match_reverse[name]
        var value = this.data.range[column_index][
          res.detail.value[column_index] // 选择的第几个数据
        ].value
        result[name] = value;
      }
      var date = new Date(
        result["year"],
        result["month"]-1,
        result["day"],
        result["hour"],
        result["minute"],
      )
      this.setData({
        "date": date,
        "date_str": formattime(date),
      })
      this.triggerEvent("datetimechange", {
        "date": this.data.date,
        "date_str": this.data.date_str,
      })
    },
    bindcolumnchange: function(res) {
      var name = this.data.column_match[res.detail.column];
      switch (name) {  // 如果修改了年和月，可能要更改日
        case "year":
        case "month":
          // TODO 需要根据选择的年和月来修改日期列
          break
      }
      this.data.selected_value[res.detail.column] = res.detail.value;
      this.setData({
        "selected_value": this.data.selected_value,
      })
    },
    update_value: function() {
      console.info("根据当前选择的date，设置选择好的时间");
      var scope = this;
      for (var index in this.data.column_match) {
        var name = this.data.column_match[index];
        var value = 0;
        switch (name) {
          case "year":
            value = this.data.date.getFullYear();
            break;
          case "month":
            value = this.data.date.getMonth() + 1;
            break;
          case "day":
            value = this.data.date.getDate();
            break;
          case "hour":
            value = this.data.date.getHours();
            break;
          case "minute":
            value = this.data.date.getMinutes();
            break;
          default:
            continue;
        }
        this.data.range[index].forEach(
          function(item, index2, value2) {
            if (item.value == value) {
              scope.data.selected_value[index] = index2;
            }
          }
        )
      }
      this.setData({
        "selected_value": this.data.selected_value,
      })
    },
  }
})
