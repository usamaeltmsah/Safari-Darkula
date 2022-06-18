//popup.js
const colors = [{
    name: "Black",
    code: '#000000'
},{
    name: "Dark",
    code: '#A2A9B1'
},{
    name: "Gray",
    code: '#808080'
},{
    name: "Sepia",
    code: "#704214"
}, {
    name: "White",
    code: '#eeeeee'
}]

const changeMode = async (color) => {
    // const [tab] = await browser.tabs.query({currentWindow: true, active: true})
    if (color == colors[0].code) {
        insertCSS("black.css");
    } else if (color == colors[1].code) {
        insertCSS("dark.css");
    } else if (color == colors[2].code) {
        insertCSS("gray.css");
    } else if (color == colors[3].code) {
        insertCSS("sepia.css");
    } else {
        if (isCSSFileInserted("black.css")) {
            removeCSS("black.css");
        }
        if (isCSSFileInserted("dark.css")) {
            removeCSS("dark.css");
        }
        if (isCSSFileInserted("gray.css")) {
            removeCSS("gray.css");
        }
        if (isCSSFileInserted("sepia.css")) {
            removeCSS("sepia.css");
        }
    }
    window.close()
}

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

function isCSSFileInserted(file) {
    return new Promise((resolve, reject) => {
        browser.tabs.getCSS({ file }).then(resolve, reject);
    });
}

colors.forEach(color => {
    const button = document.createElement('button')
    button.style.background = color.code
    button.innerText = color.name
    document.querySelector('#color-container').appendChild(button)
    button.addEventListener('click', e => {
        changeMode(color.code)
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
