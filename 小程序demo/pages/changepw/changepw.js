// pages/changepw/changepw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    pwd:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name:options.nm
    })
  },
  formSubmit:function(e){
    wx.request({
      url: 'https://wangchen.xyz/change',
      data: {
        pwd: e.detail.value.pwd,
        nme:this.data.name
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        if (res.data != 'error') {
          wx.showModal({
            title: '成功',
            content: '修改成功'
          })
        }
        else{
          wx.showModal({
            title: '失败',
            content: '修改失败'
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