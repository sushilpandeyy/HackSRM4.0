hidden=0
currentDomain=''
urly=""
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.local.get("hidden", function(result) { //Function TO GET DATA
        hidden = result.hidden;
        });
        if(hidden==1){
    if (changeInfo.url) {
      const bannedDomains = ["https://www.facebook.com","https://www.twitter.com", "https://www.instagram.com", "https://www.snapchat.com","https://www.tiktok.com","https://www.netflix.com","https://www.amazon.com/primevideo","https://www.hulu.com","https://store.steampowered.com"," https://www.epicgames.com/store","https://www.amazon.com","https://www.ebay.com"," https://www.walmart.com","https://www.bestbuy.com","https://www.reddit.com","https://www.discord.com","https://slack.com",,"https://www.pinterest.com","https://vimeo.com","https://www.expedia.com"," https://www.airbnb.com","https://www.swiggy.com","https://www.zomato.com","https://www.makemytrip.com","https://www.flipkart.com","https://www.goibibo.com","https://www.myntra.com ","https://www.ajio.com ","https://www.nykaa.com","https://www.buzzfeed.com","https://www.popsugar.com"];
      currentDomain = extractDomain(changeInfo.url);
      // Check if the domain is in the banned list
      if (bannedDomains.includes(currentDomain)) {
        // Close the tab
        chrome.tabs.remove(tabId, () => {
          chrome.tabs.create({ url: "block.html" });
        });
      }
    }
}
  });
    chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getCurrentTabUrl,
    });
  });
  
  function getCurrentTabUrl() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        const currentUrl = tabs[0].url;
        extractDomain(currentUrl)
        // Do something with the URL
      }
    });
  }
    function extractDomain(url) {
    const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/;
    const matches = url.match(domainRegex);
    return matches ? matches[1] : "";
  }
  

  chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.local.get("focus", function(result) { //Function TO GET DATA
        focus = result.focus;
        console.log("FOCUS RAN")
        if(focus==1){
        chrome.tabs.remove(tab.id);
        }
        });
    
  });
