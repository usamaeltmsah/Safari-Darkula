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
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey] as! [String:Any]
        let response = NSExtensionItem()
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
            } else if let urls = msg["allowed_websites"] as? [String] {
                sharedUserDefaults?.set(urls, forKey: K.websitesKey)
                
                response.userInfo = [ SFExtensionMessageKey: ["themeData": ["Websites": urls]] as! [String: Any] ]
                context.completeRequest(returningItems: [response], completionHandler: nil)
            }
        }
    }

}
