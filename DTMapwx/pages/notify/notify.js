// pages/notify/notify.js
var util = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgNum: 0,
    readmsg: 0,
    notify: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnotify();
  },

  getnotify: function () {
    var notify = util.getnotify().data;
    console.log(notify);
    this.setData({
      notify: notify,
      msgNum: notify.length,
    })
    this.getReadmsg();
  },
  /**
   * 清除所有未读消息
   **/
  messageremove: function () {
    if (this.data.readmsg == 0) return;
    var that = this;
    wx.showModal({
      title: 'DTMap - 提示',
      content: '是否要清除所有未读消息',
      success(res) {
        if (res.confirm) {
          var notifys = that.data.notify;
          for (var i = 0; i < notifys.length; i++) {
            var isread = 'notify[' + i + '].isread';
            that.setData({ [isread]: 1 });
          }
          that.getReadmsg();
        } else if (res.cancel) {
          console.log('error')
        }
      }
    })
  },

  // upper: function () {
  //   console.log("upper");
  //   this.refresh();
  // },

  // lower: function () {
  //   console.log("lower");
  //   this.loadmore();
  // },

  refresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    this.getnotify();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },

  loadmore: function () {
    wx.showNavigationBarLoading();
    var nextnotify = util.getNextnotify().data;
    console.log(nextnotify);
    this.setData({
      notify: this.data.notify.concat(nextnotify),
      msgNum: this.data.notify.concat(nextnotify).length,
    })
    this.getReadmsg();
    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 500)
  },

  norifyHandler: function (event) {
    var id = event.currentTarget.dataset.id ;
    console.log(id);
    var notifys = this.data.notify;
    var isread = 'notify[' + id + '].isread';
    this.setData({ [isread]: 1 });
    this.getReadmsg();
    wx.navigateTo({
      url: './notify-details/notify-details?notify=' + JSON.stringify(notifys[id]),
    })
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
    this.getReadmsg();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },

  getReadmsg: function () {
    console.log("getReadmsg");
    var readmsg = 0;
    var notify = this.data.notify;
    for (var i = 0; i < notify.length; i++)
      if (notify[i].isread == 0)
        readmsg += 1;
    this.setData({ readmsg: readmsg })
    var that = this;
    if (that.data.readmsg > 0)
      wx.setTabBarBadge({
        index: 1,
        text: this.data.readmsg.toString(),
      });
    else
      wx.removeTabBarBadge({
        index: 1,
      });
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
    this.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadmore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})