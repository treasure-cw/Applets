// pages/stationmanager/stationmanager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    id:"",
    name:""
  },
  but:function(e){
    wx.navigateTo({
      url: '/pages/addstation/addstation',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var arr = []
    wx.request({
      url: 'https://wangchen.xyz/station',
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
        if (res.data != 'error') {
          wx.showModal({
            title: '成功',
            content: '查询成功'
          })
          this.setData({
            array: arr
          })
        }
        else {
          wx.showModal({
            title: '失败',
            content: '查询失败'
          })
        }
      }
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
    var arr = []
    wx.request({
      url: 'https://wangchen.xyz/station',
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
        if (res.data != 'error') {
          wx.showModal({
            title: '成功',
            content: '查询成功'
          })
          this.setData({
            array: arr
          })
        }
        else {
          wx.showModal({
            title: '失败',
            content: '查询失败'
          })
        }
      }
    })
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