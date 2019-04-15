<template>
    <div>
        <Calendar
                :months="months"
                :value="value"
                @next="next"
                @prev="prev"
                :events="events"
                lunar
                clean
                @select="select"
                ref="calendar"
                @selectMonth="selectMonth"
                @selectYear="selectYear"
        />
        <button @click="setToday">返回今日</button>
        <button @click="dateInfo">日期信息</button>
        <button @click="renderer">重新渲染年月日期</button>
    </div>
</template>

<script>
  import Calendar from 'mpvue-calendar'
  import util from '../../utils/index.js'
  export default {
    data () {
      let today = util.formatDate(new Date())
      return {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        value: today,
        begin: [2019, 1, 1],
        events: {'2019-1-1': 'begin time '}
      }
    },
    components: {
      Calendar
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
      setToday (val, val1, val2) {
        console.log(val, val1, val2)
        this.$refs.calendar.setToday()
      },
      // dateInfo () {
      //   const info = this.$refs.calendar.dateInfo(2019, 4, 23)
      //   console.log(info)
      // },
      // renderer () {
      //   // 渲染2018年8月份
      //   this.$refs.calendar.renderer(2019, 4)
      // },
      select (val, val2) {
        console.log(val)
        console.log(val2)
      }
    }
  }
</script>
<style>


</style>
