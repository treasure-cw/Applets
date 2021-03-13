// pages/buy/buy.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    pt1:"",
    pt2:"",
    date1:"",
    time1:"",
    busid:"",
    mails:"",
    stop1:"",
    stop2:"",
    array:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username: app.globalData.currentuser,
      pt1: options.s1,
      pt2: options.s2,
      date1: options.date,
      time1: options.time,
      busid: options.busid,
      mails: options.mails,
      stop1: options.st1,
      stop2: options.st2
    })
  },
  warm:function(e){
    if (this.data.username == "") {
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '该座位已售出',
      })
    }
  },
  buytic:function(e){
    var la = e.currentTarget.dataset.la;
    console.log(la);
    if(this.data.username==""){
      wx.showModal({
        title: '提示',
        content: '请先登录',
      })
    }
    else{
      wx.request({
        url: 'https://wangchen.xyz/buy',
        method:'POST',
        data:{
          pt1:this.data.pt1,
          pt2: this.data.pt2,
          date1: this.data.date1,
          time1: this.data.time1,
          busid: this.data.busid,
          mails: this.data.mails,
          stop1: this.data.stop1,
          stop2: this.data.stop2,
          seatid:la,
          username: this.data.username
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        success: (res) => {
          if(res.data=='ok'){
            wx.showModal({
              title: 'success',
              content: '购买成功',
            })
          }
          else{
            wx.showModal({
              title: 'fail',
              content: '购买失败',
            })
          }
        }
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
    var arr = []
    wx.request({
      url: 'https://wangchen.xyz/find',
      method: 'POST',
      data:{
        date1: this.data.date1,
        busid: this.data.busid,
        stop1: this.data.stop1,
        stop2: this.data.stop2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        if (res.data != '') {
          console.log(res)
          var lis=res.data.split('?')
          console.log(lis)
          this.setData({
            array: lis
          })
        }
        else{
          console.log('faild')
          this.setData({
            array: lis
          })
        }
      }
    })
    this.setData({
      username: app.globalData.currentuser,
    })
    console.log(this.data.username)
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