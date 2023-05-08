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

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return {
      revoked: true
    }
  }

  public async register({ request }: HttpContextContract) {
    const user = new User()

    user.password = request.input('password')
    user.email = request.input('email')

    // Insert to the database
    return await user.save()
  }

}
cd build && npm ci --production &&  node server.js

MYSQL_USER=txwg579bl4fokz96
MYSQL_PASSWORD=jsx0p07zt5y0q8j3
MYSQL_HOST=r4wkv4apxn9btls2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com
MYSQL_PORT=3306
MYSQL_DB_NAME=rf93wrhxh4x0t83f
