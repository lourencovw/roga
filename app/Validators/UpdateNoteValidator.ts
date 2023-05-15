import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateNoteValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    person: schema.number.optional(),
    title: schema.string.optional([rules.maxLength(255)]),
    description: schema.string.optional([rules.maxLength(255)])
  })

  public messages: CustomMessages = {}
}
