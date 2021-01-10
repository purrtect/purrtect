chrome.browserAction.setIcon({path: "assets/icon.png"}, function(){});
var context;
var MAX_HEALTH = 20;
var cat;
var userName;


function format_page(){
  document.getElementById("num_health").innerText = cat.hp.toString() + "/20";
  document.getElementById("file").value = cat.hp;
  document.getElementById("title").innerText = cat.name;
  if (cat.hp > 15){
    //happy
    document.getElementById("cat_vid").src = "assets/cat_run_12fps.gif";
    document.getElementById("dialogue").innerHTML = "\"Feline good\"";
  }
  else if(cat.hp>7){
    //neutral
    document.getElementById("dialogue").innerHTML = "\"All this polluting makes me want to nap\"";
    document.getElementById("cat_vid").src = "assets/cat_idle_blink_8fps.gif";
  }
  else if(cat.hp = 0){
    document.getElementById("dialogue").innerHTML = "R.I.P";
    document.getElementById("cat_vid").src = "assets/cat_die_12fps.gif";
    
  }
  else{
    //mad
    document.getElementById("dialogue").innerHTML = "\"meowser.... I need help\"";
    document.getElementById("cat_vid").src = "assets/cat_sneak_8fps.gif";
  }
  if (context.error_state){
    return;
  }
  if (context.is_product_page){

    if(context.hp_change>=0){
      //change width
      document.getElementById("cat_vid").src = "assets/cat_dash_12fps.gif";
      document.getElementById("dialogue").innerText = "an eco friendly purchase feels warm like the sun";
      document.getElementById("health").innerText = "PET HP: +" + context.hp_change.toString();
    }
    else{
      //change width
      document.getElementById("cat_vid").src = "assets/cat_hurt_12fps.gif";
      document.getElementById("dialogue").innerText = "I think this is going to hurt";
      document.getElementById("health").innerText = "PET HP: " + context.hp_change.toString();
    }
  }
}

function httpGetAsync(theUrl, topic)
{   console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            var jsonvar = xmlHttp.responseText;
            var jsobj = JSON.parse(jsonvar);
            console.log(jsobj);
            if(jsobj.success){
              cat = jsobj.cat;
              userName = jsobj.userNaME;
            }
            format_page();
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

chrome.runtime.sendMessage({msg_type: "POPUP_CONTEXT"}, function(response) {
  context = Object.assign({}, response.context);
  console.log(context);
  httpGetAsync("http://backend.purrtect.live/cat", "");
});
document.addEventListener('DOMContentLoaded', function() {


    //button1
    var gotositeButton = document.getElementById('go to site');
    gotositeButton.addEventListener('click', function() {
    chrome.tabs.create({ url: "https://purrtect.live/" });
    }, false);

  }, false);
