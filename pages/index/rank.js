const app = getApp()
var webhost = app.globalData.webhost;
var getBuilding;

Page({
  data: {
    topList: [],
    city: '',
    show: false,
    img: '',
    top: 0
  },

  drawImg: function() {
    var that = this;
    const ctx = wx.createCanvasContext('rank');
    // 填充背景图
    // ctx.drawImage('../images/bg.png', 0, 0, that.data.width, that.data.height)
    //填充背景色
    const grd = ctx.createLinearGradient(that.data.width / 2, 0, that.data.width, that.data.height);
    grd.addColorStop(0, '#2a3e5d');
    // grd.addColorStop(0, '#2c3344');
    grd.addColorStop(1, '#274b7c');
    // Fill with gradient
    ctx.setFillStyle(grd);
    ctx.fillRect(0, 0, that.data.width, that.data.height)

    ctx.setTextAlign('right');
    ctx.setFillStyle('#fff');
    ctx.setFontSize(21);
    ctx.fillText('您所在', that.data.width / 2 - 30, 42);
    ctx.setTextAlign('left');
    ctx.setFillStyle('#f09e47');
    ctx.setFontSize(25);
    ctx.fillText(that.data.city, that.data.width / 2 - 25, 42);
    ctx.setFillStyle('#fff');
    ctx.setFontSize(21);
    ctx.fillText('高楼top10排行榜', 12, 90);
    var topList = that.data.topList;
    for (var i = 0; i < topList.length; i++) {
      ctx.setTextAlign('left');
      ctx.setFillStyle('#fff');
      ctx.setFontSize(16);
      ctx.fillText('TOP' + (i + 1) + ':', 12, 100 + 36 * (i + 1));
      ctx.fillText(topList[i], 72, 100 + 36 * (i + 1));
    }
    ctx.drawImage('../images/qrcode.png', that.data.width - 100, that.data.height - 120, 80, 80)
    ctx.draw();
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'rank',
        success: function(res) {
          console.log(res.tempFilePath);
          that.setData({
            img: res.tempFilePath,
            show: true
          })
          setTimeout(function() {
            that.setData({
              top: 1200
            })
          }, 2000);
        }
      })
    }, 200);
  },

  saveAsPic: function() {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.img,
      success(res) {
        wx.showToast({
          title: '保存成功~',
        })
      }
    })
  },

  back: () => {
    wx.redirectTo({
      url: './area'
    })
  },

  onLoad: function(options) {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          width: res.windowWidth,
          height: res.windowHeight
        })
      }
    })

    if (options.city) {
      that.setData({
        city: options.city
      })
    }

    getBuilding = () => {
      wx.request({
        url: 'https://ten.qykfa.com.cn:8443/TenBuilding/api/building/getBuilding',
        data: {
          cityName: that.data.city
        },
        method: 'POST',
        success: function(res) {
          switch (+res.data.code) {
            case 0:
              that.setData({
                topList: res.data.data
              })
              that.drawImg();
              break;
            case 500:
              wx.showModal({
                title: '服务器好像出现问题了',
                content: res.data.msg,
                showCancel: false,
                confirmColor: '#4aa7fa'
              })
          }
        }
      })
    }

    getBuilding();

    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 2000,
      // 定义动画效果，当前是匀速
      timingFunction: 'step-start'
    })
    // 将该变量赋值给当前动画
    that.animation = animation;
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export()
    })


  },

  onShareAppMessage: function() {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '高楼排行榜',
      path: '/pages/index/index'
    }
  }
})