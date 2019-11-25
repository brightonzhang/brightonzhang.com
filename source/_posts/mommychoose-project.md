---
title: 妈咪臻选小程序商城全栈开发
catalog: true
date: 2019-09-26 11:52:30
updated: 2019-11-26 11:52:30
subtitle:
cover:
categories:
  - 技术
tags:
  - 小程序
  - vuejs
  - JavaScript
---

技术栈：

vuejs + node.js

<!--more-->

# 框架选择

要考虑后续扩展，以及后台管理系统复用，选择使用 mpvue。

# 平台选择

## 小程序云开发

云开发提供了云函数、数据库以及存储功能，这样似乎就可以不搭建后台后端服务器。但后来发现，云开发只提供了小程序的 API。服务端 API 还是需要后台服务器去调用。论坛看到有说要提供 JS API，但是没有时间点。所以如果仅此用于开发而不达后端服务器，没办法完成整个商城的功能。既然反正需要后端服务器，那就不在折腾云开发了。

## leancloud

leancloud 提供了比较宽松的免费开发版本，觉得基本可以满足当前商城的使用情况。另外觉得他们家的文档写的比较好。
但是 LeanCloud 中国版 10 月份会开始停止为不绑定自有域名的应用服务。绑定的域名当然还得备案。而现在 LeanCloud 停止了对开发版应用进行备案或者接入的支持，他们建议的方式包括到 IaaS 服务商处自行完成备案和接入（华北节点是和 UCloud 合作，华东节点是和腾讯云合作）。
之前了解过腾讯云的备案要求，要求购买到云服务器三个月以上。看了一下，UCloud 没有购买时长的要求，觉得应该会便宜一些。所以选择了 UCloud 注册域名并备案。

除了数据库，还有大量的商品图片需要保存。LeanCloud 云端也支持「文件」类数据的存储。但是 HTTPS 文件流量无免费的使用额度，而微信小程序强制要求使用 https 访问。所以需要考虑把图片存在其他的地方。而 UCloud 提供了对象存储的功能，可以满足该需求。

# 数据库设计

参考 [数据模型设计指南](https://leancloud.cn/docs/relation-guide.html)

# 踩坑记录

## 后台

### 表格拖拽排序

[Element ui 表格组件+sortablejs 实现行拖拽排序](https://segmentfault.com/a/1190000020210917)

### 图片拖拽

图片拖动排序，删除实现： https://github.com/SortableJS/Vue.Draggable

### 页面刷新跳转提示

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload

### 快递查询

快递 100：免费 100 单试用。同一个快递公司同一个运单号在同一个自然月内多次查询只计一次费用，实时扣费，费用为 0.1 元/单。

快递鸟：免费的即时查询接口: 限 500 次/天（即时查询 仅支持 3 家申通、圆通、中通）

快递鸟 NodeJS 非官方模块 https://github.com/mengkeys/kdniao

### Node.js 发送邮件

Nodemailer 是一个简单易用的 Node.js 邮件发送组件

官网地址：[https://nodemailer.com](https://nodemailer.com/)

GitHub 地址：https://github.com/nodemailer/nodemailer

## 小程序

### 横向滚动

[微信小程序 scroll-view 横向滚动的实践踩坑及隐藏其滚动条的实现](https://segmentfault.com/a/1190000018500042)

### mpvue 中属性表达式使用数组异常

```
// 不正常
 <van-tag
    v-for="(item, index) in sku.level1.tags"
    :key="index"
    :color="selectedSku[0] ==index?'#ff0000':'#000000'"
    size="large"
    plain
    @click="onSkuL1Click(index)"> {{item.name}} </van-tag>

    // 正常
 <van-tag
    v-for="(item, index) in sku.level1.tags"
    :key="index"
    :color="selectedSkuL1 ==index?'#ff0000':'#000000'"
    size="large"
    plain
    @click="onSkuL1Click(index)"> {{item.name}} </van-tag>
```

### background-image

微信小程序通过 background-image 设置背景：只支持线上图片和 base64 图片，不支持本地图片；base64 图片设置步骤如下：

1.在网站http://imgbase64.duoshitong.com/上将图片转成base64格式的文本

2.在 WXSS 中使用以上文本：background-image: url("data:image/png;base64,iVBORw0KGgo=...");

3.为了使背景图片自适应宽高，可以做如下设置：

background-repeat:no-repeat;

background-size:100% 100%;

-moz-background-size:100% 100%;

### 物流状态时间轴

[微信小程序之物流状态时间轴](https://juejin.im/post/5bd17b0be51d457ab36d00b3) https://github.com/super456/weapp_expressTime

### 微信退款

https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_4
https://www.npmjs.com/package/weixin-pay
```js
var params = {
    // appid: 'xxxxxxxx',
    // mch_id: '1234567890',
    // op_user_id: '商户号即可',
    out_refund_no: '20140703'+Math.random().toString().substr(2, 10),
    total_fee: '1', //原支付金额
    refund_fee: '1', //退款金额
    transaction_id: '微信订单号'
};
 
wxpay.refund(params, function(err, result){
    console.log('refund', arguments);
});
```

#
