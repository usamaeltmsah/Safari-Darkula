//
//  ViewController.swift
//  DarkMode
//
//  Created by Usama Fouad on 16/06/2022.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {
    @IBOutlet weak var changeThemeButton: UIButton!
    @IBOutlet weak var colorLabel: UILabel!
    @IBOutlet var webView: WKWebView!
    @IBOutlet weak var modeDescLabel: UILabel!
    @IBOutlet weak var segmentedControl: UISegmentedControl!
    
    
    var dark, gray, sepia: UIMenuElement!
    var defaults: UserDefaults?
    
    override func viewDidLoad() {
        super.viewDidLoad()

        defaults = UserDefaults.standard
        
        if let theme = defaults?.string(forKey: K.themeKey) {
            switch theme {
            case K.Themes.grayTheme:
                self.updateThemeData(theme: theme, color: .gray)
            case K.Themes.sepiaTheme:
                self.updateThemeData(theme: theme, color: .systemBrown)
            default:
                self.updateThemeData(theme: theme, color: .black)
            }
        }
        
        if let isOnIndex = defaults?.integer(forKey: K.isOnIndexKey) {
            segmentedControl.selectedSegmentIndex = isOnIndex
            changeDescText(with: isOnIndex)
        }
        
        self.webView.navigationDelegate = self
        self.webView.scrollView.isScrollEnabled = false

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Override point for customization.
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print(message.name)
//        if message.name == "test", let messageBody = message.body as? String {
//            print(messageBody)
//        }
    }

    // Send the theme to safari extension
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if navigationAction.navigationType == .linkActivated {
            if let url = navigationAction.request.url, url.scheme == "darkmode" {
                let theme = url.host ?? ""
                self.updateThemeData(theme: theme, color: .black)
                decisionHandler(.cancel)
            } else {
                decisionHandler(.allow)
            }
        } else {
            decisionHandler(.allow)
        }
    }
    
    func createJsonForJavaScript(for data: [String : Any]) -> String {
        var jsonString : String?
        do {
           let jsonData = try JSONSerialization.data(withJSONObject: data,       options: .prettyPrinted)
          // here "jsonData" is the dictionary encoded in JSON data .
          jsonString = String(data: jsonData, encoding: .utf8)!
           
           jsonString = jsonString?.replacingOccurrences(of: "\n", with: "").replacingOccurrences(of: "\\", with: "")
            } catch {
                print(error.localizedDescription)
        }
        print(jsonString!)
        return jsonString!
    }
    
}
