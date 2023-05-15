import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory';
import NoteFactory from 'Database/factories/NoteFactory';


test.group('Notes show', (group) => {
  let user;
  group.setup(async () => {
    await Database.beginGlobalTransaction()
    user = await UserFactory.create()
    return () => Database.rollbackGlobalTransaction()
  })

  test("It should show the note", async ({ client }) => {
    const note = await NoteFactory.create()
    const response = await client.get(`/notes/${note.toJSON()['id']}`).loginAs(user)

    response.assertStatus(200)
  })
  test("It shouldn't show the note", async ({ client }) => {
    const response = await client.get('/notes/123').loginAs(user)

    response.assertStatus(404)
  })
})
