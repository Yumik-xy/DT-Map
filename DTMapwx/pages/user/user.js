// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userGroup: "未注册用户",
    userInfo: {
      avatarUrl : '../../images/nolog.png'
    },
    useruid: '00000000',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    page: [
      {
        turn_address: "turn_manage",
        item_image_uri: "../../images/manage.png",
        item_name: "管理"
      },
      {
        turn_address: "turn_register",
        item_image_uri: "../../images/register.png",
        item_name: "注册"
      },
      {
        turn_address: "turn_apply",
        item_image_uri: "../../images/apply.png",
        item_name: "申请"
      },
      {
        turn_address: "turn_setup",
        item_image_uri: "../../images/setup.png",
        item_name: "设置"
      },
    ],
  },

  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  turn_setup: function () {
    wx.navigateTo({
      url: 'setup/setup',
    })
  },
  turn_manage: function () {
    wx.navigateTo({
      url: 'manage/manage',
    })
  },
  turn_apply: function () {
    wx.navigateTo({
      url: 'apply/apply',
    })
  },
  turn_register: function () {
    wx.navigateTo({
      url: 'register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userGroup: app.globalData.userStatus,
      useruid: app.globalData.useruid,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})