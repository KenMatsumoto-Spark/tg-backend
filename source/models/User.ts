import mongoose from 'mongoose'
import AutoIncrementFactory from 'mongoose-sequence'

import UserSchema from '../schemas/UserSchema'
import IUser from '../interfaces/IUser'

const AutoIncrement = AutoIncrementFactory(mongoose.connection)

interface IUserModel extends mongoose.Model<IUser> {}

const User: mongoose.Schema = new mongoose.Schema(UserSchema.schema, { timestamps: true })

User.plugin(AutoIncrement, { inc_field: 'userCode' })

export default mongoose.model<IUser, IUserModel>('usuario', User)
