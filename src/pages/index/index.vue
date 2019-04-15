<template>
    <div class="container">
        <swiper>
            <sinfo :timeDate="timeDate" ref="sinfo" />
        </swiper>

        <div class="my_calendar">
            <div class="flex-wrp gray-bg white-color">
                <div class="flex-item today-bar"   @click="setToday"></div>|
                <div class="flex-item calendar-bar" @click="showModal"></div>|
                <div class="flex-item about-bar" @click='aboutMe'></div>
            </div>
        </div>
        <!--屏幕背景变暗的背景  -->
        <div class="commodity_screen" @click="hideModal" v-if="showModalStatus"></div>
        <!--弹出框  -->
        <div :animation="animationData" class="commodity_attr_box" v-if="showModalStatus">
            <div>
            <Calendar
                    :months="months"
                    :value="value"
                    @next="next"
                    @prev="prev"
                    :events="events"
                    lunar
                    clean
                    completion
                    :tileContent="tileContent"
                    @select="select"
                    ref="calendar"
                    @selectMonth="selectMonth"
                    @selectYear="selectYear"
                    />
            </div>
            <div class="date-info-tip" @click="dateInfo">{{dateInfoTip}}</div>
        </div>
    </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import util from '../../utils/index.js'
  // 导入自定义模板
  import Sinfo from '@/components/sinfo'
  // [2019，1，1]
  let today = util.formatDate(new Date())
  // 2019-01-01
  let today2 = util.formatDate(new Date(), 2)

  export default {
    data () {
      return {
        timeDate: today2,
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        value: today,
        begin: [2019, 1, 1],
        events: {'2019-1-1': 'begin time '},
        tileContent: [
          {date: '2019-1-1', className: 'holiday', content: '休'},
          {date: '2019-2-2', className: 'work', content: '班'},
          {date: '2019-2-3', className: 'work', content: '班'},
          {date: '2019-2-4', className: 'holiday', content: '休'},
          {date: '2019-2-5', className: 'holiday', content: '休'},
          {date: '2019-2-6', className: 'holiday', content: '休'},
          {date: '2019-2-7', className: 'holiday', content: '休'},
          {date: '2019-2-8', className: 'holiday', content: '休'},
          {date: '2019-2-9', className: 'holiday', content: '休'},
          {date: '2019-2-10', className: 'holiday', content: '休'},
          {date: '2019-4-5', className: 'holiday', content: '休'},
          {date: '2019-4-6', className: 'holiday', content: '休'},
          {date: '2019-4-7', className: 'holiday', content: '休'},
          {date: '2019-5-1', className: 'holiday', content: '休'},
          {date: '2019-5-2', className: 'holiday', content: '休'},
          {date: '2019-5-3', className: 'holiday', content: '休'},
          {date: '2019-5-4', className: 'holiday', content: '休'},
          {date: '2019-5-5', className: 'work', content: '班'},
          {date: '2019-6-7', className: 'holiday', content: '休'},
          {date: '2019-6-8', className: 'holiday', content: '休'},
          {date: '2019-6-9', className: 'holiday', content: '休'},
          {date: '2019-9-13', className: 'holiday', content: '休'},
          {date: '2019-9-14', className: 'holiday', content: '休'},
          {date: '2019-9-15', className: 'holiday', content: '休'},
          {date: '2019-10-1', className: 'holiday', content: '休'},
          {date: '2019-10-2', className: 'holiday', content: '休'},
          {date: '2019-10-3', className: 'holiday', content: '休'},
          {date: '2019-10-4', className: 'holiday', content: '休'},
          {date: '2019-10-5', className: 'holiday', content: '休'},
          {date: '2019-10-6', className: 'holiday', content: '休'},
          {date: '2019-10-7', className: 'holiday', content: '休'}

        ],
        dateInfoTip: '日期信息',
        showModalStatus: false,
        animationData: ''

      }
    },
    components: {
      Calendar, Sinfo
    },
    methods: {
      selectMonth (month, year) {
        console.log(year, month)
      },
      prev (month) {
        console.log(month)
      },
      next (month) {
        console.log(month)
      },
      selectYear (year) {
        console.log(year)
      },
      // 返回今天
      setToday () {
        // 获取今天时间 格式为【2019，1，1】
        let today = util.formatDate(new Date())
        this.value = today
        // 调取选择日期函数，来获取今天的
        this.select(today)
        if (this.$refs.calendar) {
          // 实现跳转
          this.$refs.calendar.setToday()
        }
      },
      // 日期信息
      dateInfo (val) {
        if (this.$refs.calendar) {
          console.log('dateinfo')
          const info = this.$refs.calendar.dateInfo(val[0], val[1], val[2])
          this.dateInfoTip = info['IMonthCn'] + info['IDayCn'] + ' ' + info['gzYear'] + ' ' + '[' + info['Animal'] + '年]' + ' ' + info['gzMonth'] + ' ' + info['gzDay'] + ' ' + info['astro']
        }
      },
      // 选择日期
      select (val) {
        // 日期信息
        this.dateInfo(val)
        // 格式化日期 [2019,1,1]变为2019-01-10
        let time = util.ChangeDateFormat(val)
        // 重新赋值给timeDate
        this.timeDate = time
        // 调取子类函数
        this.$refs.sinfo.getTodaySinfo(time, 1)
      },
      // 显示日历对话框
      showModal () {
        let showStatus = this.showModalStatus
        // 显示遮罩层
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
          delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.showModalStatus = !showStatus
        //  console.log(this.data.showModalStatus)
        if (showStatus === false) {
          showStatus = true
          this.animationData = animation.export()
          this.showModalStatus = showStatus
          setTimeout(function () {
            animation.translateY(0).step()
            this.animationData = animation.export()
            let val = this.value
            this.dateInfo(val)
          }.bind(this), 200)
        } else {
          showStatus = false
          this.animationData = animation.export()
          setTimeout(function () {
            animation.translateY(0).step()
            this.animationData = animation.export()
            this.showModalStatus = showStatus
          }.bind(this), 200)
        }
      },
      // 隐藏对话框
      hideModal () {
        // 隐藏遮罩层
        let animation = wx.createAnimation({
          duration: 200,
          timingFunction: 'linear',
          delay: 0
        })
        this.animation = animation
        animation.translateY(500).step()
        this.animationData = animation.export()
        setTimeout(function () {
          animation.translateY(0).step()
          this.animationData = animation.export()
          this.showModalStatus = false
        }.bind(this), 200)
      },
      // 关于
      aboutMe () {
        this.hideModal()
        wx.navigateTo({ url: '../about/main' })
      }

    }
  }
