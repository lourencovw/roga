import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'
import UserFactory from 'Database/factories/UserFactory'

test.group('People show', (group) => {
  let user;
  group.setup( async () => {
    user = await UserFactory.create()
  })

  test("It should show a person", async ({ client }) => {
    const person = await PersonFactory.create()
    const response = await client.get(`/people/${person.toJSON()['id']}`).loginAs(user)

    response.assertStatus(200)
  })
  test("It shouldn't show a person", async ({ client }) => {
    const response = await client.get('/people/123').loginAs(user)

    response.assertStatus(404)
  })
})
