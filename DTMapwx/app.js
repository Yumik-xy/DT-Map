//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
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
    userInfo: null
  },

//   login: function () {//封装成方法，方便在小程序其他页面调用
//     console.log("进入登录-------")
//     var that = this;
//     wx.login({ //微信官方登录方法
//        fail: function (err) {
//           console.log("login.fail", err);
//        },
//        complete: function (msg) {
//           console.log("login.complete", msg);
//        },
//        success: function (loginInfo) {//登录成功，拿到第三方平台code
//     //这里因为产品需求，调用了第三方平台的code,做了判断和保存
//           that.globalData.loginInfo = loginInfo.code   //存取第三方平台code到公用数据字段
//           if (wx.getExtConfig) {//第三方平台判断，具体不知道啥意思，API这么写的
//              wx.getExtConfig({ //确定第三方平台信息拿到，开始调用登录接口。
//                 success: function (res) {
//                    that.globalData.code = res.extConfig.code; //这个code是微信的code和第三方的code不一样。
//                    wx.request({ //请求方式和参数，做过交互的一看就懂，不多BB
//                       url: (that.globalData.server_root2 + "/v1/user/login"),
//                       method: "POST",
//                       header: {
//                          'content-type': 'application/x-www-form-urlencoded'
//                       },
//                       data: {
//                          wxcode: loginInfo.code,
//                          code: res.extConfig.code 
//                       },
//                       success: function (result) {
//                       //登录接口调用成功以后，会拿到两个参数
//                       //1.用户的唯一标识（每个用户的唯一标识都不一样）
//                       //2.sessionKey  ，每次登录的sessionKey 都不一样。
                      
//                          var userInfo = {
//                          //这是我自己定义的一个对象，这里面的数据是根据微信获取用户信息的格式来定义的，方便做获取用户信息的时候，获取的数据存储位置统一。
//                             //生日
//                             birthday: result.data.data.birthday,
//                             //性别 0未知 1男 2女
//                             gender: result.data.data.gender,
//                             //用户头像
//                             head_photo: result.data.data.head_photo,
//                             //用户微信昵称
//                             nick_name: result.data.data.nick_name,
//                             // 真实姓名
//                             real_name: result.data.data.real_name,
//                          };
     
//                       }
//                    });
//                 }
//              })
//           }
//        }
//     })
//  }

})