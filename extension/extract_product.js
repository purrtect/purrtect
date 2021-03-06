var extraction = {
    url: "", 
    title: "",
    web_domain: "",
    user_zip: "",
    ASIN:  "",
    category: "",
    is_prime: false,
    //stuff that might not exist
    currency: "",
    price: "",
    weight: "",
    dimensions: "",
    Manufacturer: "",
    Manufacturer_contact: ""
};
var dummy;
function processCells(tag, value){
    switch(tag){
        case "ASIN":
            extraction.ASIN = value.trim();
            break;
        case "Manufacturer":
            extraction.Manufacturer = value.trim();
            break;
        case "Manufacturer contact":
            //extraction.Manufacturer_contact = value.split(",")[2].trim().split(" ")[0];
            extraction.Manufacturer_contact = value.split(",")
            if(extraction.Manufacturer_contact[extraction.Manufacturer_contact.length-1].trim()==="CA"){
                extraction.Manufacturer_contact = extraction.Manufacturer_contact[1].replace(" ", "");
                extraction.Manufacturer_contact = extraction.Manufacturer_contact.substr(3).replace(" ","");
            }
            else{
                extraction.Manufacturer_contact = extraction.Manufacturer_contact[2].trim().split(" ")[0];
            }
            if (extraction.Manufacturer_contact.length < 5) extraction.Manufacturer_contact = "";
            break;
        case "Item Weight" :
            extraction.weight = value.trim();
            break;
        case "Dimensions" :
        case "Product Dimensions" :
        case "Parcel Dimensions":
            var dimensions_raw = value.split(";");
            extraction.dimensions = dimensions_raw[0].trim();
            if (dimensions_raw.length>1 && !extraction.weight){
                extraction.weight = dimensions_raw[1].trim();
            }   
            break;
        default:
    }
}


extraction.category = document.getElementById("nav-search-label-id").innerHTML;

//category title url and such
[extraction.title, extraction.web_domain, dummy] = document.title.split(":");
if (extraction.title === "Amazon.ca Laptops"){
    extraction.title=extraction.web_domain;
    extraction.category = "computer"
}
extraction.title = extraction.title.trim();
extraction.url = document.URL;
extraction.user_zip = document.getElementById("glow-ingress-line2").innerText.split(" ");
extraction.user_zip = extraction.user_zip[extraction.user_zip.length-2]+extraction.user_zip[extraction.user_zip.length-1]
//extraction.user_zip = document.getElementById("glow-ingress-line2").innerText.split("...")[1].trim().replace(" ", "").substring(0,6);
// category = document.getElementById("wayfinding-breadcrumbs_feature_div").getElementsByTagName("li")[0].getElementsByClassName("a-link-normal a-color-tertiary")[0].innerHTML.trim();

if(document.getElementById("priceBadging_feature_div")){
    if(document.getElementById("priceBadging_feature_div").getElementsByClassName("a-icon a-icon-prime").length)
        extraction.is_prime = true;
}

//determine price
var price;
if (document.getElementById("priceblock_ourprice")){
    price = document.getElementById("priceblock_ourprice");
}
else if(document.getElementById("priceblock_dealprice")){
    price = document.getElementById("priceblock_dealprice");
}
else if(document.getElementById("price_inside_buybox")){
    price = document.getElementById("price_inside_buybox");
}
else if(document.getElementById("buyNewSection")){
    price = document.getElementById("buyNewSection").getElementsByClassName("a-size-medium a-color-price offer-price a-text-normal")[0];
}

if (price){
    extraction.currency = price.innerHTML.split("&")[0].trim();
    extraction.price = price.innerHTML.split(";")[1].trim();
}

//extract tech sheet

//if the tech details table exists
if(document.getElementById("productDetails_techSpec_section_1")){
    var techsheet = document.getElementById("productDetails_techSpec_section_1");
    techsheet = techsheet.rows;
    for (var i = 0; i<techsheet.length; i++){
        processCells(techsheet[i].cells[0].innerHTML.trim(), techsheet[i].cells[1].innerHTML);
    }
    if(document.getElementById("productDetails_detailBullets_sections1")){
        var additional_info = document.getElementById("productDetails_detailBullets_sections1").rows;
        for (var i = 0; i<additional_info.length; i++){
            processCells(additional_info[i].cells[0].innerHTML.trim(), additional_info[i].cells[1].innerHTML);
        }
    }
    
}

//if the product details list exists
else if(document.getElementById("detailBullets_feature_div")){
    var techsheet = document.getElementById("detailBullets_feature_div").getElementsByTagName("li");
    for (var i = 0; i<techsheet.length; i++){
        var text = techsheet[i].innerText.split(":");
        processCells(text[0].trim(),text[1]);
    }
}
console.log(extraction);
chrome.runtime.sendMessage({msg_type: "SITE_BASIC_INFO_MSG", extraction: extraction}, function(response) {
    console.log(response.farewell);
  });
