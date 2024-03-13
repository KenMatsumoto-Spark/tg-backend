import mongoose from 'mongoose'

export default interface IUser extends Document {

  _id?: mongoose.Types.ObjectId
  name: string
  email: string
  password: string

  userCode: number
}

