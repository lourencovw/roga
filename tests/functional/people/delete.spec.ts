import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'

test.group('People delete', () => {
  test("It should delete", async ({ client }) => {
    await PersonFactory.create()
    const response = await client.delete('/people/1')

    response.assertStatus(200)
  })
  test("It shouldn't delete", async ({ client }) => {
    const response = await client.delete('/people/10')

    response.assertStatus(404)
  })
})
