//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    "datetimepicker_config": {
      placeholder: "选择开始时间(外部传入的)"
    },
  },
  "bindchange": function(res) {
    console.info("修改了日期", res.detail.date);
  }
})
