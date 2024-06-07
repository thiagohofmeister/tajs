import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import fs from 'node:fs'
import Service from '../src/service.js'

describe('Service Test Suite', () => {
  let _service
  const filename = 'testfile.ndjson'

  beforeEach(() => {
    _service = new Service({ filename })
  })

  describe('#read', () => {
    it('should return an empty array if the file is not exists', async () => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(false)

      const result = await _service.read()
      expect(result).toEqual([])
    })

    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(fs, fs.readFile.name).mockResolvedValue('')

      const result = await _service.read()
      expect(result).toEqual([])
    })

    it('should return users without password if file contains users', async () => {
      const dbData = [
        {
          username: 'user1',
          password: 'pass1',
          createdAt: new Date().toISOString(),
        },
        {
          username: 'user2',
          password: 'pass2',
          createdAt: new Date().toISOString(),
        },
      ]

      const fileContents = dbData.map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(fs, 'existsSync').mockResolvedValue(true)
      jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContents)

      const result = await _service.read()

      const expected = dbData.map(({ password, ...rest }) => ({ ...rest }))

      expect(result).toEqual(expected)
    })
  })
})
