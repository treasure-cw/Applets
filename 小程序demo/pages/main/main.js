// pages/main/main.js
var util = require('../../utils/util.js')
var utils = require('../../utils/Dateutil.js')
var dayTime = util.formatTime(new Date()).split(" ")[0]
var timestamp = Date.parse(dayTime) / 1000 + 24 * 60 * 60 *15
var endtime=utils.toDate(timestamp,true)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    position:[],
    array:[],
    position1:"",
    position2:"",
    started:dayTime.replace('/', '-'),
    ended:endtime,
    data1:"",
    view:"first"
  },
  formsubmit: function (e) {
    console.log(e.detail.value)
    var arr = []
    wx.request({
      url: 'https://wangchen.xyz/search',
      data: {
        position1: e.detail.value.chufa,
        position2: e.detail.value.mudi,
        data1: e.detail.value.riqi
      },
      method: 'POST',
      header: {
        'content-type':'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        console.log(res)
        var aaa=res.data.split("!")
        for(var a=0;a<aaa.length;a++){
          var bbb=aaa[a].split(",")
          var ccc=[]
          for(var b=0;b<bbb.length;b++){
            ccc.push(bbb[b])
          }
          arr.push(ccc)
        }
        console.log(arr)
        if (res.data != 'error') {
          wx.showModal({
            title: '提示',
            content: '查询成功'
          })
          this.setData({
            array: arr,
            view: "second"
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '查询失败'
          })
        }
      }
    })
  },
  but:function(e){
    this.setData({
      view: "first"
    })
  },
  pick1:function(event){
    console.log(event)
    this.setData({
      position1:this.data.position[event.detail.value]
    })
  },
  pick2: function (event) {
    console.log(event)
    this.setData({
      position2: this.data.position[event.detail.value]
    })
  },
  pick3: function (event) {
    console.log(event)
    this.setData({
      data1: event.detail.value
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
    wx.request({
      url: 'https://wangchen.xyz/didian',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'chartset': 'utf-8'
      },
      success: (res) => {
        console.log(res)
        var aaa = res.data.split("!")
        console.log(aaa)
        if (res.data != 'error') {
          this.setData({
            position:aaa
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