</script>
<style>
    swiper{
        height: 100%;
    }
    /*日历样式修改*/

    .commodity_attr_box {
        width: 100%;
        overflow: hidden;
        position: fixed;
        bottom: 45px;
        z-index: 2000;
        box-sizing: border-box;
        background: rgba(63, 63, 71, 0.9);
        color: #cecece;
        padding-top: 5px;
    }
    .mpvue-calendar {
        background:rgba(63, 63, 71, 0) !important;
    }
    .mpvue-calendar ._table {
        color: #fff !important;
    }
    .mpvue-calendar ._td .mc-text {
        color: #fff !important;
    }
    .calendar-info>._div.mc-month {
        color: #fff !important;
    }
    .calendar-tools {
        color: #fff !important;
    }
    .date-info-tip{
        width: 100%;
        margin:4px auto;
        text-align: center;
        font-size: 15px;
    }
    .holiday{
        /*position: relative;*/
        border-radius: 5px;
        /*border:1px solid  #B96067;*/
        background-color: #7D7D89;

    }
    .work{
        /*position: relative;*/
        border-radius: 5px;
        /*border:1px solid #6DB877;*/
        background-color: #5E5E67;

    }
    .holiday> .slot-element ,.work > .slot-element{
        top:0px;
        left:0px;
    }

</style>
