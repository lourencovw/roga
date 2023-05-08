import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note';
import CreateNote from 'App/Validators/CreateNoteValidator';

export default class NotesController {
  public async index({ }: HttpContextContract) { }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(CreateNote);

    const note = new Note()
    note.personId = payload.person
    note.title = payload.title
    note.description = payload.description

    // Insert to the database
    return await note.save()
  }

  public async show({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
