'use strict'

const DataEntryPage = require('./data-entry-page')

const PAGE_TITLES = {
  en: 'GOV.UK - What is your address?',
  cy: 'GOV.UK - Urna condimentum mattis?'
}

const PAGE_HEADINGS = {
  en: 'What is your address?',
  cy: 'Urna condimentum mattis?'
}

const POSTCODE_ERROR_ID = 'postcode-error'
const ADDRESS_LINE_1_ERROR_ID = 'address-line-1-error'
const ADDRESS_LINE_2_ERROR_ID = 'address-line-2-error'
const TOWN_OR_CITY_ERROR_ID = 'town-or-city-error'
const ADDRESS_LINE_1_ERROR_LINK_CSS = 'a[href="#address-line1-error"]'
const ADDRESS_LINE_2_ERROR_LINK_CSS = 'a[href="#address-line2-error"]'
const TOWN_OR_CITY_ERROR_LINK_CSS = 'a[href="#town-or-city-error"]'
const POSTCODE_ERROR_LINK_CSS = 'a[href="#postcode-error"]'

/**
 * Page object for CardAddress page where the card card-address is entered.
 */
class CardAddress extends DataEntryPage {
  async open (baseURL) {
    await super.open(`${baseURL}/card-address`)
    return this.waitForPageLoad()
  }

  async waitForPageLoad (lang = 'en') {
    return super.waitForPageLoad(PAGE_HEADINGS[lang], PAGE_TITLES[lang])
  }

  async getAddressLine1Field () {
    return this.findById('address-line-1')
  }

  async getAddressLine2Field () {
    return this.findById('address-line-2')
  }

  async getTownOrCityField () {
    return this.findById('town-or-city')
  }

  async getPostcodeField () {
    return this.findById('postcode')
  }

  async enterAddressLine1 (addressLine1) {
    const addressLine1Field = await this.getAddressLine1Field()
    return addressLine1Field.sendKeys(addressLine1)
  }

  async enterAddressLine2 (addressLine2) {
    const addressLine2Field = await this.getAddressLine2Field()
    return addressLine2Field.sendKeys(addressLine2)
  }

  async enterTownOrCity (townOrCity) {
    const townOrCityField = await this.getTownOrCityField()
    return townOrCityField.sendKeys(townOrCity)
  }

  async enterPostcode (postcode) {
    const postcodeField = await this.getPostcodeField()
    return postcodeField.sendKeys(postcode)
  }

  async getPostcodeFieldErrorText () {
    const postcodeError = await this.findById(POSTCODE_ERROR_ID)
    return postcodeError.getText()
  }

  async getAddressLine1FieldErrorText () {
    const addressLine1Error = await this.findById(ADDRESS_LINE_1_ERROR_ID)
    return addressLine1Error.getText()
  }

  async getAddressLine2FieldErrorText () {
    const addressLine2Error = await this.findById(ADDRESS_LINE_2_ERROR_ID)
    return addressLine2Error.getText()
  }

  async getTownOrCityFieldErrorText () {
    const townOrCityError = await this.findById(TOWN_OR_CITY_ERROR_ID)
    return townOrCityError.getText()
  }

  async getAddressLine1ErrorLinkText () {
    const fieldError = await this.findByCSS(ADDRESS_LINE_1_ERROR_LINK_CSS)
    return fieldError.getText()
  }

  async getAddressLine2ErrorLinkText () {
    const fieldError = await this.findByCSS(ADDRESS_LINE_2_ERROR_LINK_CSS)
    return fieldError.getText()
  }

  async getTownOrCityErrorLinkText () {
    const fieldError = await this.findByCSS(TOWN_OR_CITY_ERROR_LINK_CSS)
    return fieldError.getText()
  }

  async getPostcodeErrorLinkText () {
    const fieldError = await this.findByCSS(POSTCODE_ERROR_LINK_CSS)
    return fieldError.getText()
  }
}

module.exports = CardAddress