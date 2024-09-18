import mongoose from 'mongoose'

export default interface IUser extends Document {
  _id?: mongoose.Types.ObjectId
  nome: string
  email: string
  senha: string
  createdAt: Date
  userCode: number
  codigoRedefinicaoSenha: string
}

