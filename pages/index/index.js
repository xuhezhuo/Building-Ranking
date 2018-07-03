const app = getApp();

Page({
  data: {
    height: ''
  },

  openAreaWin: () => {
    wx.navigateTo({
      url: './area'
    })
  },

  More: function(){
    // wx.showToast({
    //   title: '敬请期待'
    // })
    wx.navigateToMiniProgram({
      appId: 'wx06d10e4e7baa8307',
      path: 'pages/index/index',
      extraData: {
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  onLoad: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })
  }
})
