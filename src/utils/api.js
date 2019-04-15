// import wx from '../wx' // 引用微信小程序wx对象
// const host = 'https://api.sunsanmiao.cn'
const host = process.env.API_BASE_URL
const myKey = process.env.MY_KEY

function paramsHandel (params) {
  params.data.key = myKey
  // let newParamsData = []
  // if (params.method === 'POST') {
  //   newParamsData['params'] = JSON.stringify(params.data)
  //   return newParamsData
  // }
  return params.data
}
function urlHandel (params, url) {
  if (params.method === 'POST') {
    url += '?' + json2Form(params.data)
  }
  return url
}
function ContentType (ctype) {
  let ctypeinfo = {
    'POST': 'application/x-www-form-urlencoded',
    'GET': 'application/json'
  }
  return ctypeinfo[ctype]
}
function json2Form (json) {
  let str = []
  for (let p in json) {
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
  }
  return str.join('&')
}
const wxRequest = (params, url) => {
  params.data = paramsHandel(params)
  // console.log(urlHandel(params, url))
  wx.request({
    url: urlHandel(params, url),
    data: params.data,
    header: {
      'Content-Type': ContentType(params.method)
    },
    method: params.method || 'GET',
    success: (res) => {
      params.success && params.success(res)
    },
    fail: (res) => {
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// Index
// 获取首页信息
const getSinfo = (params) => wxRequest(params, host + 'sindex')
// 获取关于信息
const getAbout = (params) => wxRequest(params, host + 'about')
// 留言评价
const sComment = (params) => wxRequest(params, host + 'scomment')
// 获取留言评价
const getComment = (params) => wxRequest(params, host + 'getcomment')
// 获取未审核的留言评价（用户自己查看自己的）
const getNotCheckComment = (params) => wxRequest(params, host + 'getnotcheckcomment')
// 删除评价
const delComment = (params) => wxRequest(params, host + 'delcomment')
// 登录
const onLogin = (params) => wxRequest(params, host + 'onLogin')
// 获取未审核的所有留言评价
const getNotCheckCommentAll = (params) => wxRequest(params, host + 'gernotcheckcommentall')
// 审核用户的评价并发送通知
const checkComment = (params) => wxRequest(params, host + 'checkcomment')
// 回复留言
const replyComment = (params) => wxRequest(params, host + 'replycomment')

export default {
  getSinfo,
  getAbout,
  sComment,
  getComment,
  getNotCheckComment,
  delComment,
  onLogin,
  getNotCheckCommentAll,
  checkComment,
  replyComment
}
