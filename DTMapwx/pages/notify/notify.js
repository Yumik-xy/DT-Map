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
    readnotify: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getnotify();
    var that = this;
    wx.getStorage({
      key: 'readnotify',
      success: function (res) {
        for (let i in res.data) {
          that.data.readnotify.push(res.data[i])
        };
      }
    })
  },

  getnotify: function () {
    var that = this
    var id = -1
    wx.request({
      url: 'http://127.0.0.1:8000/api/notify?findid=' + String(id),
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
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      },
      fail: function (res) {
        wx.showToast({
          title: '获取失败，请检查网络！',
          icon: 'none',
        })
      },
    })
  },

  loadmore: function () {
    var that = this
    var id = -1
    if (that.data.notify.length > 0) {
      id = that.data.notify[that.data.notify.length - 1].notify_id
      console.log(id)
    }
    wx.request({
      url: 'http://127.0.0.1:8000/api/notify?findid=' + String(id),
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
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      },
      fail: function (res) { }
    })
  },

  messageremove: function () {
    if (this.data.readmsg == 0) return;
    var that = this;
    var notify = this.data.notify;
    wx.showModal({
      title: 'DTMap - 提示',
      content: '是否要清除所有未读消息',
      success(res) {
        if (res.confirm) {
          for (var i = 0; i < notify.length; i++) {
            if (that.data.readnotify.indexOf(notify[i].notify_id) == -1) {
              var isread = 'notify[' + i + '].isread';
              that.setData({
                [isread]: 1
              });
              this.data.readnotify.push(notify[i].notify_id)
              wx.setStorageSync('readnotify', this.data.readnotify);
              wx.getStorage({
                key: 'readnotify',
                success: function (res) {
                  console.log(res)
                }
              })
            }
          }
          that.getReadmsg();

        } else if (res.cancel) {
          console.log('error')
        }
      }
    })
  },

  norifyHandler: function (event) {
    var that = this
    var id = event.currentTarget.dataset.id;
    console.log(id);
    var notify = that.data.notify;
    if (that.data.readnotify.indexOf(notify[id].notify_id) == -1) {
      var isread = 'notify[' + id + '].isread';
      that.setData({
        [isread]: 1
      });
      this.data.readnotify.push(notify[id].notify_id)
      wx.setStorageSync('readnotify', this.data.readnotify);
      wx.getStorage({
        key: 'readnotify',
        success: function (res) {
          console.log(res)
        }
      })
      wx.request({
        url: 'http://127.0.0.1:8000/api/notify/',
        data: {
          readid:String(notify[id].notify_id)
        },
        header: {
          'Content-Type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          if (res.data.status) {
            var isread = 'notify[' + id + '].read_num';
            that.setData({
              [isread]: res.data.data
            });
          }
        }
      })
    }
    that.getReadmsg();
    wx.navigateTo({
      url: './notifydetails/notifydetails?notify=' + JSON.stringify(notify[id]),
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
  onHide: function () { },

  getReadmsg: function () {
    var readmsg = 0;
    var that = this
    var notify = this.data.notify;
    for (var i = 0; i < notify.length; i++)
      if (that.data.readnotify.indexOf(notify[i].notify_id) == -1)
        readmsg += 1;
      else {
        var isread = 'notify[' + i + '].isread';
        that.setData({
          [isread]: 1
        });
      }
    this.setData({
      readmsg: readmsg
    })
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
    this.getnotify();
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