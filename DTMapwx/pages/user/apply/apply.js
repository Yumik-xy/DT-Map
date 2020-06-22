// pages/apply/apply.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    showRegion: false,
    phonenumber: 0,
  },

  phone: function (e) {
    this.setData({
      phonenumber: e.detail.value
    })
  },

  getcode: function (e) {
    var that = this
    wx.request({
      url: 'http://127.0.0.1:8000/api/code/',
      data: { phone: that.data.phonenumber },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })
  },

  submit: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'http://127.0.0.1:8000/api/login/',
      data: { name: e.detail.value.name, phone: e.detail.value.telephone },
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
  },

  chooseRegion: function () {
    this.setData({
      showRegion: true,
    });
  },
  emitHideRegion: function (e) {
    this.setData({
      showRegion: e.detail.showRegion,
      regionValue: e.detail.regionValue,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      CN: options,
    });
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