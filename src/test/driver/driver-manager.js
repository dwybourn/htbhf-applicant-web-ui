'use strict'

const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const { SCREEN_RESOLUTION } = require('../config')

class DriverManager {
  constructor () {
    this.driver = null
  }

  initialise () {
    this.driver = new webdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless().windowSize(SCREEN_RESOLUTION))
      .build()

    return this.driver
  }

  quit () {
    this.driver.quit()
  }
}

module.exports = DriverManager
