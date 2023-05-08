import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdatePersonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional([rules.maxLength(255)]),
    mother_name: schema.string.optional([rules.maxLength(255)]),
    father_name: schema.string.optional([rules.maxLength(255)]),
    cep: schema.string.optional([rules.regex(/^\d{8}$/gm)]),
    birthdate: schema.date.optional({ format: 'yyyy-MM-dd' })
  })

  public messages: CustomMessages = {}
}
