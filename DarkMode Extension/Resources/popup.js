//popup.js
const colors = [{
//    name: "Pink",
//    code: '#FA96A7'
//},{
//    name: "Orange",
//    code: '#F28500'
//},{
    name: "White",
    code: '#FFFFFF'
},{
    name: "Dark",
    code: '#A2A9B1'
}]

const changeMode = async (color) => {
    const [tab] = await browser.tabs.query({currentWindow: true, active: true})
    if (color == colors[0].code) {
        let removingCSS = browser.tabs.removeCSS(tab.id, { file: "dark.css" });
        removingCss.then(null, onError);
    } else {
        try {
            let insertingCSS = browser.tabs.insertCSS(tab.id, { file: "dark.css" });
            insertingCSS.then(null, onError);
          } catch (err) {
            console.error(`failed to insert CSS: ${err}`);
          }
    }
    
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
