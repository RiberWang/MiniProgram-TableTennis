var postsData = require("../../../data/post-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    // this.data.currentPostId = postId;
    // this.data.postData = postData;
    this.setData({
      postData: postData,
      currentPostId: postId
    });

    var postCollected = wx.getStorageSync("post_collected");
    if (postCollected) {
      var postCollected = postCollected[postId];
      this.setData({
        collected: postCollected
      });
    } else {
      var postColected = {};
      postColected[postId] = false;
      wx.setStorageSync("post_collected", postColected);
    }
  },

  onCollection: function(event) {
    var postCollected = wx.getStorageSync("post_collected");
    var selected = postCollected[this.data.currentPostId];
    selected = !selected;
    postCollected[this.data.currentPostId] = selected;
    // this.showModal(postCollected, selected);
    this.showToast(postCollected, selected);
  },

  shareTap: function(event) {
    var that = this;
    var itemList = [
      "分享到微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博",
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        console.log(res.tapIndex);
        if (res.tapIndex == 0) {
          // that.onShareAppMessage();
        }
      }

    })
  },

  showModal: function(postCollected, selected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: selected ? '收藏该文章' : "取消收藏该文章",
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确定',
      confirmColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("post_collected", postCollected);
          that.setData({
            collected: selected
          });
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },



  showToast: function (postCollected, selected) {
    wx.setStorageSync("post_collected", postCollected);
    this.setData({
      collected: selected
    });
    wx.showToast({
      title: selected ? "收藏成功" : "取消成功"

    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})