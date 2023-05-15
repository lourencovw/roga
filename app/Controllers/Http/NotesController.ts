import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note';
import CreateNote from 'App/Validators/CreateNoteValidator';
import UpdateNote from 'App/Validators/UpdateNoteValidator';

export default class NotesController {
  public async index({ }: HttpContextContract) {
    return await Note.all()
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateNote);

    const note = new Note()
    note.personId = payload.person
    note.title = payload.title
    note.description = payload.description

    // Insert to the database
    return await note.save()
  }

  public async show({ request }: HttpContextContract) {
    return await Note.findOrFail(request.param('id'))
  }

  public async update({ request }: HttpContextContract) {
    const payload = await request.validate(UpdateNote);
    const note = await Note.findOrFail(request.param('id'))

    return await note
      .merge(payload)
      .save()
  }

  public async destroy({ request }: HttpContextContract) {
    const person = await Note.findOrFail(request.param('id'))
    await person.delete()

    return true
  }
}
