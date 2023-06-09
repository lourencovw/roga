import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'
import UserFactory from 'Database/factories/UserFactory'
import Database from '@ioc:Adonis/Lucid/Database'


test.group('People show', (group) => {
  let user;
  group.setup( async () => {
    await Database.beginGlobalTransaction()
    user = await UserFactory.create()
    return () => Database.rollbackGlobalTransaction()
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
