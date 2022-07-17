//
//  SafariWebExtensionHandler.swift
//  DarkMode Extension
//
//  Created by Usama Fouad on 16/06/2022.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        // Receive a message from the JavaScript component of the Web Extension.
        // Unpack the message, and then wrap in an object to send as the response.
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey] as! [String:Any]
        let response = NSExtensionItem()
//        response.userInfo = [ SFExtensionMessageKey: message ]
//        context.completeRequest(returningItems: [response], completionHandler: nil)
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as CVarArg)

        let msgData = message["message"]
        if msgData as? String == "get_theme" {
            let theme = sharedUserDefaults?.string(forKey: K.themeKey)
            let isOnInd = sharedUserDefaults?.integer(forKey: K.isOnIndexKey)
//            let response = NSExtensionItem()
            response.userInfo = [ SFExtensionMessageKey: [ "themeData": ["theme": theme ?? "Dark", "isOnInd": isOnInd ?? 0]] as! [String: Any] ]
            context.completeRequest(returningItems: [response], completionHandler: nil)
        }
        
        if let msg = msgData as? [String:Any] {
            if let theme = msg["theme"] as? String {
                sharedUserDefaults?.set(theme, forKey: K.themeKey)
                let isOnInd = sharedUserDefaults?.integer(forKey: K.isOnIndexKey)
                response.userInfo = [ SFExtensionMessageKey: [ "themeData": ["theme": theme , "isOnInd": isOnInd ?? 0]] as! [String: Any] ]
                context.completeRequest(returningItems: [response], completionHandler: nil)
            }
        }
        
//        context.completeRequest(returningItems: [response], completionHandler: nil)
        
//        let response = NSExtensionItem()
//        response.userInfo = [ SFExtensionMessageKey: [ "Response to": message ] ]
    }

}
