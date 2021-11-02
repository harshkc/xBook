import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {server, rest} from 'test/server'
import {client} from 'utils/api-client'

jest.mock('react-query')
jest.mock('auth-provider')

const apiURL = process.env.REACT_APP_API_URL

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'mock-value'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const token = 'FAKE_TOKEN'
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'mock-value'}
  let request
  server.use(
    rest.get(`${apiURL}/${endpoint}`, (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )
  await client(endpoint, {token})
  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  let request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  const customConfig = {
    method: 'PUT',
    headers: {'Content-Type': 'fake-type'},
  }

  await client(endpoint, customConfig)

  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const endpoint = 'test-endpoint'
  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body))
    }),
  )
  const data = {mockValue: 'VALUE'}
  const result = await client(endpoint, {data})
  expect(result).toEqual(data)
})

test('rejects promise if there is an error', async () => {
  const endpoint = 'test-endpoint'
  const testError = {message: 'test error'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    }),
  )
  await expect(client(endpoint)).rejects.toEqual(testError)
})

test('logouts user when status is 401', async () => {
  const endpoint = 'test-endpoint'
  const mockValue = {mockValue: 'test-value'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockValue))
    }),
  )

  const error = await client(endpoint).catch(e => e)
  expect(error.message).toMatchInlineSnapshot(`"Please re-authenticate."`)
  expect(queryCache.clear).toHaveBeenCalledTimes(1)
  expect(auth.logout).toHaveBeenCalledTimes(1)
})
