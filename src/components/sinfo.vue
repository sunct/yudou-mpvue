<template name='vol-item' class='sInfo'>

    <div class="" >
    <block v-for="(item,sindex) in sInfo"  :key="skey">
    <swiper-item class="vol-swiper-item">
    <scroll-view scroll-y="true" :style="{'height': '100%'}">
        <div class="vol-card">
            <img class="vol-picture" :src="item.img_url" :data-src="item.img_url" :data-list="item.img_url" mode="aspectFill" @click='seePic'/>
            <div class="vol-meta">
                <text class="vol-number small-caps">NO.<text class="fs20">{{item.id}}</text></text>
                <text v-if="item.img_author" class="vol-author">{{item.img_author}}</text>
            </div>
            <div class="vol-content">
                <text class="vol-content-text"><text selectable='true'>{{item.content}}</text></text>
            </div>
            <div class="vol-makettime">
                <text class="vol-read-num">阅读 {{item.read_num+1}}</text>
            </div>
            <div class="vol-makettime">
                <text class="vol-makettime-text">{{item.show_time}}</text>
            </div>
        </div>

        <div class="vol-comment">
            <view class="test-item" :id="item.id" @click='comment'>写留言</view>
        </div>
        <div class="vol-card vol-nocheck" v-if="nocheckcomment!=''">

            <div class="vol-content" v-for="(item,nindex) in nocheckcomment" :key="i">
                <div class="flex-wrp" style="flex-direction:row;" v-if="delid!=item.id">
                    <div class="vol-ava">
                        <img class="vol-ava" :src="item.avatarUrl" />
                    </div>
                    <div class="flex-wrp vol-right-box" style=" flex-direction:column;">
                        <div class="vol-nick">{{item.nickName}}
                            <text v-if="uid==item.uid" class="vol-del" :id="item.id" :data-index="nindex" :data-ctype="0" :data-sid="item.sid" @click='delComment'>删除</text>
                        </div>
                        <div>{{item.content}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vol-card" style="margin-bottom:70px;">
            <div v-if="comment!=''">
                <div class="vol-content" v-for="(item,cindex) in commentinfo" :key="i">
                    <div class="flex-wrp" style="flex-direction:row;" v-if="delid!=item.id">
                        <div class="vol-ava">
                            <img class="vol-ava" :src="item.avatarUrl" />
                        </div>
                        <div class="flex-wrp vol-right-box" style=" flex-direction:column;">
                            <div class="vol-nick">{{item.nickName}}
                                <text class="vol-up" v-if="item.is_up">置顶</text>
                                <text v-if="uid==item.uid" class="vol-del" :id="item.id" :data-index="cindex" :data-ctype="1" :data-sid="item.sid" @click='delComment'>删除</text>
                            </div>
                            <div>{{item.content}}</div>
                            <block v-if="item.reply_content">
                                <div class="auth-item"><text class="vertical-line">|</text><text class="this-auth">作者</text></div>
                                <div class="reply-content">{{item.reply_content}}</div>
                            </block>

                        </div>
                    </div>
                </div>
            </div>
            <div class="vol-comment-empty" v-else> 暂无留言 </div>
        </div>
    </scroll-view>
    </swiper-item>
    </block>
    </div>
</template>

<script>
  import api from '../utils/api.js'

  export default {
    // 增加一个可从外部传入的属性
    props: {
      timeDate: {
        type: String,
        default: []
      }
    },
    data () {
      return {
        timeDate: this.timeDate,
        sInfo: [],
        uid: '',
        commentinfo: [],
        delid: '',
        nocheckcomment: []

      }
    },
    mounted () {
      // 获取uid
      if (!this.globalData.uid) {
        try {
          let uid = wx.getStorageSync('uid')
          if (uid) {
            this.globalData.uid = uid
          }
        } catch (e) {
          // Do something when catch error
        }
      }
      this.getTodaySinfo()
    },
    onPullDownRefresh () {
      let that = this
      wx.showNavigationBarLoading() // 在标题栏中显示加载
      // 模拟加载
      setTimeout(function () {
        // complete
        that.getTodaySinfo()
        wx.hideNavigationBarLoading() // 完成停止加载
        wx.stopPullDownRefresh() // 停止下拉刷新
      }, 1500)
    },
    methods: {
      getTodaySinfo (time, dir) {
        if (!time) {
          time = this.timeDate
        }
        api.getSinfo({
          method: 'POST',
          data: {
            time: time
          },
          success: (res) => {
            if (res.data.code === 1) {
              // let newSInfo = res.data.data
              let sInfo = res.data.data
              this.sInfo = sInfo
              // 获取评论
              // this.getNotCheckComment(newSInfo[0]['id'])
              this.getComment(sInfo[0]['id'])
              this.getNotCheckComment(sInfo[0]['id'])
            }
          }
        })
      },
      // 图片点击事件
      seePic (event) {
        let src = event.currentTarget.dataset.src // 获取data-src
        let imgArr = []
        let imgList = event.currentTarget.dataset.list // 获取data-list
        imgArr.push(imgList)
        // 图片预览
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: imgArr // 需要预览的图片http链接列表
        })
      },
      // 写留言
      comment (e) {
        let sid = e.currentTarget.id
        wx.navigateTo({ url: '../comment/main?sid=' + sid })
      },
      // 获取留言
      getComment (sid) {
        let uid = this.globalData.uid
        // console.log(this.globalData)
        // console.log(uid)
        api.getComment({
          method: 'POST',
          data: {
            sid: sid
          },
          success: (res) => {
            if (res.data.code === 1) {
              this.commentinfo = res.data.data
              this.uid = uid
              this.delid = ''
            }
          }
        })
      },
      // 获取自己（登录的情况下）未审核的留言
      getNotCheckComment: function (sid) {
        let uid = this.globalData.uid
        api.getNotCheckComment({
          method: 'POST',
          data: {
            sid: sid,
            uid: uid
          },
          success: (res) => {
            if (res.data.code === 1) {
              this.nocheckcomment = res.data.data
              this.uid = uid
              this.delid = ''
            }
          }
        })
      },
      // 删除自己的留言
      delComment (e) {
        let that = this
        let commentinfo = that.commentinfo
        let nocheckcomment = that.nocheckcomment
        let id = e.currentTarget.id
        let ctype = e.currentTarget.dataset.ctype
        // 获取列表中要删除项的下标
        let index = e.target.dataset.index
        api.delComment({
          method: 'POST',
          data: {
            id: id
          },
          success: (res) => {
            if (res.data.code === 1) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
              if (ctype === 1) {
                // 移除列表中下标为index的项
                commentinfo.splice(index, 1)
              } else if (ctype === 0) {
                // 移除列表中下标为index的项
                nocheckcomment.splice(index, 1)
              }
            }
            that.commentinfo = commentinfo
            that.nocheckcomment = nocheckcomment
            that.delid = id
          }
        })
      }
    }
  }
