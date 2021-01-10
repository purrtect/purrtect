chrome.browserAction.setIcon({path: "icon.png"}, function(){});

document.addEventListener('DOMContentLoaded', function() {
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
