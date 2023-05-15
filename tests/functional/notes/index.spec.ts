import { test } from '@japa/runner'
import NoteFactory from 'Database/factories/NoteFactory';
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory';


test.group('Notes index', (group) => {
  let user;
  group.setup( async () => {
    await Database.beginGlobalTransaction()
    user = await UserFactory.create()
    return () => Database.rollbackGlobalTransaction()
  })


  test("It should retrieve 0 note", async ({ client, assert }) => {
    const response = await client.get('/notes').loginAs(user)

    response.assertStatus(200)
    assert.lengthOf(response.body(), 0)
  })

  test("It should retrieve 10 notes", async ({ client, assert }) => {
    const count = 10
    await NoteFactory.createMany(count)
    const response = await client.get('/notes').loginAs(user)

    response.assertStatus(200)
    assert.lengthOf(response.body(), count)
  })
})