</script>

<style scoped>
    .vol-swiper-item {
        /* padding: 25rpx; */
        box-sizing: border-box;
    }

    .vol-card {
        padding: 15px;
        border: 1px solid #FAFAFA;
        border-radius: 5px;
        background-color: #fff;
        /* box-shadow: 1px 1px 1px #ebebeb;  */
    }

    .vol-picture {
        width: 100%;
    }

    .vol-meta {
        padding: 5px 2px;
        font-size: 12px;
        color: #888;
    }

    .vol-author {
        float: right;
    }

    .vol-content {
        margin-top: 10px;
        padding: 0 5px;
        font-size: 16px;
        line-height: 1;
    }

    .vol-content-text {
        width: 100%;
        min-height: 120px;
        line-height: 25px;
        display: inline-block;
    }
    .vol-makettime {
        font-size: 12px;
        color:  #888;
        text-align: right;
    }
    .vol-read-num{
        font-size: 12px;
    }
    .vol-comment{
        padding:16px 0px;
        text-align: center;
        font-size: 14px;
        color:#5F749D;

    }
    .test-item{
        margin:0 auto;
        width:50px;
    }
    .vol-nocheck{
        margin-bottom:10px;
        background-color:#E9EAEF;
        color:#888;
    }
    .auth-item{
        padding:5px 0px;
        color: #888;
    }
    .vertical-line{
        width:20px;
        font-weight: bolder;
    }
    .this-auth{
        padding-left:5px;
    }
    .reply-content{
        color:#4F705F;
    }
</style>
