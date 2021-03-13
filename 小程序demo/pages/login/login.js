// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    wx.request({
      url: 'https://wangchen.xyz/adduser',
      data: {
        username: e.detail.value.username,
        pwd: e.detail.value.pwd,
        idcard: e.detail.value.idcard
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        console.log(res.data)
        if (res.data != 'error') {
          wx.showModal({
            title: '成功',
            content: '注册成功'
          })
        }
        else {
          wx.showModal({
            title: '失败',
            content: '注册失败'
          })
        }
      }
    })
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