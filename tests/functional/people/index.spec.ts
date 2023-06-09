import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'
import UserFactory from 'Database/factories/UserFactory'
import Database from '@ioc:Adonis/Lucid/Database'


test.group('People index', (group) => {
  let user;
  group.setup(async () => {

    await Database.beginGlobalTransaction()
    user = await UserFactory.create()
    return () => Database.rollbackGlobalTransaction()
  })

  test("It should retrieve 0 people", async ({ client, assert }) => {
    const response = await client.get('/people').loginAs(user)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 0)
  })

  test("It should retrieve 10 people", async ({ client, assert }) => {
    const count = 10
    await PersonFactory.createMany(count)
    const response = await client.get('/people').loginAs(user)

    response.assertStatus(200)
    assert.lengthOf(response.body(), count)
  })

})
