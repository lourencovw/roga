import { test } from '@japa/runner'

test.group('People store', () => {
  test('It should store', async ({ client, assert }) => {
    const response = await client.post('/people').json({
      "name": "test",
      "mother_name": "Maria",
      "father_name": "Jose",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })

    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['id', 'birthdate', 'cep', 'created_at', 'father_name', 'mother_name', 'name', 'updated_at']
    )
  })
  test('It should store without father_name', async ({ client, assert }) => {
    const response = await client.post('/people').json({
      "name": "test",
      "mother_name": "Maria",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })

    response.assertStatus(200)
    assert.properties(
      response.body(),
      ['id', 'birthdate', 'cep', 'created_at', 'mother_name', 'name', 'updated_at']
    )
  })
  test("It shouldn't store without mother_name", async ({ client, assert }) => {
    const response = await client.post('/people').json({
      "name": "test",
      "father_name": "Jose",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })

    response.assertStatus(422)
    assert.isTrue(response.hasError())
    response.assertBody({
      errors: [
        {
          rule: 'required',
          field: 'mother_name',
          message: 'required validation failed'
        }
      ]
    })
  })
  test("It shouldn't store without name", async ({ client, assert }) => {
    const response = await client.post('/people').json({
      "mother_name": "Maria",
      "father_name": "Jose",
      "cep": "12312312",
      "birthdate": "2021-05-02"
    })

    response.assertStatus(422)
    assert.isTrue(response.hasError())
    response.assertBody({
      errors: [
        {
          rule: 'required',
          field: 'name',
          message: 'required validation failed'
        }
      ]
    })
  })
})
