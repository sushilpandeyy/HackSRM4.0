hidden=0
currentDomain=''
urly=""
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    chrome.storage.local.get("hidden", function(result) { //Function TO GET DATA
        hidden = result.hidden;
        });
        if(hidden==1){
    if (changeInfo.url) {
      const bannedDomains = ["facebook.com","twitter.com", "instagram.com","twitch.tv" ,"snapchat.com","tiktok.com","netflix.com","primevideo.com","hulu.com","steampowered.com","epicgames.com","amazon.in","flipkart.com","myntra.com","ajio.com","reddit.com","swiggy.com","zomato.com","makemytrip.com","goibibo.com","ajio.com ","nykaa.com","buzzfeed.com"];
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
