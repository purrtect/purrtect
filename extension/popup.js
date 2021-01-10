chrome.browserAction.setIcon({path: "assets/icon.png"}, function(){});
var context;


function format_page(){
  if (context.error_state){
    return;
  }
  if (context.is_product_page){
    console.log("run");
    document.getElementById("health").innerText = "PET HP: " + context.hp_change.toString();
    if(context.hp_change>0){
      document.getElementById("old-health").style.backgroundColor = "greenyellow";
      document.getElementById("new-health").style.backgroundColor = "green";
      //change width
      document.getElementById("dialogue").innerText = "an eco friendly purchase feels warm like the sun";
    }
    else{
      //change width
      document.getElementById("dialogue").innerText = "I think this is going to hurt";
    }
  }
}

chrome.runtime.sendMessage({msg_type: "POPUP_CONTEXT"}, function(response) {
  context = Object.assign({}, response.context);
  console.log(context)
  format_page();
});
document.addEventListener('DOMContentLoaded', function() {


    //button1
    var gotositeButton = document.getElementById('go to site');
    gotositeButton.addEventListener('click', function() {
    chrome.tabs.create({ url: "https://purrtect.live/" });
    }, false);


    //button2
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
    //   chrome.tabs.getSelected(null, function(tab) {
    //     alert(tab.url);
    //   });
      chrome.tabs.executeScript(null, {
        file: 'extract_product.js'
    },null);  
    }, false);
  }, false);
