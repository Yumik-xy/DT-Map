// pages/user/setup/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: '前端技术汇总',
        isShow: false,
        desc: 'html、div+css+js、选择器、居中、闭包、继承、网站重构、优化、迭代、盒模型、BFC、数组、深浅拷贝、本地存储、清除浮动、状态码等等'
      }, {
        title: '前端技术框架',
        isShow: false,
        desc: 'vue、angular、react、bootstrap、backbone、jquery、lay ui、amaze ui、zepot、ionic、flutter、require、echart等等'
      }, {
        title: '前端技术延伸',
        isShow: false,
        desc: '什么是前端，简单讲就是在程序开发中，跟美工设计人员打交道比较多的部分。或者讲是展现给多数用户的操作界面部分，操作界面可以是实体的（比如遥控器、按键面片等），也可以是虚拟的（比如显示器里的各种窗口）。大多数情况下，我们使用的是虚拟界面，也就是利用计算机图形功能，在显示器中画出来供我们操作的部分。虚拟界面的好处就是输入设备简单（通常一个鼠标加一块键盘就行了），还有就是灵活容易变通，如果客户对界面不太满意，改动起来相对容易点。因为是虚拟的图形，所以理论上是可以任意进行延伸的，比如二维的图形不能满足要求了，还可以三维的设计。'
      }, {
        title: '后端技术',
        isShow: false,
        desc: '很多人在开发过程中不太关注数据库，对于表结构的设计也没什么讲究大多属于“能用就行”，但是根据作者将近十年的开发经验来看的话，只要你是从事 Web 相关领域开发你就无法避免不和数据库打交道，在Web开发中大多功能操作本质上都是对数据库进行操作，不管你用是 Pythod，Java，Ruby 等语言进行 Web 开发，你其实都是在面向数据库进行编程'
      }, {
        title: 'UI设计师',
        isShow: false,
        desc: 'UI，即用户界面（User Interface）是系统和用户之间进行交互和信息交换的媒介。简而言之，UI设计师就是设计用户界面。一般我们手机上app的界面都是UI设计师需要设计的。通俗易懂点说，UI就是做界面的，最重要的部分是app界面，看到手机里各种app没？大部分展现在你面前的东西，都是UI设计师需要做的。'
      }
    ]
  },

  listBtn(e) {
    var that = this
    let index = e.currentTarget.dataset.index
    let currect = "list[" + index + "].isShow"
    if (that.data.list[index].isShow === true) {
      console.log("隐藏")
      that.setData({
        [currect]: false
      })
    } else {
      console.log("显示")
      that.setData({
        [currect]: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let dataList = that.data.list
    // dataList.forEach(function(item, index){
    //   dataList[index].isShow = false
    // })
    dataList.map((item, index) => {
      dataList[index].isShow = false
    })
    that.setData({
      list: dataList
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