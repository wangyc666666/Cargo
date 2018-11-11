//app.js
App({
  onLaunch: function () {
    var that = this;    
    //  获取商城名称
    // wx.request({
    //   url: 'https://api.it120.cc/'+ that.globalData.subDomain +'/config/get-value',
    //   data: {
    //     key: 'mallName'
    //   },
    //   success: function(res) {
    //     var mallName = 'cloud云学院';
    //     if (res.data.code == 0) {
    //       //wx.setStorageSync('mallName', res.data.data.value);
    //       wx.setStorageSync('mallName', mallName);
          
    //     }
    //   }
    // })
    var mallName = 'cloud云学院';
    wx.setStorageSync('mallName', mallName);
    // wx.request({
    //   url: 'https://api.it120.cc/' + that.globalData.subDomain + '/score/send/rule',
    //   data: {
    //     code: 'goodReputation'
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.globalData.order_reputation_score = res.data.data[0].score;
    //     }
    //   }
    // })
    // wx.request({
    //   url: 'https://api.it120.cc/' + that.globalData.subDomain + '/config/get-value',
    //   data: {
    //     key: 'recharge_amount_min'
    //   },
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.globalData.recharge_amount_min = res.data.data.value;
    //     }
    //   }
    // })
    // // 获取砍价设置
    // wx.request({
    //   url: 'https://api.it120.cc/' + that.globalData.subDomain + '/shop/goods/kanjia/list',
    //   data: {},
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.globalData.kanjiaList = res.data.data.result;
    //     }
    //   }
    // })
    // 判断是否登录
    let token = wx.getStorageSync('token');

    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    wx.request({
      url: that.globalData.serverDomin + 'auth_token',
      data: {
        token: token
      },
      success: function (res) {
        console.log(res)
        if (res.data['code']!= 0) {
          wx.removeStorageSync('token')
          that.goLoginPageTimeOut()
        }
      }
    })
  },
  // sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString){
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
  //     method:'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       token: wx.getStorageSync('token'),
  //       type:0,
  //       module:'order',
  //       business_id: orderId,
  //       trigger: trigger,
  //       template_id: template_id,
  //       form_id: form_id,
  //       url:page,
  //       postJsonString: postJsonString
  //     },
  //     success: (res) => {
  //       //console.log('*********************');
  //       //console.log(res.data);
  //       //console.log('*********************');
  //     }
  //   })
  // },
  // sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
  //   var that = this;
  //   wx.request({
  //     url: 'https://api.it120.cc/' + that.globalData.subDomain + '/template-msg/put',
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     data: {
  //       token: wx.getStorageSync('token'),
  //       type: 0,
  //       module: 'immediately',
  //       template_id: template_id,
  //       form_id: form_id,
  //       url: page,
  //       postJsonString: postJsonString
  //     },
  //     success: (res) => {
  //       console.log(res.data);
  //     }
  //   })
  // },  
  goLoginPageTimeOut: function () {
    setTimeout(function(){
      console.log('init')
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 2000)
        
  },
  
  globalData:{
    userInfo:null,
    subDomain: "tz",
    serverDomin:"https://hicloudcollege.com/", 
    version: "1.0.0",
    shareProfile: '分享技术生活' // 首页转发的时候话术
  }

})

    // {
    //   "pagePath": "pages/goods-in/index",
    //   "iconPath": "images/nav/goods_in.png",
    //   "selectedIconPath": "images/nav/goods_ined.png",
    //   "text": "进货"
    // },
    // {
    //   "pagePath": "pages/shop-cart/index",
    //   "iconPath": "images/nav/cart-off.png",
    //   "selectedIconPath": "images/nav/cart-on.png",
    //   "text": "购物车"
    // },