var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    albums: [],
    siteApi: null,
    skip: 0,
    take: 8
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ siteApi: app.globalData.siteApi })
    this.refresh()
  },

  onPullDownRefresh: function () {
    // Do something when pull down.
    console.log('刷新');
  },

  onReachBottom: function () {
    // Do something when page reach bottom.
    this.refresh()
  },
  /**
  * 刷新加载数据
  */
  refresh: function () {
    wx.showNavigationBarLoading();
    var that = this
    var siteApi = app.globalData.siteApi
    console.log(siteApi)
    wx.request({
      url: siteApi + '/api/Album',
      data: {
        skip: that.data.skip,
        take: that.data.take
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var albums = that.data.albums.concat(res.data)
        //console.log(albums)
        var nextSkip = that.data.skip + that.data.take
        that.setData({ albums: albums, skip: nextSkip })
        wx.hideNavigationBarLoading()
      }
    })
  }
})