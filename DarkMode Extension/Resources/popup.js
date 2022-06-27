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
    let removeAddedCSSFiles = new Promise(resolve => {
        removeAllCSSFiles();
    });

    removeAddedCSSFiles.then(insertCSS(color.file));
    
   window.close()
}

// function toggle() {
//     let q = document.querySelectorAll('#nightify')
//     if (q.length) {
//         q[0].parentNode.removeChild(q[0])
//         return false
//     }
//     var h = document.getElementsByTagName('head')[0],
//         s = document.createElement('style');
//     s.setAttribute('type', 'text/css');
//     s.setAttribute('id', 'nightify');
//     s.appendChild(document.createTextNode('html{-webkit-filter:invert(100%) hue-rotate(180deg) contrast(70%) !important; background: #fff;} .line-content {background-color: #fefefe;}'));
//     h.appendChild(s);
//     return true
// }

// var result = toggle()

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
function saveFile(selectedFile) {
    return new Promise((resolve, reject) => {
        browser.storage.local.set({ selectedFile }).then(resolve, reject);
    });
}

// Create function to read selectedFile from cache
function readFile() {
    return new Promise((resolve, reject) => {
        browser.storage.local.get("selectedFile").then(resolve, reject);
    });
}

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

function removeCSS(file) {
    return new Promise((resolve, reject) => {
        browser.tabs.removeCSS({ file }).then(resolve, reject);
    });
}

function removeAllCSSFiles() {
    colors.forEach(color => {
        removeCSS(color.file);
    });
}

function isCSSFileInserted(file) {
    return new Promise((resolve, reject) => {
        browser.tabs.getCSS({ file }).then(resolve, reject);
    });
}

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

////var myParent = document.querySelector('#color-container');
////var selectList = document.createElement("select");
////selectList.id = "mySelect";
////myParent.appendChild(selectList);

//function swapStyleSheet(sheet) {
//    document.getElementById('pagestyle').setAttribute('href', sheet);
//}
//
//function toggleRef(ref) {
//    // var blackCss = document.createElement('link');
//    // blackCss.ref = "styles/dark.css";
//    // blackCss.rel = "stylesheet";
//    // document.head.appendChild(blackCss);
//
//    if ($('#pagestyle').length === 0) { // does not yet exist
//
//        $('<link />', {
//            id: 'pagestyle',
//            rel: 'stylesheet',
//            href: ref
//        }).appendTo('head');
//
//    } else { // exists, remove it
//
//        $('#pagestyle').remove();
//
//    }
//}
