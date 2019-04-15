<template>
    <div>
        <!--pages/comment/comment.wxml-->
        <div v-if="islogin">
            <form @submit="formSubmit" report-submit bindreset="formReset">
                <div class="s-comment-content">
                    <textarea name="content" maxlength="300" auto-focus="true" placeholder="留言经筛选后显示，对所有人可见" :value="value" />
                </div>
                <div class="btn-area">
                    <button type="primary" formType="submit">留言</button>
                </div>
            </form>
            <div class="vol-card" style="margin-bottom:70px;" v-if="havecomment">
                <div class="flex-wrp" style="flex-direction:row;">
                    <div class="vol-ava">
                        <image class="vol-ava" :src="avatarUrl"></image>
                    </div>
                    <div class="flex-wrp vol-right-box" style=" flex-direction:column;">
                        <div class="vol-nick">{{nickName}}
                            <text class="vol-del" :id="id" @click='delComment'>删除</text>
                        </div>
                        <div>{{content}}</div>
                    </div>
                </div>
            </div>
            <button  type="warn" @click="manage">审核</button>
        </div>
        <div class="need-login" v-else>
            <!-- 如果只是展示用户头像昵称，可以使用 <open-data /> 组件  -->
            <div class="user-ava">
                <open-data class="user-ava" type="userAvatarUrl"></open-data>
            </div>
            <div class="user-nick">
                <open-data type="userNickName"></open-data>
            </div>
            <!-- 需要使用 button 来授权登录 -->
            <button v-if="canIUse" open-type="getUserInfo" type="primary" @getuserinfo="bindGetUserInfo">授权登录</button>
            <div v-else>请升级微信版本</div>
            <!-- <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">111</button> -->
        </div>
        <div v-if="manage">

        </div>
    </div>
</template>

<script>
  import api from '../../utils/api.js'
  export default {
  // name: 'about'
    data () {
      return {
        id: '',
        content: '',
        sid: '',
        islogin: false,
        havecomment: false,
        manage: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        nickName: '',
        avatarUrl: '',
        encryptedData: '',
        iv: ''
      }
    },
    onLoad (options) {
      console.log(options)
      let islogin = false
      let that = this
      this.sid = options.sid
      let manage = false
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            console.log('你已经登陆，请开始你的一顿骚操作:')
            islogin = that.islogin = true

            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                if (!that.globalData.uid) {
                  console.log('去登陆啦')
                  that.onlogin(res)
                }
                // console.log(res)
                that.nickName = res.userInfo.nickName
                that.avatarUrl = res.userInfo.avatarUrl
                that.encryptedData = res.encryptedData
                that.iv = res.iv
              }
            })
          } else {
            console.log('我需要登录')
            islogin = that.islogin = false
          }
          let uid = that.globalData.uid
          if (uid === 2) {
            manage = true
          }
          that.islogin = islogin
          that.manage = manage
        }
      })
    },
    methods: {
      onlogin (e) {
        let that = this
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log('在登陆中 ……')
              // 发起网络请求
              api.onLogin({
                method: 'POST',
                data: {
                  code: res.code,
                  encryptedData: e.encryptedData,
                  iv: e.iv,
                  nickName: e.userInfo.nickName,
                  avatarUrl: e.userInfo.avatarUrl

                },
                success: (res2) => {
                  console.log('登录成功！')
                  if (res2.data.code === 1) {
                    wx.setStorageSync('uid', res2.data.data.id)
                    that.globalData.uid = res2.data.data.id
                    that.islogin = true
                  }
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      },
      // 授权
      bindGetUserInfo (e) {
        // console.log(e)
        this.islogin = true
        this.nickName = e.mp.detail.userInfo.nickName
        this.avatarUrl = e.mp.detail.userInfo.avatarUrl
        this.encryptedData = e.mp.detail.encryptedData
        this.iv = e.mp.detail.iv
        this.onlogin(e.mp.detail)
      },
      // 留言
      formSubmit (e) {
        console.log(e)
        console.log('你输入的内容是：', e.mp.detail.value)

        let fid = e.mp.detail.formId
        let content = e.mp.detail.value.content
        if (content === '' || content == null || content === undefined || content.replace(/(^s*)|(s*$)/g, '').length === 0) {
          return false
        } else {
          console.log('用户信息获取')
          let nickName = this.nickName
          let avatarUrl = this.avatarUrl
          if (!(nickName && avatarUrl)) {
            return false
          }
          console.log('开始请求')
          let uid = this.globalData.uid
          api.sComment({
            method: 'POST',
            data: {
              sid: this.sid,
              content: content,
              nickName: nickName,
              avatarUrl: avatarUrl,
              uid: uid,
              fid: fid
            },
            success: (res) => {
              if (res.data.code === 1) {
                console.log('留言成功')
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
                this.id = res.data.data
                this.content = content
                this.nickName = nickName
                this.avatarUrl = avatarUrl
                this.havecomment = true
                this.value = ''
              } else {
                this.havecomment = false
              }
            }
          })
        }
      },
      // 审核
      manage (e) {
        wx.navigateTo({url: '../manage/manage'})
      },
      // 删除留言
      delComment (e) {
        let that = this
        let id = e.currentTarget.id
        api.delComment({
          method: 'POST',
          data: {
            id: id
          },
          success: (res) => {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
            that.havecomment = false
          }
        })
      }
    }
  }
</script>

<style scoped>
    button {
        width: 88%;
        margin:20px;
    }
    textarea  {
        width: 100%;
    }
    .s-comment-content {
        padding: 10px;
        margin: 10px;
        border: 1px solid #ccc;
        font-size: 14px;
    }

    .need-login {
        padding-top: 30%;
        text-align: center;
    }

    .user-ava {
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }

    .user-nick {
        margin: 10px 0px;
    }


</style>
