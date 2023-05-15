import Note from 'App/Models/Note'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Note, ({ faker }) => {

  return {
    person: 1,
    title: faker.lorem.word(),
    description: faker.lorem.word()
  }
}).build()
