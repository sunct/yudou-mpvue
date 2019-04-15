<template>
    <scroll-view scroll-y="true" class="page-body">
        <div class="about-out-box">
            <div class="about-box">
                <div class="logo"></div>
                <block v-for="(item,aindex) in  content" :key='about'>
                    <!-- <navigator url="{{item[0]}}"class="item flex-row"> -->
                    <div class="meta">

                        <div class='title'>
                            <div class="ico-tip"></div>
                            {{item.title}}
                        </div>
                        <div class="about-content">
                            <text>{{item.content}}</text>
                        </div>
                    </div>
                    <!-- </navigator> -->
                </block>
            </div>
        </div>
    </scroll-view>
</template>

<script>
  import api from '../../utils/api.js'
  export default {
    // name: 'about'
    data () {
      return {
        content: []
      }
    },
    mounted () {
      console.log('about')
      this.getAboutinfo(2)
    },
    methods: {
      // 获取about信息
      getAboutinfo (thistype) {
        api.getAbout({
          method: 'POST',
          data: {
            type: thistype
          },
          success: (res) => {
            if (res.data.code === 1) {
              let content = res.data.data[0]
              this.content = content
            }
          }
        })
      }

    }

  }
</script>

<style scoped>
    /* pages/about/about.wxss */

    .logo {
        height: 80px;
        width: 100%;
        text-align: center;
        background: url(https://img.sunsanmiao.cn/yudou/yudou.png) center no-repeat;
        background-size: 70px;
    }

    .title {
        margin: 12px 0px 4px;
        text-align: left;
        font-size: 16px;
    }
    .ico-tip{
        float:left;
        width:30px;
        height:30px;
        background: url(https://img.sunsanmiao.cn/yudou/tip.png) center no-repeat;
        background-size: 26px;
    }
    .about-content {
        color: #888;
    }

    .about-out-box {
        margin: 20px auto;
        width: 94%;
        background: url(https://img.sunsanmiao.cn/yudou/about_bg.png) center no-repeat;
        background-size: 100%;
    }

    .about-box {
        padding: 20px 10px;
        line-height: 30px;
        font-size: 14px;
        /* border: 1px solid #888; */
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.8);
    }

</style>
