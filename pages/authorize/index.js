// pages/authorize/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  
  },
  bindGetUserInfo: function (e) {
    if (!e.detail.userInfo){
      return;
    }
    
    wx.setStorageSync('userInfo', e.detail.userInfo)

    wx.setStorageSync('uid', e.detail.userInfo.nickName)
    this.login();
  },
  login: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    if (token) {
      wx.request({
        // url: 'https://api.it120.cc/' + app.globalData.subDomain + '/user/check-token',
        url: app.globalData.serverDomin + 'auth_token',
        data: {
          token: token
        },
        success: function (res) {
          if (res.data['code'] != 0) {
            console.log('token 过期')
            wx.removeStorageSync('token')
            that.login();
          } else {
            // 回到原来的地方放
            wx.navigateBack();
          }
        }
      })
      
      return;
    }

    wx.login({
      success: function (res) {
        var iv = res.iv ;
        var encryptedData = res.encryptedData ;
        wx.request({
          url: app.globalData.serverDomin + 'wx_auth',
          data: {
            code: res.code,
          },    
          success: function (res) {
            console.log(res)
            if (res.data['code'] == 1000) {
              // 去注册
              that.registerUser();
              return;
            }
            if (res.data.code != 0) {
              // 登录错误
              
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '无法登录，请重试1',
                showCancel: false
              })
              return;
            }
            wx.setStorageSync('token', res.data['token'])

            //wx.setStorageSync('uid', res.data['uid'])
            let token = wx.getStorageSync('token');
            //回到原来的地方放
            wx.checkSession({
              fail: function(res) {
                wx.showToast({
                  title: '登入过期',
                })
              }
            })
            wx.navigateBack();
          }
        })
      }
    })
  },

  registerUser: function () {
    var that = this;
    wx.login({
      success: function (res) {       
        var code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            var iv = res.iv;
            var encryptedData = res.encryptedData;
            // 下面开始调用注册接口
 
            wx.request({
              url: app.globalData.serverDomin +'wx_registry',
              data: { code: code, encryptedData: encryptedData, iv: iv}, // 设置请求的 参数
              success: (res) => {
                console.log(res)
                wx.hideLoading();
                that.login();
              }
            })
          }
        })
      }
    })
  }
})