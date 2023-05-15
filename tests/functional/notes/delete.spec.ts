import { test } from '@japa/runner'
import NoteFactory from 'Database/factories/NoteFactory';
import PersonFactory from 'Database/factories/PersonFactory';
import UserFactory from 'Database/factories/UserFactory';
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Notes delete', (group) => {
  let user;
  group.setup(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()
    await PersonFactory.create()

    return () => Database.rollbackGlobalTransaction()
  })



  test("It should delete the note", async ({ client }) => {
    await NoteFactory.create()
    const response = await client.delete('/notes/1').loginAs(user)

    response.assertStatus(200)
  })
  test("It shouldn't delete the note", async ({ client }) => {
    const response = await client.delete('/notes/123445').loginAs(user)

    response.assertStatus(404)
  })


})
