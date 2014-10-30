//dogeify.js

if (window.top === window) {
    // inject only once!
    safari.self.addEventListener("message", handleMessage, false);

}

function randColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function handleMessage(event) {
    var messageName = event.name;

    if (messageName === "make-dogeify") {
            addSpanColors();
            addLinkColors();
            modifyHeaders();
            getImages();
    }else if (messageName === 'img-response'){
        console.log('img-response data:', event.message);
        appendImages(event.message);
    }else{
        console.log('unexpected messageName:', messageName);
    }


}

function appendImages(data){

    var imgs = document.getElementsByTagName('img');
    console.log('data: %O', data);
    for(var i = 0; i < imgs.length; i++){
        if(i < data.data.children.length && data.data.children[i] != undefined){
            console.log(data.data.children[i].data.url);
            var url = data.data.children[i].data.url;
            if(url.match(/png|jpg|gif/g)){
                imgs[i].src = data.data.children[i].data.url;
            }
        }

    }
//    data.data.children.forEach(function(el){
//        var img = document.createElement('img');
//        img.src = el.data.url;
//        document.body.appendChild(img);
//    });

}

function getImages(){
    console.log('getting images');
    safari.self.tab.dispatchMessage('get-images', null);
}

function addSpanColors(){
  var spans = document.getElementsByTagName('span');
  for (var i = 0; i < spans.length; i++) {
    spans[i].style.color = randColor();
  }
}

function addLinkColors(){
    var links = document.getElementsByTagName('a');
    for(var i = 0; i < links.length; i++){
        links[i].style.color = randColor();
    }
}

function modifyHeaders(){
    var h1s = document.getElementsByTagName('h1');
    var h2s = document.getElementsByTagName('h2');
    var wows = ['Such Wow!', 'Such Nice.', 'Wow!', 'So Cool'];
    var scares = ['so scare', 'plz no', 'so hip!'];

    for(var i = 0; i < h1s.length; i++){
        h1s[i].style.color = randColor();
        h1s[i].style.fontFamily = 'comic sans ms,sans-serif';
        if(i <= wows.length){
            h1s[i].innerHTML = h1s[i].innerHTML + ', ' + wows[i];
        }
    }
    for(var i = 0; i < h2s.length; i++){
        if(i <= scares.length){
            h2s[i].innerHTML = h2s[i].innerHTML + '... ' + scares[i];
        }
    }

}