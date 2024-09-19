import mongoose from 'mongoose'

export default interface ICare extends Document {
  _id?: mongoose.Types.ObjectId
  descricao: string
  mensagem_padrao: string
}

