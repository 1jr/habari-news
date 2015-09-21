document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  getNews(makeUrl(), function(text) {
    var newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = text;
  })
}

function makeUrl(){
  months = ['January','February','March','April','May','June','July','August', 'September','October','November','December'];
  var date = new Date(); // is today
  date.setDate(date.getDate()-1);
  var day = date.getDate();
  var month = months[date.getMonth()]; //January is 0!
  var year = date.getFullYear();
  return "https://en.wikipedia.org/wiki/Portal:Current_events/" + year + "_" + month + "_" + day + "?action=render";
}

function getNews(url, callback) {
  var reqest = new XMLHttpRequest();
  reqest.open("GET", url, true);
  reqest.addEventListener("load", function() {
    if (reqest.status < 400){
      var news = reqest.responseText;
      news = news.replace(/ style=\"[^\"]+\"|<!--(.|\s)*-->/g,'');
      news = news.replace(/\"\/\//g,'\"https:\/\/');
      callback(news);
    }
    else {
      callback("Oh, that did not work! Please check your connection!");
    }
  });
  reqest.send(null);
}
