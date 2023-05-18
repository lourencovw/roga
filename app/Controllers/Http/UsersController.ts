import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator';
import SignInUser from 'App/Validators/SignInUserValidator';

export default class UsersController {
  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(SignInUser);

    const email = payload.email
    const password = payload?.password || ''

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }

  public async register({ request }: HttpContextContract) {
    const payload = await request.validate(CreateUser)

    const user = new User()

    user.password = payload?.password || ''
    user.email = payload.email

    // Insert to the database
    return await user.save()
  }

}
