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
for (var i = 0; i<html_collection.length; i++){
  item_names.push(html_collection[i].innerHTML);
  console.log(html_collection[i].innerHTML);
}
chrome.runtime.sendMessage({msg_type: "CHECKOUT_INFO_MSG", item_names: item_names}, function(response) {
    console.log(response.farewell);
  });


