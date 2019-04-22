# mini-program-datetimepicker
因为工作需要，开发了一个 小程序的日期时间选择组件。 
A component for datetimepicker in the mini-program.

一开始我想使用[dateTimePicker](https://github.com/shuangjie/dateTimePicker)，但是因为存在[问题](https://github.com/shuangjie/dateTimePicker/issues/1)，所以放弃了。

后来也尝试了[`wx_date_picker`](https://github.com/Huge-HD/wx_date_picker)，很可惜没有写成组件，页面其他内容也不够干净。所以也放弃了. 干脆自己写一个

# 安装使用
直接把components文件夹下的datetimepicker复制到自己的项目即可,
[参考demo](./pages/index.wxml)
```
// page.json
{
    "usingComponents": {
        "datetimepicker": "../components/datetimepicker"
    }
}
// page.wxml
<datetimepicker config="{{config}}" on:bindchange="bindchange"></datetimepicker>
```

# 配置
```
config = {
}
```


# 代办事项
* [ ] 支持各种形式的datetimepicker
