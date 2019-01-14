const { Before, Given, When, Then, After } = require('cucumber')
const { expect, assert } = require('chai')

const EnterName = require('../../common/page/enter-name')
const Overview = require('../../common/page/overview')
const Confirmation = require('../../common/page/confirmation')
const DriverManager = require('../../common/driver/driver-manager')
const { BASE_URL } = require('../constants')

const driverManager = new DriverManager()
let enterName
let overview
let confirmation
let driver

const LONG_NAME = 'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 100
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 200
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 300
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 400
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' +
  'This name is way too long' + // 500
  'This name is way too long'

const BLANK_NAME = ''

Before(function () {
  driver = driverManager.initialise()
  overview = new Overview(driver)
  enterName = new EnterName(driver)
  confirmation = new Confirmation(driver)
})

After(function () {
  driver.quit()
})

Given('I navigate to the HTBHF overview page', async function () {
  await overview.open(BASE_URL)

  const h1ElementText = await overview.getH1Text()
  expect(h1ElementText).to.be.equal('Overview')
})

When('I select to start the process', async function () {
  await overview.clickStartButton()
})

Then('the enter name page is shown', async function () {
  await enterName.waitForPageLoad()
})

Given('I start the application process', async function () {
  await enterName.open(BASE_URL)
  await enterName.waitForPageLoad()
})

When('I enter a first name which is too long', async function () {
  return enterNameAndSubmit(LONG_NAME, 'Bloggs')
})

When('I enter a last name which is too long', async function () {
  return enterNameAndSubmit('Joe', LONG_NAME)
})

When('I enter first name only', async function () {
  return enterNameAndSubmit('Joe', BLANK_NAME)
})

When(/^I enter (.*) and (.*) values$/, async function (firstName, lastName) {
  return enterNameAndSubmit(firstName, lastName)
})

Then('I am informed that the first name is too long', async function () {
  await assertErrorHeaderTextPresent()
  const errorMessage = await enterName.getFirstNameError()
  expect(errorMessage).to.be.equal('Enter a shorter first or given name')
})

Then('I am informed that the last name is too long', async function () {
  await assertErrorHeaderTextPresent()
  await assertLastNameErrorPresent('Enter a shorter last or family name')
})

Then('I am informed that a last name is required', async function () {
  await assertErrorHeaderTextPresent()
  await assertLastNameErrorPresent('Enter your last or family name')
})

Then('I am shown the confirmation page', async function () {
  await confirmation.waitForPageLoad()
})

async function enterNameAndSubmit (firstName, lastName) {
  try {
    await enterName.enterFirstName(firstName)
    await enterName.enterLastName(lastName)
    await enterName.submitForm()
  } catch (error) {
    assert.fail(`Unexpected error caught trying to enter the name and submit the page - ${error}`)
  }
}

async function assertErrorHeaderTextPresent () {
  try {
    await enterName.waitForPageLoad()
    const errorHeader = await enterName.getPageErrorHeaderText()
    expect(errorHeader).to.equal('There is a problem')
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert error header text is present - ${error}`)
  }
}

async function assertLastNameErrorPresent (expectedErrorMessage) {
  try {
    const errorMessage = await enterName.getLastNameError()
    expect(errorMessage).to.be.equal(expectedErrorMessage)
  } catch (error) {
    assert.fail(`Unexpected error caught trying to assert last name error message is present - ${error}`)
  }
}
