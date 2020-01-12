var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [],
    siteApi: null,
    albumID: null,
    skip: 0,
    take: 15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ siteApi: app.globalData.siteApi, albumID: options.albumID })
    this.refresh()
  },

  onPullDownRefresh: function () {
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
      url: siteApi + '/api/photo',
      data: {
        albumID: that.data.albumID,
        skip: that.data.skip,
        take: that.data.take
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        var photos = that.data.photos.concat(res.data)
        //console.log(photos)
        var nextSkip = that.data.skip + that.data.take
        that.setData({ photos: photos, skip: nextSkip })
        wx.hideNavigationBarLoading()
      }
    })
  }
})