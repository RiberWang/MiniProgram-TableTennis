var util = require("../../utils/utils.js")

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
    // 粒度
    var inTheaterUrl = app.globalData.doubanBase+  "v2/movie/in_theaters?start=1&count=3";
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = app.globalData.doubanBase +"/v2/movie/top250?start=0&count=3";
    
    this.getMovieListData(inTheaterUrl, "intheater");
    this.getMovieListData(comingSoonUrl, "comingsoon");
    this.getMovieListData(top250Url, "top250");
  },

  getMovieListData: function(url, key) {
    var that = this;
    wx.request({
      url: url,
      method: "GET",
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res);
        that.handleResData(res.data, key);
      },
      fail: function (error) {
        console.log(error);
      },
      complete: function () {

      }
    });
  },

  handleResData: function(movieData, key) {
    var movies = [];
    for(var index in movieData.subjects) {
      var subject = movieData.subjects[index];
      var title = subject.title;
      if(title.length >= 6) {
        title = title.substring(0, 6)+"...";
      }

      var temp = {
        title:title,
        average:subject.rating.average.toFixed(1),
        coverImg:subject.images.large,
        movieId:subject.id,
        stars: util.starsArray(subject.rating.stars)
      };

      movies.push(temp);
    } 

    var totalData = {};
    totalData[key] = {
      movies:movies
    };
    this.setData(totalData);
  },

  onMoreTap: function (event) {
    console.log(event);
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'movie-more/movie-more?category='+category,
    });
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