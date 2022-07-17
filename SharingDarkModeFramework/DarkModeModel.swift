//
//  DarkModeData.swift
//  SharingDarkModeFramework
//
//  Created by Usama Fouad on 30/06/2022.
//

import Foundation


public struct DarkMode: Codable {
    private(set) public var name: String;

    public init(name: String = "Anonymous"){
        self.name = name
    }
}
