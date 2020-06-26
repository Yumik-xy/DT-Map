// pages/user/apply/apply.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    showRegion: false,
    images: [],
    currentBoxId: 'chooseType', //当前显示的view的id
    isBoxShow: false,
    activeNum:1,
    steps: [{ 'stepName': '填写信息' }, { 'stepName': '证件上传' }, { 'stepName': '业务提交' },]

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
  changeBox(e){
    let currentFlag = e.currentTarget.id;
    switch(currentFlag){
      case 'chooseTypenext':
        this.setData({
          currentBoxId: 'viewInstruction'
        })
        this.setData({
          activeNum:2
        })
        break;
      case 'viewInstructionPrev':
        this.setData({
          currentBoxId: 'chooseType'
        })
        this.setData({
          activeNum:1
        })
        break;
      case 'viewInstructionNext':
        this.setData({
          currentBoxId: 'finish'
        })
        this.setData({
          activeNum:3
        })
        break;
        case 'finishPrev':
          this.setData({
            currentBoxId: 'viewInstruction'
          })
          this.setData({
            activeNum:2
          })
          break;
        default:
          this.setData({
            currentBoxId: 'viewInstruction'
          })
          break;
    }
 
  },




  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        const images1 = images.length <= 3 ? images : images.slice(0, 3)
        this.setData({
          images: images1
        })
      }
    })
  },
  removeImage(e) {
    var that = this;
    var images = that.data.images;
    // 获取要删除的第几张图片的下标
    const idx = e.currentTarget.dataset.idx
    // splice  第一个参数是下表值  第二个参数是删除的数量
    images.splice(idx,1)
    this.setData({
      images: images
    })
  },
 
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  submit: function (e) {
    var that = this
    // var imgfile;
    var namen = ['身份证正面','身份证反面','手持身份证照']
    var regInfo = wx.getStorageSync('regInfo')
    for (var i = 0; i < this.data.images.length; i++) {//循环遍历图片 
      wx.uploadFile({
        url: 'http://127.0.0.1:8000/api/image/',//自己的接口地址
        filePath: that.data.images[i],
        name: 'image',
        header: { "content-type": "application/x-www-form-urlencoded" },
        method: 'POST',
        formData: {
          'name' : namen[i],
          'phone' : regInfo.phone,
        },
        success: function (res) {
          var data = JSON.parse(res.data)
          console.log(res)
          console.log(res.data)
          console.log(res.data.status)
          if (data.status == true) {
            wx.showToast({
              title: '上传成功！',
              duration: 3000,
            }),
            that.setData({
              images: []
            })
            setTimeout(function (){
              wx.navigateBack({
                delta: 0 //返回上一级页面
              })
            },2000)
          }
        }
      })
      }
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