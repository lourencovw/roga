import { test } from '@japa/runner'
import PersonFactory from 'Database/factories/PersonFactory';
import UserFactory from 'Database/factories/UserFactory';

test.group('People update', (group) => {
  let user,person;
  group.setup( async () => {
    user = await UserFactory.create()
    person = await PersonFactory.create()
  })

  test('It should update', async ({ client, assert }) => {
    const response = await client.put(`/people/${person['id']}`).json({
      "name": "Update",
      "mother_name": "Update",
      "father_name": "Update",
      "birthdate": "2021-05-02"
    }).loginAs(user)

    const {name, mother_name, father_name} = response.body()
    assert.strictEqual(name, "Update")
    assert.strictEqual(mother_name, "Update")
    assert.strictEqual(father_name, "Update")
    response.assertStatus(200)
  })

  test("It shouldn't update with invalid cep", async ({ client, assert }) => {
    const response = await client.put(`/people/${person['id']}`).json({
      cep: "12345678"
    }).loginAs(user)

    response.assertStatus(400)
    assert.isTrue(response.hasError())
    response.assertBody({
      errors: [
        {
          field: "cep",
          message: "cep validation failed",
          rule: "cep",
        }
      ]
    })
  })
  test("It shouldn't update with invalid cep format", async ({ client, assert }) => {
    const response = await client.put(`/people/${person['id']}`).json({
      cep: "12345"
    }).loginAs(user)

    response.assertStatus(422)
    assert.isTrue(response.hasError())
    response.assertBody({
      errors: [
        {
          field: "cep",
          message: "regex validation failed",
          rule: "regex"
        }
      ]
    })
  })
})
