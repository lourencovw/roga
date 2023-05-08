import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Note from 'App/Models/Note'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public father_name: string | undefined

  @column()
  public mother_name: string

  @column()
  public cep: string

  @column()
  public address: any

  @hasMany(() => Note)
  public notes: HasMany<typeof Note>

  @column.date()
  public birthdate: any


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
