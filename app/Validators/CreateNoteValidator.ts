import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateNoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    person: schema.number([
      rules.exists({ table: 'people', column: 'id' })
    ]),
    title: schema.string(),
    description: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
