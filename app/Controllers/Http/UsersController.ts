import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }

  public async register({ request }: HttpContextContract) {
    const user = new User()
    const email = request.input('email')
    const password = request.input('password')

    user.username = 'virk'
    user.email = 'virk@adonisjs.com'

    // Insert to the database
    return await user.save()
  }

}
