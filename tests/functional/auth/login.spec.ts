import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import UserFactory from 'Database/factories/UserFactory';

test.group('Auth login', (group) => {
  let user;
  group.setup(async () => {
    await Database.beginGlobalTransaction()
    user = await UserFactory.makeStubbed()
    return () => Database.rollbackGlobalTransaction()
  })

  test('It should sign in', async ({ client, assert }) => {
    const email = user.email;
    const password = user.password;
    await user.save()
    const response = await client.post('/login').json({
      email,
      password
    });
    
    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['type', 'token']
    )
  })
  test('It should not sign in', async ({ client, assert }) => {
    const email = 'random@email.com';
    const password = 'RandomPassword';
    const response = await client.post('/login').json({
      email,
      password
    });
    
    response.assertStatus(401)
    assert.equal(
      response.text(),
      'Invalid credentials'
    )
  })
})
