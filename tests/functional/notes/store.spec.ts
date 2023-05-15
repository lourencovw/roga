import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import PersonFactory from 'Database/factories/PersonFactory';
import UserFactory from 'Database/factories/UserFactory';


test.group('Notes store', (group) => {
  let user;
  let person;
  group.setup(async () => {

    await Database.beginGlobalTransaction()
    user = await UserFactory.create()
    person = await PersonFactory.create()
    return () => Database.rollbackGlobalTransaction()

  })
  
  test('It should store the note', async ({ client, assert }) => {
    const response = await client.post('/notes').json({
      person: person['id'],
      title: "asasd",
      description: "sdsdfsdf"
    }).loginAs(user)

    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['id', 'person_id', 'description', 'created_at', 'title', 'updated_at']
    )
  })
  test('It should store without description', async ({ client, assert }) => {
    const response = await client.post('/notes').json({
      person: person['id'],
      title: "asasd"
    }).loginAs(user)

    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['id', 'person_id', 'created_at', 'title', 'updated_at']
    )
  })
  test("It shouldn't store without title", async ({ client, assert }) => {
    const response = await client.post('/notes').json({
      person: person['id'],
      description: "sdsdfsdf"
    }).loginAs(user)

    response.assertStatus(422)
    assert.isTrue(response.hasError())
    response.assertBody({
      errors: [
        {
          rule: 'required',
          field: 'title',
          message: 'required validation failed'
        }
      ]
    })
  })
})
