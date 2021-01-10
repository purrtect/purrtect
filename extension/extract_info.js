// console.log(document.title);
// var title = document.title.substr(0,document.title.indexOf(":"));
// var category = ""
// var price = 0;
// var weight = 0;
// var ASIN = "";

// chrome.runtime.sendMessage({msg_type: "SITE_BASIC_INFO_MSG", title: title, category: category, price: price, weight: weight, ASIN: ASIN}, function(response) {
//     console.log(response.farewell);
//   });
var item_names = [];
html_collection = document.getElementById("spc-orders").getElementsByClassName("asin-title");
prices = document.getElementById("spc-orders").getElementsByClassName("a-color-price a-spacing-micro");
for (var i = 0; i<html_collection.length; i++){
  item_names.push(html_collection[i].innerHTML);
  console.log(html_collection[i].innerHTML);
}

var arr = document.getElementById("spc-top").getElementsByClassName("displayAddressLI displayAddressCityStateOrRegionPostalCode")[0].innerText.split(',')[1].split(" ");
var final_zip = arr[2]+arr[3];
chrome.runtime.sendMessage({msg_type: "CHECKOUT_INFO_MSG", item_names: item_names, zip: final_zip}, function(response) {
    console.log(response.farewell);
  });


