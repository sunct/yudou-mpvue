<script>
  export default {
    globalData () {
      return {
        pic: '',
        text: '',
        uid: '2222'
      }
    }
  }
</script>

<style>

    page {
        height: 100%;
    }

    .container {
        height: 100%;
        box-sizing: border-box;
        background-color: #f2f2f2;
    }

    .my_calendar {
        position: fixed;
        height: 45px;
        line-height: 45px;
        width: 100%;
        text-align: center;
        bottom: 0px;
        _position: absolute;
    }

    /* 底部布局 */

    .flex-wrp {
        font-size: 15px;
        display: flex;
        flex-direction: row;
    }

    .today-bar {
        background: url("https://img.sunsanmiao.cn/yudou/today.png") center no-repeat;
    }

    .calendar-bar {
        background: url("https://img.sunsanmiao.cn/yudou/calendar.png") center no-repeat;
    }

    .about-bar {
        background: url("https://img.sunsanmiao.cn/yudou/about.png") center no-repeat;
    }

    .flex-item {
        flex: 1;
        background-size: 24px;
    }

    /*使屏幕变暗  */

    .commodity_screen {
        width: 100%;
        /* height: 100%; */
        position: fixed;
        top: 0;
        left: 0;
        bottom: 40px;
        overflow: hidden;
        z-index: 1000;
        color: #f2f2f2;
    }

    /*日历对话框 */

    /*.commodity_attr_box {*/
        /*height: 330px;*/
        /*width: 100%;*/
        /*overflow: hidden;*/
        /*position: fixed;*/
        /*bottom: 45px;*/
        /*left: 0;*/
        /*z-index: 2000;*/
        /*padding: 0 20px;*/
        /*box-sizing: border-box;*/
        /*background: rgba(63, 63, 71, 0.9);*/
        /*color: #cecece;*/
        /*padding-top: 5px;*/
    /*}*/

    .box1 .dateBox {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin-top: 10px;
        font-size: 40px;
    }

    .box1 {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }

    .box1>view {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 34px;
    }

    .dateOn {
        border-radius: 50%;
        background-color: hotpink;
        color: #fff;
    }

    .box {
        display: flex;
    }

    .box-lr {
        flex-direction: row;
    }

    .box-rl {
        flex-direction: row-reverse;
    }

    .box-tb {
        flex-direction: column;
    }

    .box-bt {
        flex-direction: column-reverse;
    }

    .box-pack-center {
        justify-content: center;
    }

    .box-pack-start {
        justify-content: flex-start;
    }

    .box-pack-end {
        justify-content: flex-end;
    }

    .box-pack-between {
        justify-content: space-between;
    }

    .box-pack-around {
        justify-content: space-around;
    }

    .box-align-center {
        align-items: center;
    }

    .box-align-start {
        align-items: flex-start;
    }

    .box-align-end {
        align-items: flex-end;
    }

    .self-align-center {
        align-self: center;
        margin: 0 auto;
    }

    .self-align-start {
        align-self: flex-start;
    }

    .self-align-end {
        align-self: flex-end;
    }

    .self-align-stretch {
        align-self: stretch;
    }

    .box-wrap {
        flex-wrap: wrap;
    }

    .box-nowrap {
        flex-wrap: nowrap;
    }

    .flex {
        flex-grow: 1;
    }

    .shrink {
        flex-shrink: 1;
    }

    .bg {
        background-image: linear-gradient(to bottom, #faefe7, #ffcbd7);
        overflow: hidden;
    }

    .brown-color {
        color: #d1d1d1;
    }

    .pink-color {
        color: #ff629a;
    }

    .gray-color {
        color: #cecece;
    }

    .gray-2-color {
        color: #3f3f47;
    }

    .white-color {
        color: #fff !important;
    }

    .green-color {
        color: #22cb64 !important;
    }

    .green-2-color {
        color: #8bac9b !important;
    }

    .orange-color {
        color: #ffe800 !important;
    }

    .red-color {
        color: #f71c3b !important;
    }

    .fs20 {
        font-size: 20px !important;
    }

    .fs24 {
        font-size: 24px !important;
    }

    .fs28 {
        font-size: 28px !important;
    }

    .fs32 {
        font-size: 32px !important;
    }

    .fs36 {
        font-size: 36px !important;
    }

    .fs40 {
        font-size: 40px !important;
    }

    .fs48 {
        font-size: 48px !important;
    }

    .fs36 {
        font-size: 36px !important;
    }

    .fs72 {
        font-size: 72px !important;
    }

    .small-caps {
        font-variant: small-caps;
        font-style: italic;
    }

    /* pages/calendar/calendar.wxss */

    .top-handle {
        height: 80px;
    }

    .prev {
        text-align: right;
        height: 80px;
    }

    .next {
        height: 80px;
    }

    .prev-handle {
        width: 80px;
        height: 100%;
    }

    .next-handle {
        width: 80px;
        height: 100%;
    }

    .date-area {
        width: 50%;
        height: 80px;
        text-align: center;
    }

    .weeks {
        height: 42px;
        line-height: 42px;
        background-color: rgba(63, 63, 71, 0.6);
        border-radius: 40px;
    }

    .week {
        text-align: center;

    }

    .days {
        /* height: 200px; */
        padding-top: 5px;
    }

    .grid {
        /* width: 53.4874px; */
    }

    .day {
        width: 60px;
        height: 60px;
        color: #d4d7dc;
        font-size: 28px;
        font-weight: 200;
    }

    .border-radius {
        border-radius: 50%;
        position: relative;
        left: 0;
        top: 0;
        color: #fff;
    }

    .white-bg {
        background-color: #fff;
    }

    .green-bg {
        background-color: #22cb64;
    }

    .blue-bg {
        background-color: #25708d;
    }

    .gray-bg {
        background-color: #3f3f47;
    }

    .green-2-bg {
        background-color: #8cad9c;
    }

    .gray-2-bg {
        background-color: #3f3f47;
    }

    .border-green {
        box-sizing: border-box;
        border: 1.5px solid #22cb64;
        border-radius: 50%;
    }

    .border-green-2 {
        box-sizing: border-box;
        border: 1.5px solid #8bac9b;
        border-radius: 50%;
    }

    .border-orange {
        box-sizing: border-box;
        border: 1.5px solid #ff5722;
        border-radius: 50%;
    }

    .border-brown {
        box-sizing: border-box;
        border: 1.5px solid #d9cfc5;
        border-radius: 50%;
    }

    .pink-bg {
        background-color: #ff629a;
    }

    .purple-bg {
        background-color: #b8b8f1;
    }

    .right-triangle::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-left-color: #ff629a;
        position: absolute;
        right: -22px;
        top: 18px;
    }

    .left-triangle::before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 15px solid transparent;
        border-right-color: #ff629a;
        position: absolute;
        left: -22px;
        top: 18px;
    }

    .tips {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .types {
        background-color: #ffedf4;
        height: 50px;
    }

    .type-dot {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .type-dot-ymq {
        color: rgb(255, 124, 160);
        background-color: rgb(255, 124, 160);
    }

    .type-dot-ycq {
        color: rgb(255, 200, 202);
        background-color: rgb(255, 200, 202);
    }

    .type-dot-aqq {
        color: rgb(118, 191, 92);
        background-color: rgb(118, 191, 92);
    }

    .type-dot-yyq {
        color: rgb(255, 182, 236);
        background-color: rgb(255, 182, 236);
    }

    .type-dot-plr {
        color: rgb(211, 189, 215);
        background-color: rgb(211, 189, 215);
    }

    .types-desc {
        padding: 0 20px;
    }

    .type-name {
        margin-top: 50px;
        margin-bottom: 30px;
    }

    .type-desc {
        padding: 0 35px;
        line-height: 38px;
    }

    .explain {
        border-top: 1px solid #eee;
        width: 90%;
        margin: 20px 5% 20px 5%;
        padding: 20px 0;
    }

    .explain-title {
        font-weight: bold;
        margin-bottom: 15px;
    }

    .explain-item {
        padding: 8px 20px;
        color: #fff;
    }

    .left-border-radius {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .right-border-radius {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    /*留言部分  */

    .vol-card {
        padding: 25px;
        border: 1px solid #fafafa;
        border-radius: 5px;
        background-color: #fff;
        /* box-shadow: 1px 1px 1px #ebebeb;  */
    }

    .vol-ava {
        width: 36px;
        height: 36px;
        border-radius: 2px;
    }

    .vol-right-box {
        padding: 0 0 10px 10px;
        line-height: 20px;
    }

    .vol-up {
        margin: 0 6px;
        padding: 0 6px;
        color: #fff;
        background-color: #888;
    }

    .vol-nick {
        color: #888;
    }

    .vol-comment-empty {
        text-align: center;
        color: #ccc;
        font-size: 14px;
    }

    .vol-del {
        color: #5f749d;
        padding-left: 10px;
    }

    .display-block{
        display:block;
    }
    .display-none{
        display:none;
    }

</style>
