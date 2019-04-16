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
### 图文简介

相关教程可从地址： https://www.sunsanmiao.cn (孙三苗) 搜索关键词 `mpvue`、`小程序`。

- 小程序以图文形式展示，底部三个tab按钮分别是：`回到今日`，`日历选择`，`关于`。
- 点击图片可查看大图。
- 点击日历，可选择日期。如图：
<div style=“”>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/1555335810144.jpg"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-215251@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-221330@2x.png"/>
</div>

- 根据所选日期（不大于今天的日期）可查看当天的图文，选择大于今天的日期默认只展示今天的图文。如图所示：
<div style=“”>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-221150@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-221130@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-215544@2x.png"/>
</div>

- 点击底部`日历`或上方非灰色图层日历部分可收起日历。
- 点击首页的 `写留言`，跳转到写留言界面，需要授权登录。
- 自己写的留言可以在留言页删除。
<div style=“”>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-221942@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-221955@2x.png"/>
<img width=30% src="https://www.sunsanmiao.cn/wp-content/uploads/2019/04/QQ20190415-222023@2x.png"/>
</div>

- 说明：只有管理员才有审核按钮，才能审核留言。审核过的留言才能对所有人可见。

- 返回首页`下拉刷新`，便可看到自己的评论，也可对评论进行`删除`操作。

 
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
