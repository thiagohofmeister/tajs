import { describe, expect, it } from '@jest/globals'
import nock from 'nock'
import { fetchAPIByPage } from '../src/runner.js'
import page01Fixture from './fixtures/get-page01.json'
import page02Fixture from './fixtures/get-page02.json'

describe('Web Integration Test Suite', () => {
  // it('should return the right object with the right properties', async () => {
  //   const page10 = await fetchAPIByPage(10)

  //   expect(page10).toEqual([
  //     {
  //       id: 181,
  //       name: "Jessica's Friend",
  //       image: 'https://rickandmortyapi.com/api/character/avatar/181.jpeg',
  //     },
  //   ])
  // })

  it('should return the right object with the right properties', async () => {
    const scope = nock('https://rickandmortyapi.com/api')
      .get('/character')
      .query({ page: 1 })
      .reply(200, page01Fixture)

    const page01 = await fetchAPIByPage()

    expect(page01).toEqual([
      {
        id: 1,
        name: 'Rick Sanchez',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
    ])
    scope.done()
  })

  it('should return the right object with the right properties', async () => {
    const scope = nock('https://rickandmortyapi.com/api')
      .get('/character')
      .query({ page: 2 })
      .reply(200, page02Fixture)

    const page02 = await fetchAPIByPage(2)

    expect(page02).toEqual([
      {
        id: 21,
        name: 'Aqua Morty',
        image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
      },
    ])
    scope.done()
  })
})
