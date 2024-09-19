import mongoose from 'mongoose'

export default interface ICare extends Document {
  _id?: mongoose.Types.ObjectId
  efetuado: boolean
  dataHora: Date
  observacoes: string
  cuidado_id: mongoose.Types.ObjectId
}

