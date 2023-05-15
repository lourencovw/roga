import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory'

test.group('Auth register', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('It should sign up', async ({ client, assert }) => {
    const user = await UserFactory.makeStubbed()
    const email = user.email
    const password = user.password
    const response = await client.post('/register').json({
      email,
      password
    });

    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['id', 'email', 'created_at', 'updated_at']
    )
  })
  test('It should not sign up', async ({ client, assert }) => {
    const user = await UserFactory.makeStubbed()
    const email = user.email
    const password = user.password
    await user.save()
    const response = await client.post('/register').json({
      email,
      password
    });
    

    response.assertStatus(422)
    assert.properties(
      response.body(),
      {
        errors: [
            {
                rule: "unique",
                field: "email",
                message: "unique validation failure"
            }
        ]
    }
    )
  })
})
