import mongoose from 'mongoose'

export default interface IPlant extends Document {
  _id?: mongoose.Types.ObjectId
  id_usuario: mongoose.Types.ObjectId
  nome: string
  url_imagem: string
  codigo_acesso_planta: string
}

