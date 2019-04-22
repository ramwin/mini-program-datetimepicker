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
      "init_datetime": "2019-11-11T00:00:00",
    },
  },
  "bindchange": function(res) {
    console.info("修改了日期")
    console.info(res.detail.date);
    console.info(res.detail.date_str);
  },
})
