//popup.js
const colors = [{
    name: "Dark",
    code: '#bdbdbd',
    file: "dark.css",
    bg_color: '#000000'
},{
    name: "Gray",
    code: '#FFFFFF',
    file: "gray.css",
    bg_color: '#e0e0e0'
},{
    name: "Sepia",
    code: "#704214",
    file: "sepia.css",
    bg_color: '#fdf1e6'
}]

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (themeData.isOnInd < 2) {
        switch (message.themeData.theme) {
            case "Dark":
                changeMode(colors[0]);
                break;
            case "Gray":
                changeMode(colors[1]);
                break;
            case "Sepia":
                changeMode(colors[2]);
                break;
            default:
                break;
        }
    }
    sendResponse({
        data: "I am fine, thank you. How is life in the background?"
    });
});

browser.runtime.sendMessage("Poped!");
//await browser.window.getAll()


// Do action when navigate to new link
// browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//     document.write(1);
//     if (changeInfo.status === 'complete') {
//         // Get current tab
//         insertCSS("dark.css");
//     }
// });

const changeMode = async (color) => {
    // insertCSS("dark.css");
    // localStorage.setItem(self.origin, 'dark.css');
    // let file = await localStorage.getItem(self.origin);
    // if (file) {
    //     insertCSS(file);
    // }
    // const [tab] = await browser.tabs.query({currentWindow: true, active: true})
    // saveToCache('color', color.code).then(() => {
    //     browser.tabs.query({ currentWindow: true, active: true }).then(async (tabs) => {
    //         const tab = tabs[0];
    //         const domain = tab.url.split('/')[2];
    //         const file = `${domain}/popup.css`;
    //         const isInserted = await isCSSFileInserted(file);
    //         if (isInserted) {
    //             removeCSS(file).then(() => {
    //                 insertCSS(file).then(() => {
    //                     browser.tabs.reload(tab.id);
    //                 });
    //             });
    //         } else {
    //             insertCSS(file).then(() => {
    //                 browser.tabs.reload(tab.id);
    //             });
    //         }
    //     });
    // });

    // Save dark.css as selectedFile to cache
//    saveFile('dark.css');


    // Remove all added (by the extension) css files then insert the new one
//    let removeAddedCSSFiles = new Promise(resolve => {
//        removeAllCSSFiles();
//    });

    browser.runtime.sendNativeMessage("application.id", {message: {"theme": color.name }}, function(response) {
        console.log("Received sendNativeMessage response (popup):");
        console.log(response);
        const themeData = response["themeData"]
        if (themeData.isOnInd == 0 && isBetween8pmAnd7am()) {
            insertCSS(colors[0].file);
        } else if (themeData.isOnInd == 1) {
            insertCSS(color.file);
        }
    });
//    removeAddedCSSFiles.then(insertCSS(color.file));
//    insertCSS(color.file);
    
   window.close()
}

// Receive message from content.js
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Received request (popup): ", message);
    // changeMode(message.color);
});

// Recieve message from background.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request (popup): ", request);
});


function getCurrentTapDomain(tab) {
    return new Promise((resolve, reject) => {
        browser.tabs.get(tab.id).then(resolve, reject);
    });
}

// function insertCSSToDomain(domain, file) {
//     return new Promise((resolve, reject) => {
//         browser.tabs.insertCSS({ file, code: "", allFrames: true, matchAboutBlank: true, matchDomain: domain }).then(resolve, reject);
//     });
// }

// Create function to save selectedFile to cache
//function saveFile(selectedFile) {
//    return new Promise((resolve, reject) => {
//        browser.storage.local.set({ selectedFile }).then(resolve, reject);
//    });
//}

// Create function to read selectedFile from cache
//function readFile() {
//    return new Promise((resolve, reject) => {
//        browser.storage.local.get("selectedFile").then(resolve, reject);
//    });
//}

// function saveToCache(key, value) {
//     return new Promise((resolve, reject) => {
//         browser.storage.local.set({ [key]: value }).then(resolve, reject);
//     });
// }

// function readCache(key) {
//     return new Promise((resolve, reject) => {
//         browser.storage.local.get(key).then(resolve, reject);
//     });
// }

// function removeFromCache(key) {
//     return new Promise((resolve, reject) => {
//         browser.storage.local.remove(key).then(resolve, reject);
//     });
// }

function insertCSS(file) {
    return new Promise((resolve, reject) => {
        browser.tabs.insertCSS({ file }).then(resolve, reject);
    });
}

//function removeCSS(file) {
//    return new Promise((resolve, reject) => {
//        browser.tabs.removeCSS({ file }).then(resolve, reject);
//    });
//}
//
//function removeAllCSSFiles() {
//    colors.forEach(color => {
//        removeCSS(color.file);
//    });
//}

colors.forEach(color => {
    const button = document.createElement('button')
    button.style.background = color.bg_color
    button.style.color = color.code
    button.innerText = "D"
    document.querySelector('#color-container').appendChild(button)
    button.addEventListener('click', e => {
        changeMode(color)
    })
})
