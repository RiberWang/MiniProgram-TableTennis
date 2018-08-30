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

//将数组转换为以 / 分隔的字符串
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  starsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}