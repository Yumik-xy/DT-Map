//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.setStorageSync('regInfo', regInfo)
    var regInfo = wx.getStorageSync('regInfo')
    // wx.request({
    //   url: 'http://127.0.0.1:8000/api/login/',
    //   data:{name:regInfo.name, phone:regInfo.phone},
    // })
    var that =  this
    wx.login({
      success: function (loginCode) {
          // console.log(loginCode.code)
          // 获取openid
         wx.request({
          url: 'http://127.0.0.1:8000/api/login/',
           data: {
            code: loginCode.code, name:regInfo.name, phone:regInfo.phone, uid:regInfo.uid
            },
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            method: 'POST',
            success: function (res) {
              console.log(res)
             if (res.data.status == true) { 
              wx.showToast({
                title: '登陆成功',
              })
              that.globalData.userStatus = 1
              }
            },
            // 获取openid失败
            fail: function (res) {
  
            }
          })
        }
      })

    // 登录
    wx.login({
      success: res => {
        // wx.request({
        //   url: 'http://127.0.0.1:8000/api/login/',
        //   data: { code: res.code },
        //   method: 'GET',
        // })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userStatus:0,
    code:null
  },
})