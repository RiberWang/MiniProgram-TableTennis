function convertToStarsArray(stars) {
  var array = [];
  var num = stars/10;
  for(var i= 1; i<=5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      if (i-num == 0.5) {
        array.push(0.5);
      }
      else {
        array.push(0);
      }
    }
  }

  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error);
    },
    complete: function () {

    }
  });
}

module.exports = {
  starsArray: convertToStarsArray,
  http:http
}