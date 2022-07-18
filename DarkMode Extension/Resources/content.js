//browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//    console.log("Received response: ", response);
//});

//browser.runtime.sendMessage("Some Data"); // This works well

// Error happening when calling sendNativeMessage
//browser.runtime.sendNativeMessage("application.id", {message: "Hello from background page"}, function(response) {
//    console.log("Received sendNativeMessage response:");
//    console.log(response);
//});

// As well the error happening when calling connectNative
//let port = browser.runtime.connectNative("application.id");
//port.postMessage("Hello from JavaScript Port");
//port.onMessage.addListener(function(message) {
//    console.log("Received native port message:");
//    console.log(message);
//});

//port.onDisconnect.addListener(function(disconnectedPort) {
//    console.log("Received native port disconnect:");
//    console.log(disconnectedPort);
//});
//browser.runtime.sendMessage("request from content.js");

//function sendMessage(e) {
//  const sending = browser.runtime.sendMessage({content: "get_theme"});
//}
//sendMessage;

//window.addEventListener("click", sendMessage);

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    console.log("Received request (content): ", request);
    browser.runtime.sendMessage("Received request (content): ", request);

    // Send message to popup.js
    sendMessage;
//    browser.runtime.sendMessage(request);
});



// var allElements = document.querySelectorAll("*");

// for (var i=0, max=allElements.length; i < max; i++) {
//     if (allElements[i] == document.body) {
// //        document.write(1);
//         continue;
//     }
// //    document.write(2);
//     let color = window.getComputedStyle(allElements[i], null).getPropertyValue('color');
//     let hex_color = rgba2hex(color);
    
//     let back_color = window.getComputedStyle(allElements[i], null).getPropertyValue('background-color');
//     let background_hex_color = rgba2hex(back_color);
// //    document.write(hex_color);
//     let inverted_color = invertColor(hex_color, false);
//     allElements[i].style.color = inverted_color;
    
// //    let inverted_back_color = invertColor(background_hex_color, false);
// //    allElements[i].style.background = inverted_back_color
    
// //    var before = window.getComputedStyle(allElements[i], ':before');
// //    var after = window.getComputedStyle(allElements[i], ':after');
// //    if(before.content){
// //        // found :before
// //        console.log(before.content);
// //    }
// //    if(after.content){
// //        // found :after
// //        console.log(after.content);
// //    }
// }


//let dark_color1 = "#262626"
//const changeColor = () => {
////    let background_color = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
////    let background_hex_color = rgba2hex(background_color);
////    let inverted_color = invertColor("#df00d5", false);
//    document.querySelector("body").style.background = dark_color1;
//    document.querySelector("#content").style.background = dark_color1
//    document.querySelector('table.infobox').style.background = dark_color1
//}
//browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
//    if(request.color) {
//        color = request.color
//        changeColor()
//    }
//});

//var allElements = document.querySelectorAll("*");
//
//for (var i=0, max=allElements.length; i < max; i++) {
//    console.log(i);
//    if (allElements[i] == document.body) {
//        continue;
//    }
//    let color = window.getComputedStyle(document.allElements[i], null)
//    let inverted_color = invertColor(color, false);
//    document.querySelector(allElements[i]).style.background = inverted_color
//    var before = window.getComputedStyle(allElements[i], ':before');
//    var after = window.getComputedStyle(allElements[i], ':after');
//    if(before.content){
//        // found :before
//        console.log(before.content);
//    }
//    if(after.content){
//        // found :after
//        console.log(after.content);
//    }
//}
//
//function rgba2hex(orig) {
//  var a, isPercent,
//    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
//    alpha = (rgb && rgb[4] || "").trim(),
//    hex = rgb ?
//    (rgb[1] | 1 << 8).toString(16).slice(1) +
//    (rgb[2] | 1 << 8).toString(16).slice(1) +
//    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
//
//  return "#" + hex;
//}
//
//function invertColor(hex, bw) {
//    if (hex.indexOf('#') === 0) {
//        hex = hex.slice(1);
//    }
//    // convert 3-digit hex to 6-digits.
//    if (hex.length === 3) {
//        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//    }
//    if (hex.length !== 6) {
//        throw new Error('Invalid HEX color.');
//    }
//    var r = parseInt(hex.slice(0, 2), 16),
//        g = parseInt(hex.slice(2, 4), 16),
//        b = parseInt(hex.slice(4, 6), 16);
//    if (bw) {
//        // https://stackoverflow.com/a/3943023/112731
//        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
//            ? '#000000'
//            : '#FFFFFF';
//    }
//    // invert color components
//    r = (255 - r).toString(16);
//    g = (255 - g).toString(16);
//    b = (255 - b).toString(16);
//    // pad each with zeros and return
//    return "#" + padZero(r) + padZero(g) + padZero(b);
//}
//
//function padZero(str, len) {
//    len = len || 2;
//    var zeros = new Array(len).join('0');
//    return (zeros + str).slice(-len);
//}
