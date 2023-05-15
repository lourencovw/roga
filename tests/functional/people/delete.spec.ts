import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'
import UserFactory from 'Database/factories/UserFactory';
import Database from '@ioc:Adonis/Lucid/Database'


test.group('People delete', (group) => {
  let user;
  group.setup( async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()
    return () => Database.rollbackGlobalTransaction()

  })

  test("It should delete", async ({ client }) => {
    const person =  await PersonFactory.create()
    const response = await client.delete(`/people/${person['id']}`).loginAs(user)

    response.assertStatus(200)
  })
  test("It shouldn't delete", async ({ client }) => {
    const response = await client.delete('/people/10').loginAs(user)

    response.assertStatus(404)
  })
})
