import { test } from '@japa/runner'

test.group('People update', () => {
  test('It should update', async ({ client, assert }) => {
    const response = await client.post('/people').json({
      "name": "Test",
      "mother_name": "Test",
      "father_name": "Test",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })
    const responseUpdated = await client.put(`/people/${response.body()['id']}`).json({
      "name": "Update",
      "mother_name": "Update",
      "father_name": "Update",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })
    const {name, mother_name, father_name} = responseUpdated.body()
    assert.strictEqual(name, "Update")
    assert.strictEqual(mother_name, "Update")
    assert.strictEqual(father_name, "Update")
    response.assertStatus(200)
  })
})
