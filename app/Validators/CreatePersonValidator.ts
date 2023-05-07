import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePersonValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string(),
    mother_name: schema.string(),
    father_name: schema.string.optional(),
    cep: schema.string([rules.maxLength(8)]),
    birthdate: schema.date({ format: 'yyyy-MM-dd' })
  })

  public messages: CustomMessages = {}
}
