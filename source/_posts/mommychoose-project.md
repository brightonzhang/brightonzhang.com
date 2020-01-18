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

### Vant Weapp


```shell
npm i @vant/weapp -S --production 
```


打开项目里的build/webpack.base.conf.js文件，在baseWebpackConfig.plugins数组里增加多一个CopyWebpackPlugin。主要是为了mpvue在编译成微信小程序开发语言的时候，也顺带把vant组件复制到目录里，这样的话才能被项目找到。

```javascript
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../node_modules/@vant/weapp/dist'),
    to: path.resolve(config.build.assetsRoot, './@vant/weapp/dist'),
    ignore: ['.*']
  }
]),
```

### 引入组件

以 Button 组件为例，只需要在`app.json`或`main.json`中配置 Button 对应的路径即可。

```json
// app.json
"usingComponents": {
  "van-button": "/@vant/weapp/dist/button/index"
}
```

### 使用组件

引入组件后，可以在 wxml 中直接使用组件

```xml
<van-button type="primary">按钮</van-button>
```

然后可能就在微信开发者工具控制台看到报错：

`thirdScriptError sdk uncaught third Error Unexpected token export SyntaxError: Unexpected token export`

打开项目ES6转ES5即可。

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

# 一些状态常量

## 云函数错误码

| 错误码 | 描述                 |
| ------ | -------------------- |
| 3001   | 用户错误             |
| 3002   | 参数错误             |
| 3003   | 会员审批失败         |
| 3100   | 商品规格错误         |
| 3101   | 商品库存不足         |
| 3102   | 商品价格错误         |
| 3110   | 订单运单信息错误     |
| 3111   | 订单状态无法直接退款 |
| 3200   | 微信支付错误         |



## 订单状态

```js

const statusMap = [
  ['INIT', '下单'],
  ['PAYING', '待付款'],
  ['DELIVERING', '待发货'],
  ['RECEIVING', '待收货'],
  ['DONE', '已完成'],
  ['REFUND_RETURN_REQUESTING', '退货审核中'],
  ['REFUND_RETURNING', '退货中'],
  ['REFUND_REQUESTING', '退款审核中'],
  ['REFUNDING', '退款中'],
  ['REFUNDED', '已退款'],
  ['CANCLE', '已取消'],
  ['TIMEOUT', '超时未付款'],
];

```



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

### Converting circular structure to JSON

https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format

```js
// Demo: Circular reference
var circ = {};
circ.circ = circ;

// Note: cache should not be re-used by repeated calls to JSON.stringify.
var cache = [];
JSON.stringify(circ, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
});
cache = null; // Enable garbage collection
```

### LeanCloud云引擎休眠

体验实例会执行 [休眠策略](https://leancloud.cn/docs/leanengine_plan.html#hash633315134)，没有请求时会休眠，有请求时启动（首次启动可能需要几秒的时间），每天最多运行 18 个小时。





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

https://youzan.github.io/vant-weapp/#/steps竖向步骤条

可以通过设置`direction`属性来改变步骤条的显示方式

```html
<van-steps
  steps="{{ steps }}"
  active="{{ active }}"
  direction="vertical"
  active-color="#ee0a24"
/>
```

信小程序之物流状态时间轴](https://juejin.im/post/5bd17b0be51d457ab36d00b3) https://github.com/super456/weapp_expressTime

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
微信支付接口中，涉及资金回滚的接口会使用到API证书，包括退款、撤销接口。商家在申请微信支付成功后，收到的相应邮件后，可以按照指引下载API证书，也可以按照以下路径下载：微信商户平台(pay.weixin.qq.com)-->账户中心-->账户设置-->API安全 。

### 文字跑马灯

实现一个微信小程序组件：文字跑马灯效果 https://www.jianshu.com/p/0ff03e5e942e

改为使用van-notice-bar：  https://youzan.github.io/vant-weapp/#/notice-bar

#### 组件生命周期

组件的生命周期，指的是组件自身的一些函数，这些函数在特殊的时间点或遇到一些特殊的框架事件时被自动触发。

其中，最重要的生命周期是 `created` `attached` `detached` ，包含一个组件实例生命流程的最主要时间点。

- 组件实例刚刚被创建好时， `created` 生命周期被触发。此时，组件数据 `this.data` 就是在 `Component` 构造器中定义的数据 `data` 。 **此时还不能调用 `setData` 。** 通常情况下，这个生命周期只应该用于给组件 `this` 添加一些自定义属性字段。
- 在组件完全初始化完毕、进入页面节点树后， `attached` 生命周期被触发。此时， `this.data` 已被初始化为组件的当前值。这个生命周期很有用，绝大多数初始化工作可以在这个时机进行。
- 在组件离开页面节点树后， `detached` 生命周期被触发。退出一个页面时，如果组件还在页面节点树中，则 `detached` 会被触发。

### env(safe-area-inset-bottom)

```css
  .login-button {
    position: fixed;
    bottom: 0;
    bottom: env(safe-area-inset-bottom);
    left: 0;
    right: 0;
    width: 750rpx;
    height: 50PX;
    z-index: 300;
    border-color: transparent;
    // background: yellow;
  }
```



https://www.cnblogs.com/hjj2ldq/p/11579260.html





## #