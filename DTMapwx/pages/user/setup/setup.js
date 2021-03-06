// pages/user/setup/setup.js
var app = require("../../../app.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: [
      {
        turn_address: "turn_change_phonenumber",
        item_name: "改绑手机号",
        item_height: 12
      }, {
        turn_address: "turn_permission_settings",
        item_name: "权限设置",
        item_height: 0
      }, {
        turn_address: "turn_privacy_policy",
        item_name: "隐私政策",
        item_height: 0
      }, {
        turn_address: "turn_help",
        item_name: "帮助",
        item_height: 0
      }, {
        turn_address: "turn_feedback",
        item_name: "意见反馈",
        item_height: 30
      },
      {
        turn_address: "turn_sign_out",
        item_name: "退出DTMap",
        item_height: 0
      },
    ],
  },
  turn_privacy_policy: function () {
    wx.navigateTo({
      url: 'privacy/privacy',
    })
  },
  turn_feedback: function () {
    wx.navigateTo({
      url: 'feedback/feedback',
    })
  },
  turn_help: function () {
    wx.navigateTo({
      url: 'help/help',
    })
  },

  turn_change_phonenumber: function () {
    wx.navigateTo({
      url: 'changephonenumber/changephonenumber',
    })
  },

  turn_permission_settings: function () {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
      }
    })
  },

  turn_sign_out: function () {
    wx.removeStorage({
      key: 'regInfo',
      success(res) {
        console.log(res)

      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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