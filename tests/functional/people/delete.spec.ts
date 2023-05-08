import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory'
import UserFactory from 'Database/factories/UserFactory';

test.group('People delete', (group) => {
  let user;
  group.setup( async () => {
    user = await UserFactory.create()
  })

  test("It should delete", async ({ client }) => {
    await PersonFactory.create()
    const response = await client.delete('/people/1').loginAs(user)

    response.assertStatus(200)
  })
  test("It shouldn't delete", async ({ client }) => {
    const response = await client.delete('/people/10').loginAs(user)

    response.assertStatus(404)
  })
})
