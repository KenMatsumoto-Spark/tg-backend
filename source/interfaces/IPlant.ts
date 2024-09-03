import mongoose from 'mongoose'

export default interface IUser extends Document {
  _id?: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
}

