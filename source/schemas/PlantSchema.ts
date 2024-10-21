
import mongoose from 'mongoose'
import { timestamps } from '../config/globals'

const ObjectId = mongoose.Types.ObjectId

const schema = {

  ...timestamps,

  id_usuario:{
    type: ObjectId,
    required: true
  },

  nome:{
    type: String,
    required: true
  },

  url_imagem:{
    type: String,
    required: true
  },

  codigo_acesso_planta:{
    type: String,
    required: true
  }
  
  
}

export default {
  schema,
}
