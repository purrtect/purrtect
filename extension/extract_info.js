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
var item_prices = [];
var item_prime = [];
//html_collection = document.getElementById("spc-orders").getElementsByClassName("asin-title");
//prices = document.getElementById("spc-orders").getElementsByClassName("a-color-price a-spacing-micro");
items = document.getElementById("spc-orders").getElementsByClassName("a-row a-spacing-base")
for (var i = 0; i<items.length; i++){
  item_names.push(items[i].getElementsByClassName("asin-title")[0].innerText);
  item_prices.push(items[i].getElementsByClassName("a-color-price a-spacing-micro")[0].innerText.split("$")[1].trim())
  item_prime.push(items[i].getElementsByClassName("a-icon a-icon-prime").length !== 0);
}

var arr = document.getElementById("spc-top").getElementsByClassName("displayAddressLI displayAddressCityStateOrRegionPostalCode")[0].innerText.split(',')[1].split(" ");
var final_zip = arr[2]+arr[3];
chrome.runtime.sendMessage({msg_type: "CHECKOUT_INFO_MSG", item_prime: item_prime, item_prices: item_prices, item_names: item_names, zip: final_zip }, function(response) {
    console.log(response.farewell);
  });
console.log({msg_type: "CHECKOUT_INFO_MSG", item_prime: item_prime, item_prices: item_prices, item_names: item_names, zip: final_zip })


