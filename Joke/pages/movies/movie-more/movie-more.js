// pages/movies/movie-more/movie-more.js
var util = require("../../../utils/utils.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: "",
    totalCount: 0,
    isEmpty:true,
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category;
    console.log(options);
    wx.setBackgroundColor({
      backgroundColor: "#DCDCDC"
    });
    wx.setNavigationBarTitle({
      title: category,
    });

    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "v2/movie/coming_soon";
        break;
      case "豆瓣Top250":
        dataUrl = app.globalData.doubanBase + "v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    console.log(dataUrl);
    util.http(dataUrl, this.callBack);
    wx.showNavigationBarLoading();
  },

  // onScrolltoupper: function(event) {
  //   var nextUrl = this.data.requestUrl;
  //   this.data.isEmpty = true;
  //   util.http(nextUrl, this.callBack);
  // },
  onPullDownRefresh: function() {
    console.log("下拉刷新");
    var nextUrl = this.data.requestUrl + "?start=0&count=20";
    this.data.totalCount = 0;
    this.data.movies = [];
    this.data.isEmpty = true;
    util.http(nextUrl, this.callBack);
    wx.showNavigationBarLoading();
  },

  onReachBottom: function() {
    console.log("加载更多。。。");
    var nextUrl = this.data.requestUrl + "?start="+this.data.totalCount+"&count=20";
    util.http(nextUrl, this.callBack);
    wx.showNavigationBarLoading();
  },

  callBack: function (movieData) {
    console.log(movieData);
    var movies = [];
    for (var index in movieData.subjects) {
      var subject = movieData.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }

      var temp = {
        title: title,
        average: subject.rating.average.toFixed(1),
        coverImg: subject.images.large,
        movieId: subject.id,
        stars: util.starsArray(subject.rating.stars)
      };

      movies.push(temp);
    }
    var totalMovies = [];
    if(this.data.isEmpty) {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    else {
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies
    });

    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId,
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
  // onPullDownRefresh: function() {

  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function() {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})