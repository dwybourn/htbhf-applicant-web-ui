const { check } = require('express-validator')
const { parsePhoneNumberFromString } = require('libphonenumber-js')

const PHONE_NUMBER_REGEX = /^\+?[\d()\- ]+$/

// TODO DW HTBHF-1564 Update validation messages (awaiting them from UX)
const validatePhoneNumber = (phoneNumber, { req }) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'GB')
  if (parsedPhoneNumber && parsedPhoneNumber.isValid() && phoneNumber.match(PHONE_NUMBER_REGEX)) {
    return true
  }

  throw new Error(req.t('validation:invalidPhoneNumber'))
}

const validate = () => [
  check('phoneNumber').custom(validatePhoneNumber)
]

module.exports = {
  validate,
  validatePhoneNumber,
  PHONE_NUMBER_REGEX
}
