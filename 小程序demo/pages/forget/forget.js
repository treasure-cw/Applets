// pages/forget/forget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit:function(e){
    wx.request({
      url: 'https://wangchen.xyz/forget',
      data: {
        username: e.detail.value.username,
        idcard: e.detail.value.idcard
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        var s = res.data.toString()
        console.log(s)
        if (res.data != 'error'&&res.data!='error1') {
          wx.showModal({
            title: '成功',
            content: "密码："+s
          })
        }
        else if (res.data == 'error') {
          wx.showModal({
            title: '失败',
            content: '身份证错误'
          })
        }
        else{
          wx.showModal({
            title: '失败',
            content: '用户不存在'
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