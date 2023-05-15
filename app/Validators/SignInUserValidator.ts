import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignInUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({email: schema.string({}, [
    rules.email()
  ]),
  password: schema.string.optional([rules.maxLength(255)])})
  public messages: CustomMessages = {}
}
