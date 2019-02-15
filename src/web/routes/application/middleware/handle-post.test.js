const test = require('tape')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

test('handlePost() should add errors and claim to locals if errors exist', (t) => {
  const errors = ['error']

  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => false,
        array: () => errors
      })
    }
  })

  const claim = 'claim'
  const req = { body: claim }
  const res = { locals: {} }
  const next = sinon.spy()

  handlePost(req, res, next)

  t.deepEqual(res.locals.errors, errors, 'it should add errors to locals')
  t.deepEqual(res.locals.claim, claim, 'it should add claim to locals')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handlePost() adds body to the session to if no errors exist', (t) => {
  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => true
      })
    }
  })

  const req = {
    session: {
      claim: {
        other: 'claim data'
      }
    },
    body: {
      new: 'claim data'
    }
  }

  const next = sinon.spy()

  const expected = {
    claim: {
      other: 'claim data',
      new: 'claim data'
    }
  }

  handlePost(req, {}, next)

  t.deepEqual(req.session, expected, 'it should add body to session')
  t.equal(next.called, true, 'it should call next()')
  t.end()
})

test('handlePost() calls next() with error on error', (t) => {
  const { handlePost } = proxyquire('./handle-post', {
    'express-validator/check': {
      validationResult: () => ({
        isEmpty: () => { throw new Error('error') },
        array: () => []
      })
    }
  })

  const req = {
    session: {
      claim: {}
    },
    body: {}
  }

  const res = { locals: {} }
  const next = sinon.spy()

  handlePost(req, res, next)

  t.equal(next.calledWith(sinon.match.instanceOf(Error)), true, 'it should call next() with error')
  t.end()
})