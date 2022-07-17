//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request: ", request);
//
//    if (request.greeting === "hello")
//        sendResponse({ farewell: "goodbye" });
//});

// Load the theme from SafariWebExtensionHandler and apply it to the page

var themes = {
    Dark: "dark.css",
    Gray: "gray.css",
    Sepia: "sepia.css"
};

function handleUpdated(tabId, changeInfo, tabInfo) {
   let gettingAll = browser.permissions.getAll()
    console.log(gettingAll);
    browser.runtime.sendNativeMessage("application.id", {message: "get_theme"}, function(response) {
        console.log("Received sendNativeMessage response (background):");
        const themeData = response["themeData"]
        console.log(themeData);
        
        if (themeData.isOnInd == 0 && isBetween8pmAnd7am()) {
           browser.tabs.insertCSS({ file: themes.Dark });
        } else if (themeData.isOnInd == 1) {
            browser.tabs.insertCSS({ file: themes[themeData.theme] });
        }
    });
//  console.log("Updated tab: " + tabId);
//  console.log("Changed attributes: ");
//  console.log(changeInfo);
//  console.log("New tab Info: ");
//  console.log(tabInfo);
}

function isBetween8pmAnd7am() {
    var startTime = '20:00:00';
    var endTime = '11:00:00';

    var currentDate = new Date();
    console.log("Now: ", currentDate);

    var startDate = new Date(currentDate.getTime());
    
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);
    console.log("Start: ", startDate);

    var endDate = new Date(currentDate.getTime());
    
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);
    console.log("End: ", endDate);

    valid = startDate <= currentDate || endDate >= currentDate;
    
    
    return valid;
}

function handleActivated(activeInfo) {
  console.log("Tab " + activeInfo.tabId +
              " was activated");
    browser.tabs.reload();
}

browser.tabs.onActivated.addListener(handleActivated);
//browser.tabs.reload();
browser.tabs.onUpdated.addListener(handleUpdated);


browser.runtime.onMessage.addListener(notify);

function notify(message) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL("link.png"),
    "title": "You clicked a link!",
    "message": message.url
  });
}

function handleMessage(request, sender, sendResponse) {
  console.log(`content script sent a message: ${request.content}`);
  setTimeout(() => {
    sendResponse({response: "async response from background script"});
  }, 1000);
  return true;
}

browser.runtime.onMessage.addListener(handleMessage);


browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request (from content): ", request);
    if (request.content == "get_theme") {
        browser.runtime.sendNativeMessage("application.id", {message: "get_theme"}, function(response) {
            console.log("Received sendNativeMessage response (background):");
            console.log(response);
            
        });
    }
});

//browser.runtime.sendNativeMessage("application.id", {message: "get_theme"}, function(response) {
//    console.log("Received sendNativeMessage response (background):");
//    console.log(response);
//});
