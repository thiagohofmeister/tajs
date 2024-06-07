import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { setTimeout } from 'node:timers/promises'
import Task from '../src/task.js'

describe('Task Test Suite', () => {
  let _logMock
  let _task

  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation()
    _task = new Task()
  })

  it.skip('should only run tasks that are due without fake timers (slow)', async () => {
    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5_000),
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10_000),
        fn: jest.fn(),
      },
    ]

    _task.save(tasks.at(0))
    _task.save(tasks.at(1))
    _task.run(200)

    await setTimeout(11e3)

    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).toHaveBeenCalled()
  }, 15e3)

  it('should only run tasks that are due with fake timers (fast)', async () => {
    jest.useFakeTimers()

    const tasks = [
      {
        name: 'Task-Will-Run-In-5-Secs',
        dueAt: new Date(Date.now() + 5_000),
        fn: jest.fn(),
      },
      {
        name: 'Task-Will-Run-In-10-Secs',
        dueAt: new Date(Date.now() + 10_000),
        fn: jest.fn(),
      },
    ]

    _task.save(tasks.at(0))
    _task.save(tasks.at(1))
    _task.run(200)

    jest.advanceTimersByTime(4000)

    expect(tasks.at(0).fn).not.toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    expect(tasks.at(0).fn).toHaveBeenCalled()
    expect(tasks.at(1).fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(4000)

    expect(tasks.at(1).fn).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
