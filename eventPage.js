
chrome.browserAction.onClicked.addListener(ButtonClicked);
function ButtonClicked(tabs){
    let message ={
        txt:tabs
    }
    chrome.tabs.sendMessage(tabs.id,message);
}

chrome.runtime.onMessage.addListener(function(request, sender) {
   
    if (request.type == "notification"){
        chrome.browserAction.setIcon({
        path : "joomla.png",
        tabId: sender.tab.id
        });
        chrome.browserAction.setBadgeText({
            text : request.version,
            tabId: sender.tab.id
        });
        chrome.notifications.create('notification', request.options, function() { });
    }

    if(request.type == "wordpress"){
        chrome.browserAction.setIcon({
            path : "wordpress.jpg",
            tabId: sender.tab.id
        });
        chrome.browserAction.setBadgeText({
            text : request.version,
            tabId: sender.tab.id
        });
        chrome.notifications.create('notificationss', request.options, function() { });
    }
    
});