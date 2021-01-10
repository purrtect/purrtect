var opt = {
    type: "basic",
    title: "Purchase logged!",
    message: "your purchase will cost me x hp",
    expandedMessage: "well i might use this or i might not",
    iconUrl: "assets/icon.png",
    silent: true
};

var popup_context = {
    is_product_page:  false,
    is_checkout_page: false,
    error_state: false,
    emissions: 0,
    hp_change: 0
}
var reset_popup_context = Object.assign({}, popup_context);


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
    chrome.browserAction.setIcon({path: "assets/icon.png"}, function(){});
    popup_context = Object.assign({}, reset_popup_context);
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

function format_getURL2(url, data){
    var data = url + "?" + 
    "product=" +  data.title.replace(/[^a-z0-9+]+/gi, '')+ "&" +
    "isPrime=" +  data.is_prime + "&" +
    "zip1=" +  data.user_zip.replace("&amp;", "%26") + "&" +
    "price=" +  data.price
    return data;
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
                popup_context.hp_change += jsobj.hp_change;
                popup_context.emissions = jsobj.emissions.total_emissions;
            }
            else{
                popup_context.error_state = true;
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
    resetIcon();
    console.log(tab.url);
    if(tab.url === "https://www.amazon.ca/gp/buy/spc/handlers/display.html?hasWorkingJavascript=1"){
        console.log("On amazon checkout page");
        popup_context.is_checkout_page = true;
        chrome.tabs.executeScript(null, {
            file: 'extract_info.js'
        },null);
    }
    else if (tab.url.includes("www.amazon.ca") && (tab.url.includes("/dp/")||tab.url.includes("/product/"))){
        popup_context.is_product_page = true;
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
        for (var i = 0; i<request.item_names.length; i++){
            console.log(request.item_names[i]);
            var post_url = format_getURL2("https://backend.purrtect.live/purchase", {title: request.item_names[i], 
                                                        is_prime:request.item_prime[i], user_zip: request.zip,
                                                        price: request.item_prices[i]});
            httpGetAsync(post_url, "emissions");
        }
        if(popup_context.hp_change<0)
            opt.message = "your purchase cost me ";
        else
            opt.message = "your purchase gave me ";
        opt.message += popup_context.hp_change.toString() + " hp!!!"
        Notification.display(opt);
        sendResponse({farewell: request.msg_type+" success"});
    }
    else if (request.msg_type === "SITE_BASIC_INFO_MSG"){
      chrome.browserAction.setIcon({path: "assets/alert2.png"}, function(){});
      var post_url = format_getURL("https://backend.purrtect.live/emissions", request.extraction);
      httpGetAsync(post_url, "emissions");
      sendResponse({farewell: request.msg_type+" success"});
    }
    else if(request.msg_type === "POPUP_CONTEXT"){
        sendResponse({context: popup_context});
    }
    else if(request.msg_type === "HTTP_GET_RESP"){
        if(request.topic === "emissions"){
            //we now have emissions data probably update the js or something
            console.log(request.retval);
        }
        sendResponse({farewell: request.msg_type+" success"});
    }

    Promise.resolve("").then(result => sendResponse(result));
    return true;
    }
  );

  chrome.notifications.onClicked.addListener(function(notificationId){
    chrome.tabs.create({ url: "https://purrtect.live/" });
  });

  chrome.tabs.onActiveChanged.addListener(function(tabId, selectInfo){
      resetIcon();
  })


