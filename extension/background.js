var opt = {
    type: "basic",
    title: "Cat-astrophic purr-chase",
    message: "your purchase will cost me x hp",
    expandedMessage: "well i might use this or i might not",
    iconUrl: "earth.png",
    silent: true
};

var Notification=(function(){
    var notification=null;
  
    return {
        display:function(opt){
            notification=chrome.notifications.create(null ,opt, function(notificationId){});
            console.log("created notification");
        },
        hide:function(){
            notification.close();
        }
    };
})();

//detects urls of interest and launches the whole process
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status != "complete"){
        return;
    }

    console.log(tab.url);
    if(tab.url === "https://www.amazon.ca/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1"){
        console.log("On amazon checkout page");
        chrome.tabs.executeScript(null, {
            file: 'extract_info.js'
        },null);
    }
    else if (tab.url.includes("www.amazon.ca") && (tab.url.includes("/dp/")||tab.url.includes("/product/"))){
        chrome.tabs.executeScript(null, {
            file: 'extract_product.js'
        },null);
    }
});
//document.getElementById("spc-orders").getElementsByClassName("asin-title")[0].innerHTML
//recieves message when scraping is complete
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
    if (request.msg_type === "CHECKOUT_INFO_MSG"){
        console.log(request.item_names[0]);
    }
    else if (request.msg_type === "SITE_BASIC_INFO_MSG"){
      console.log(request.extraction);
      Notification.display(opt);
    }
    sendResponse({farewell: request.msg_type+" success"});
    }
  );

  chrome.notifications.onClicked.addListener(function(notificationId){
    //we could make the user open our website if the button gets clicked idk
  });


