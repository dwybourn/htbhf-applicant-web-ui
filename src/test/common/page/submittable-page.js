const Page = require('./page')

class SubmittablePage extends Page {
  async getSubmitButton () {
    return this.findById('submit-button')
  }

  async submitForm () {
    const submitButton = await this.getSubmitButton()
    await submitButton.click()
  }

  async getSubmitButtonText () {
    const submitButton = await this.getSubmitButton()
    return submitButton.getText()
  }
}

module.exports = SubmittablePage
