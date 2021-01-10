var opt = {
    type: "basic",
    title: "Cat-astrophic purr-chase",
    message: "your purchase will cost me x hp",
    expandedMessage: "well i might use this or i might not",
    iconUrl: "earth.png",
    silent: true
};
//      Notification.display(opt);
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

function resetIcon(){
    chrome.browserAction.setIcon({path: "icon.png"}, function(){});
}

function format_getURL(url, data){
    var data = url + "?" + 
    "product=" +  data.title.replace(/[^a-z0-9+]+/gi, '')+ "&" +
    "category=" +  data.category.replace("&amp;", "%26") + "&" +
    "isPrime=" +  data.is_prime + "&" +
    "weight=" +  data.weight.replace("&amp;", "%26") + "&" +
    "price=" + data.price.replace("&amp;", "%26") + "&" +
    "zip1=" +  data.user_zip.replace("&amp;", "%26") + "&" +  
    "zip2=" +  data.Manufacturer_contact.replace("&amp;", "%26")

    return data;
}

function httpGetAsync(theUrl, topic)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            var jsonvar = xmlHttp.responseText;
            var jsobj = JSON.parse(jsonvar);
            console.log(jsobj);
            if(jsobj.success){
                chrome.runtime.sendMessage({msg_type: "HTTP_GET_RESP", 
                                            topic: topic, retval: jsobj}, function(response){});
            }
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

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
    else {
        resetIcon();
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
      chrome.browserAction.setIcon({path: "assets/alert2.png"}, function(){});
      var post_url = format_getURL("https://backend.purrtect.live/emissions", request.extraction);
      console.log(post_url);
      httpGetAsync(post_url, "emissions");
      Notification.display(opt);
    }
    else if(request.msg_type === "HTTP_GET_RESP"){
        if(request.topic === "emissions"){
            //we now have emissions data probably update the js or something
            console.log(request.retval);
        }
    }
    sendResponse({farewell: request.msg_type+" success"});
    Promise.resolve("").then(result => sendResponse(result));
    return true;
    }
  );

  chrome.notifications.onClicked.addListener(function(notificationId){
    chrome.tabs.create({ url: "http://purrtect.live/my-cat" });
  });

  chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo){
      resetIcon();
  })


