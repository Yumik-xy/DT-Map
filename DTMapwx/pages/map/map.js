// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: "",
    longitude: "",
    scale: 16,
    markers: [],
    ifmark: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }]
        })
      },
      fail: function() {
        wx.showToast({
          title: '请手动在用户-设置-权限设置中开启',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  regionchange(event) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置toFixed
    // console.log(event)
    this.setData({ ifmark: (event.type == 'begin' && event.causedBy == 'gesture' ? true : false) })
    if (event.type == 'end' && (event.causedBy == 'scale' || event.causedBy == 'drag')) {
      var that = this;
      this.mapCtx = wx.createMapContext("map");
      this.mapCtx.getCenterLocation({
        type: 'gcj02',
        success: function (res) {
          // console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            markers: [{
              latitude: res.latitude,
              longitude: res.longitude,
            }]
          })
        }
      })
    }
  },

  tothere: function () {
    console.log(this.data.markers)
    wx.openLocation({
      latitude: Number(this.data.markers[0].latitude),
      longitude: Number(this.data.markers[0].longitude),
    })

  },

  reload: function () {
    this.onLoad();
  },

  search: function () {
    // 查询还没写
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