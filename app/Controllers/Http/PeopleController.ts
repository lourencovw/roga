import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'
import CreatePerson from 'App/Validators/CreatePersonValidator';

export default class PeopleController {
  public async index() {
    return await Person.query().preload('notes')
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreatePerson);

    const person = new Person()
    person.name = payload.name
    person.father_name = payload.father_name
    person.mother_name = payload.mother_name
    person.cep = payload.cep
    person.birthdate = payload.birthdate

    // Insert to the database
    return await person.save()
  }

  public async show({ request }: HttpContextContract) {

    return await Person.query()
      .where('id', Number(request.param('id')))
      .preload('notes')
      .firstOrFail()
  }

  public async update({ request }: HttpContextContract) {
    const person = await Person.findOrFail(request.param('id'))
    return await person
      .merge(request.body())
      .save()
  }

  public async destroy({ request }: HttpContextContract) {
    const person = await Person.findOrFail(request.param('id'))
    await person.delete()

    return true
  }
}
