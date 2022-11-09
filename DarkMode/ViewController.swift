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
    @IBOutlet weak var allowedWebsitesTV: UITableView!
    
    
    var dark, gray, sepia: UIMenuElement!
    var websites = [String]()
    
    override func viewWillAppear(_ animated: Bool) {
        NotificationCenter.default.addObserver(self, selector:#selector(loadData), name: UIApplication.willEnterForegroundNotification, object: UIApplication.shared)
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        NotificationCenter.default.removeObserver(self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setupUI()
        
        loadData()
        
        self.webView.navigationDelegate = self
        self.webView.scrollView.isScrollEnabled = false

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }
    
    private func setupTableView() {
        allowedWebsitesTV.delegate = self
        allowedWebsitesTV.dataSource = self
    }
    
    private func setupUI() {
        setupTableView()
        changeThemeButton.layer.borderWidth = 2
        changeThemeButton.layer.borderColor = UIColor.white.cgColor
        segmentedControl.selectedSegmentTintColor = .lightGray
        configureMenu()
    }
    
    @objc private func loadData() {
        if let theme = sharedUserDefaults?.string(forKey: K.themeKey) {
            switch theme {
            case K.Themes.grayTheme:
                self.updateThemeData(theme: theme, color: .gray)
            case K.Themes.sepiaTheme:
                self.updateThemeData(theme: theme, color: .systemBrown)
            default:
                self.updateThemeData(theme: theme, color: .black)
            }
        } else {
            saveThemeToDefaults(K.Themes.darkTheme)
        }
        
        if let isOnIndex = sharedUserDefaults?.integer(forKey: K.isOnIndexKey) {
            segmentedControl.selectedSegmentIndex = isOnIndex
            changeDescText(with: isOnIndex)
        } else {
            sharedUserDefaults?.set(0, forKey: K.isOnIndexKey)
        }
        
        if let urls = sharedUserDefaults?.stringArray(forKey: K.websitesKey) {
            websites = urls
            allowedWebsitesTV.reloadData()
        }
    }

    private func configureMenu() {
        dark = UIAction(title: K.Themes.darkTheme) { [weak self] _ in
            self?.updateThemeData(theme: K.Themes.darkTheme, color: .black)
        }
        
        gray = UIAction(title: K.Themes.grayTheme) { [weak self] _ in
            self?.updateThemeData(theme: K.Themes.grayTheme, color: .gray)
        }
        
        sepia = UIAction(title: K.Themes.sepiaTheme) { [weak self] _ in
            self?.updateThemeData(theme: K.Themes.sepiaTheme, color: .brown)
        }
        
        let themesMenu = UIMenu(title: "Select Mode", children: [dark, gray, sepia])
        
        changeThemeButton.menu = themesMenu
        changeThemeButton.showsMenuAsPrimaryAction = true
    }
    
    private func updateThemeData(theme: String, color: UIColor) {
        DispatchQueue.global(qos: .userInitiated).async {
            self.saveThemeToDefaults(theme)
        }
        
        self.colorLabel.text = theme
        self.changeThemeButton.backgroundColor = color
    }
    
    private func saveThemeToDefaults(_ theme: String) {
        sharedUserDefaults?.set(theme, forKey: K.themeKey)
        sharedUserDefaults?.synchronize()
    }
    
    private func changeDescText(with index: Int) {
        switch index {
        case 0:
            modeDescLabel.text = K.autoDescText
        case 1:
            modeDescLabel.text = K.onDescText
        default:
            modeDescLabel.text = K.offDescText
        }
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        // Override point for customization.
        
//        let theme = sharedUserDefaults?.string(forKey: K.themeKey)
        self.webView.evaluateJavaScript("console.log(theme);")
//        let jscode = """
//        console.log("Error");
//        })
//        """
//        self.webView.evaluateJavaScript(jscode) { _, _ in }
    }
        
    @IBAction func changeThemeBtnPressed(_ sender: Any) {
        
    }
    
    @IBAction func sementedValueChange(_ sender: UISegmentedControl) {
        DispatchQueue.main.async {
            sharedUserDefaults?.set(sender.selectedSegmentIndex, forKey: K.isOnIndexKey)
        }
        changeDescText(with: sender.selectedSegmentIndex)
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


extension ViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return websites.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell")
        
        cell?.textLabel?.text = websites[indexPath.row]
        
        return cell!
    }
    
    
}
