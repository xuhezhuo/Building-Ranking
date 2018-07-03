const app = getApp()
var webhost = app.globalData.webhost;
var getPopular;
var getCity;

Page({
  data: {
    height: '',
    active: '热门',
    top: 43,
    toView: '',
    scroll: false,
    proList: ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'],
    cityList: [],
    city: ''
  },

  tab: function (e) {
    var that = this;
    var tab = e.currentTarget.dataset.tab;
    that.setData({
      city: '',      
      active: tab
    });
    getCity();
  },

  hotClick: function(){
    var that = this;
    that.setData({
      city: '',
      active: '热门'
    });
    getPopular();
  },

  cityClick: function(e) {
    var that = this;
    var city = e.currentTarget.dataset.city;
    that.setData({
      city: city
    })
  },

  submit: function() {
    wx.navigateTo({
      url: './rank?city=' + this.data.city
    })
  },

  onLoad: function (options) {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: res.windowHeight
        })
      }
    })

    getPopular = () => {
      wx.request({
        url: webhost + "getHotCity",
        data: {

        },
        method: 'GET',
        success: function (res) {
          switch (+res.data.code) {
            case 0:
              that.setData({
                cityList: res.data.data
              })
              break;
            case 500:
              wx.showModal({
                title: '服务器好像出现问题了',
                content: res.data.msg,
                showCancel: false,
                confirmColor: '#4aa7fa'
              })
              that.setData({
                cityList: [],
                city: ''
              })
          }
        }
      })
    }

    getCity = () => {
      wx.request({
        url: webhost + "getCity",
        data: {
          provinceName: that.data.active
        },
        method: 'POST',
        success: function (res) {
          switch (+res.data.code) {
            case 0:
              that.setData({
                cityList: res.data.data
              })
              break;
            case 500:
              wx.showModal({
                title: '服务器好像出现问题了',
                content: res.data.msg,
                showCancel: false,
                confirmColor: '#4aa7fa'
              })
              that.setData({
                cityList: [],
                city: ''
              })
          }
        }
      })
    }

    getPopular();
  },

  onShow: function () {
  
  }
})