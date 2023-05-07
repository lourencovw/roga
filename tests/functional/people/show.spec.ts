import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'

test.group('People show', () => {
  test("It should show a person", async ({ client }) => {
    const person = await PersonFactory.create()
    const response = await client.get(`/people/${person.toJSON()['id']}`)

    response.assertStatus(200)
  })
  test("It shouldn't show a person", async ({ client }) => {
    const response = await client.get('/people/123')

    response.assertStatus(404)
  })
})
