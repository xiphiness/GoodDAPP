import wrapper, { wrapFunction } from '../utils/wrapper'

const resolveFunction = () => Promise.resolve(true)
const rejectFunction = () => Promise.reject(new Error('rejected'))

describe('wrapFunction', () => {
  const storeMock = {
    set: function() {
      return function() {
        return
      }
    }
  }
  it(`wrapping a function that returns a promise should work as without wrapper`, async () => {
    const wrappedOkFunction = wrapFunction(resolveFunction, storeMock)
    const result = await wrappedOkFunction()
    expect(result).toBe(true)
  })

  it(`wrapping a function that returns a rejected promise should throw error`, async () => {
    const wrappedOkFunction = wrapFunction(rejectFunction, storeMock)
    await expect(wrappedOkFunction()).rejects.toThrow('rejected')
  })
})
