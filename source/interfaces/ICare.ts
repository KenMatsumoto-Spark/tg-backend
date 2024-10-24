import mongoose from 'mongoose'

export default interface ICare extends Document {
  _id?: mongoose.Types.ObjectId
  id: string
  atividade: string
  hora: string
  minuto: string
  frequencia: string
  dia: string
  texto: string
  ativa: boolean
  planta_id: mongoose.Types.ObjectId
  tipo_atividade_id: mongoose.Types.ObjectId
}

