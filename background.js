// bootstrap dogeify script

chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  chrome.tabs.executeScript(null, {file: "dogeify_chrome.js"});
});
