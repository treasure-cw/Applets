// pages/ticket/ticket.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view:'',
    array: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.currentuser)
    if (app.globalData.currentuser!=""){
      this.setData({
        view: 'first'
      })
    }
    else{
      this.setData({
        view: 'second'
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
    if (app.globalData.currentuser != "") {
      var arr = []
      wx.request({
        url: 'https://wangchen.xyz/load',
        data: {
          username: app.globalData.currentuser
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        success: (res) => {
          console.log(res)
          var aaa = res.data.split("!")
          for (var a = 0; a < aaa.length; a++) {
            var bbb = aaa[a].split(",")
            var ccc = []
            for (var b = 0; b < bbb.length; b++) {
              ccc.push(bbb[b])
            }
            arr.push(ccc)
          }
          console.log(arr)
          this.setData({
            view: 'first',
            array: arr
          })
        }
      })
    }
    else {
      this.setData({
        view: 'second'
      })
    }
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