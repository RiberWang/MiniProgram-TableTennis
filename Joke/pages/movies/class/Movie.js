
class Movie {
  constructor(url) {
    this.url = url;
  }

  getMovieData(cb) {
    this.cb = cb;
    
  }
}