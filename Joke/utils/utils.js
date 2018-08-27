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

module.exports = {
  starsArray: convertToStarsArray
}