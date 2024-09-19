import mongoose from 'mongoose'

export default interface ICare extends Document {
  _id?: mongoose.Types.ObjectId
  atividade: string
  dataHora: Date
  planta_id: mongoose.Types.ObjectId
  tipo_atividade_id: mongoose.Types.ObjectId
  mensagem_notificacao: string
  periodicidade: Array<string>
}

