import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person'
import Cep from 'App/Utils/Cep';
import CreatePerson from 'App/Validators/CreatePersonValidator';
import UpdatePerson from 'App/Validators/UpdatePersonValidator';

export default class PeopleController {
  public async index() {
    return await Person.query().preload('notes')
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePerson);

    const { error, data } = await Cep.validate(payload.cep);
    if (error) {
      return response.status(400).send(data)
    }

    const person = new Person()
    person.name = payload.name
    person.father_name = payload.father_name
    person.mother_name = payload.mother_name
    person.cep = payload.cep
    person.birthdate = payload.birthdate
    person.address = data
    // Insert to the database
    return await person.save()
  }

  public async show({ request }: HttpContextContract) {

    return await Person.query()
      .where('id', Number(request.param('id')))
      .preload('notes')
      .firstOrFail()
  }

  public async update({ request, response }: HttpContextContract) {
    const person = await Person.findOrFail(request.param('id'))
    const updatePerson = await request.validate(UpdatePerson);

    if (!updatePerson.cep) {
      return await person
        .merge(request.body())
        .save()
    }

    const { error, data } = await Cep.validate(updatePerson.cep);
    if (error) {
      return response.status(400).send(data)
    }


    return await person
      .merge({ ...request.body(), address: data })
      .save()
  }

  public async destroy({ request }: HttpContextContract) {
    const person = await Person.findOrFail(request.param('id'))
    await person.delete()

    return true
  }
}
