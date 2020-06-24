// pages/apply/apply.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    showRegion: false,
    phonenumber: 0,
    encoder: 0,
    sendTime: '获取验证码',
    sendColor: '#666666',
    snsMsgWait: 60
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
        if (res.data.status == false) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
        else {
          that.setData({
            encoder: res.data.encoder
          })
          var inter = setInterval(function () {
            that.setData({
              smsFlag: true,
              sendColor: '#cccccc',
              sendTime: that.data.snsMsgWait + 's后重发',
              snsMsgWait: that.data.snsMsgWait - 1
            });
            if (that.data.snsMsgWait < 0) {
              clearInterval(inter)
              that.setData({
                sendColor: '#363636',
                sendTime: '获取验证码',
                snsMsgWait: 60,
                smsFlag: false
              });
            }
          }.bind(this), 1000);
        }
      }
    })
  },
  submit: function (e) {
    var that = this
    console.log(e.detail.value)
    wx.request({
      url: 'http://127.0.0.1:8000/api/register/',
      data: { name: e.detail.value.name, phone: e.detail.value.telephone, code : '1',verification_code: e.detail.value.vercode, encoder: that.data.encoder, logincode:getApp().globalData.code },
      header: { "content-type": "application/x-www-form-urlencoded" },
      method: 'POST',
      success: function (res) {
        console.log(res)
        if (res.data.status == false) {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        } else if (res.data.status == true) {
          wx.showToast({
            title: '注册成功',
          })
          var regInfo = {
            name: e.detail.value.name,
            phone: e.detail.value.telephone,
            uid: res.data.uid
          }
          wx.setStorageSync('regInfo', regInfo)

        }
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