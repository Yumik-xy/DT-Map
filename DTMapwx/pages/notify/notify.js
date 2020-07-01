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
    var that = this
    var id = -1
    wx.request({
      url: 'http://127.0.0.1:8000/api/notify?id=' + String(id),
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var notify = res.data.data
          notify.forEach(function (item, index) {
            notify[index].isread = 0
          })

          that.setData({
            notify: notify,
            msgNum: notify.length,
          })
          that.getReadmsg();
        }
      },
      fail: function (res) {
      }
    })
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

    var that = this
    var id = -1
    if (that.data.notify.length > 0) {
      id = that.data.notify[that.data.notify.length - 1].notify_id
      console.log(id)
    }
    wx.request({
      url: 'http://127.0.0.1:8000/api/notify?id=' + String(id),
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var notify = res.data.data
          notify.forEach(function (item, index) {
            notify[index].isread = 0
          })

          that.setData({
            notify: that.data.notify.concat(notify),
            msgNum: that.data.notify.concat(notify).length,
          })
          that.getReadmsg();
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      },
      fail: function (res) {
      }
    })
  },

  norifyHandler: function (event) {
    var id = event.currentTarget.dataset.id;
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