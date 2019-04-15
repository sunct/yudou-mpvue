# 雨豆
> yudou-mpvue
###基于mpvue框架平台的的微信小程序，
<p align="center">
<img width="100" src="https://img.sunsanmiao.cn/yudou/yudou.png" alt="mpvue-calendar logo">
</p>

  - mpvue@2.0.5
  - mpvue-calendar@2.2.0

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```
###图文简介
- 图文展示形式，底部三个按钮分别是：`回到今日`，`日历选择`，`关于`。
- 点击图片可查看大图。
- 点击日历，可选择日期。如图：
<div style=“”>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/1555335810144.jpg"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-215251@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-215544@2x.png"/>
</div>



For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
