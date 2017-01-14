//dogeify.js

function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        callback(data);
    };
    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonp=' + callbackName;
    document.body.appendChild(script);
}

function xhr(url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
       callback(xhr.responseText);
     }
  };
  xhr.send();
}

function randColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function appendImages(data) {

    data = JSON.parse(data) || {};

    var imgs = document.getElementsByTagName('img');

    for(var i = 0; i < imgs.length; i++){
        if(i < data.data.children.length && data.data.children[i] !== undefined){
            //console.log(data.data.children[i].data.url);
            var url = data.data.children[i].data.url;
            if(url.match(/png|jpg|gif/g)){
                imgs[i].src = data.data.children[i].data.url;
            }
        }
    }
}

function getImages() {
  xhr('https://www.reddit.com/r/doge/.json', function(data) {
      appendImages(data);
  });
}

function addSpanColors() {
  var spans = document.getElementsByTagName('span');
  for (var i = 0; i < spans.length; i++) {
    spans[i].style.color = randColor();
  }
}

function addLinkColors() {
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++){
        links[i].style.color = randColor();
    }
}

function modifyHeaders() {
    var h1s = document.getElementsByTagName('h1');
    var h2s = document.getElementsByTagName('h2');
    var wows = ['Such Wow!', 'Such Nice.', 'Wow!', 'NO.'];
    var scares = ['so scare', 'plz no', '...!', '...no.'];

    for(var i = 0; i < h1s.length; i++){
        h1s[i].style.color = randColor();
        h1s[i].style.fontFamily = 'comic sans ms,sans-serif';
        if(i <= wows.length){
            h1s[i].innerHTML = h1s[i].innerHTML + ', ' + wows[i];
        }
    }
    for(var j = 0; j < h2s.length; j++){
        if(j <= scares.length){
            h2s[j].innerHTML = h2s[j].innerHTML + '... ' + scares[j];
        }
    }

}

window.addEventListener('init', function() {  
  addSpanColors();
  addLinkColors();
  modifyHeaders();
  getImages();
});

window.dispatchEvent(new Event('init'));
