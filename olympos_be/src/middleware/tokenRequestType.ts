import { Request } from 'express'
import { User } from '../user/schema/user.schema'

export interface tokenRequestType extends Request {
  user: User
}