import { expect, test } from 'vitest'

test('expect.soft test', () => {
  expect.soft(1 + 2).toBe(3)
  expect.soft(1 + 2).toBe(3)
})