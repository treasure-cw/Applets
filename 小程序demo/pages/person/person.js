// pages/person/person.js
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    view:'first',
    username:'',
    useridcard:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit:function(e){
    console.log(e.detail.value)
    wx.request({
      url: 'https://wangchen.xyz/hhh',
      data:{
        username:e.detail.value.username,
        pwd:e.detail.value.pwd,
        idcard: e.detail.value.idcard
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        if(res.data!='error'){
          wx.showModal({
            title: '提示',
            content: '登录成功'
          })
          var lis=res.data.split(',')
          console.log(res.data)
          console.log(lis)
          app.globalData.currentuser=lis[1]
          console.log(app.globalData.currentuser)
          if (lis[1] != "admin"){
            this.setData({
              username: e.detail.value.username,
              useridcard: lis[2],
              view: 'second'
            })
          }
          else{
            this.setData({
              username: e.detail.value.username,
              useridcard: lis[2],
              view: 'third'
            })
          }
        }
        else{
          wx.showModal({
            title: '提示',
            content: '登录失败'
          })
        }
      }
    })
  },
  back:function(e){
    this.setData({
      view: 'first'
    })
    app.globalData.currentuser=""
  },
  driver:function(e){
    wx.navigateTo({
      url: '/pages/drivermanager/drivermanager',
    })
  },
  train:function (e) {
    wx.navigateTo({
      url: '/pages/trainmanager/trainmanager',
    })
  },
  station:function (e) {
    wx.navigateTo({
      url: '/pages/stationmanager/stationmanager',
    })
  },
  myinfo: function (e) {
    wx.navigateTo({
      url: '/pages/myinfo/myinfo?nm='+this.data.username+'&&id='+this.data.useridcard,
    })
  },
  change: function (e) {
    wx.navigateTo({
      url: '/pages/changepw/changepw?nm=' + this.data.username,
    })
  },
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