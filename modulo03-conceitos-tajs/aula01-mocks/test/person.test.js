import { describe, expect, it, jest } from '@jest/globals'
import Person from '../src/person.js'

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00',
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
    })

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: '123.456.789-00',
      }

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
    })

    it('should not throw if person is valid', () => {
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: '',
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
    })
  })

  describe('#format', () => {
    it('should format the person name and CPF', () => {
      const mockPerson = {
        name: 'Xuxa da Silva',
        cpf: '000.999.444-11',
      }

      const formattedPerson = Person.format(mockPerson)

      const expected = {
        name: 'Xuxa',
        cpf: '00099944411',
        lastName: 'da Silva',
      }

      expect(formattedPerson).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it('should throw if person is invalid', () => {
      const mockInvalidPerson = {
        name: 'Xuxa da Silva',
        cpf: '123.456.789-00',
      }

      expect(() => Person.save(mockInvalidPerson)).toThrow(
        new Error('cannot save invalid person: {"name":"Xuxa da Silva","cpf":"123.456.789-00"}'),
      )
    })

    it('should not throw if person is valid', () => {
      const mockInvalidPerson = {
        name: 'Xuxa',
        cpf: '12345678900',
        lastName: 'da Silva',
      }

      expect(() => Person.save(mockInvalidPerson)).not.toThrow()
    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {
      const mockPerson = {
        name: 'Xuxa da Silva',
        cpf: '123.456.789-00',
      }

      jest.spyOn(Person, Person.validate.name).mockReturnValue()
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: 'Xuxa',
        cpf: '12345678900',
        lastName: 'da Silva',
      })

      const result = Person.process(mockPerson)

      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })
})
