
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  planta_id:{
    type: ObjectId,
    required: true
  },

  tipo_atividade_id:{
    type: ObjectId,
    required: true
  },

  atividade:{
    type: String,
    required: true
  },

  url_imagem:{
    type: String,
    required: true
  },

  mensagem_notificacao:{
    type: String,
    required: true
  },

  periodicidade:{
    type: Array<String>,
    required: true
  },

  dataHora:{
    type: Date
  }
}

export default {
  schema,
}
