import Person from 'App/Models/Person'
import Factory from '@ioc:Adonis/Lucid/Factory'
import { DateTime } from 'luxon'

export default Factory.define(Person, ({ faker }) => {
  const randomDate = {
    days: faker.datatype.number({ min: 0, max:29200 })
  }

  return {
    name: faker.name.fullName(),
    mother_name: faker.name.fullName(),
    father_name: faker.name.fullName(),
    cep: faker.address.zipCode('########') ,
    birthdate: DateTime.now().minus(randomDate).toISODate()  ,
  }
}).build()
