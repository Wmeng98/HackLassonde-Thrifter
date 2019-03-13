module.exports = {
  calculatePercentageMatch(queryImg, matchResult) { // category determines which keys to use
    let count = 0;
    let sum = 0;
    for (var prop in matchResult) {
      // queryImg missing some values such as description, store, imgFileName, __id, __v
      if (queryImg.hasOwnProperty(prop)) {
        console.log(prop);
        console.log((queryImg[prop] == null ? 0 : queryImg[prop]) - Math.abs((matchResult[prop] == null ? 0 : matchResult[prop]) - (queryImg[prop] == null ? 0 : queryImg[prop])));
        sum += (queryImg[prop] == null ? 0 : queryImg[prop]) - Math.abs((matchResult[prop] == null ? 0 : matchResult[prop]) - (queryImg[prop] == null ? 0 : queryImg[prop]));
        count+= (queryImg[prop] == null ? 0 : queryImg[prop]);
      }
    }
    console.log("()()()()");
    console.log(sum);
    console.log(count);
    console.log(sum/count);
    console.log("()()()()");
    return ((sum/count * 100).toFixed(2)).toString();
    // round to 2 decimals places and return as a string
  }
}