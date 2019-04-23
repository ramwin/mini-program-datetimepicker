//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "datetimepicker_config": {
      placeholder: "选择开始时间(外部传入的)"
    },
    "datetimepicker_config2": {
      placeholder: "选择开始时间(外部传入的)",
      "init_datetime": "2019-01-31T00:00:00",
    },
  },
  "bindchange": function(res) {
    console.info("修改了日期")
    console.info(res.detail.date);
    console.info(res.detail.date_str);
  },
  change_config: function() {
    this.data.datetimepicker_config2.init_datetime = "2018-11-11T01:02:03"
    this.data.datetimepicker_config.init_datetime = "2018-11-11T01:02:03"
    this.setData({
      "datetimepicker_config": this.data.datetimepicker_config,
      "datetimepicker_config2": this.data.datetimepicker_config2
    })
  }
})
