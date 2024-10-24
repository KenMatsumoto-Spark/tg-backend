
import to from 'await-to-js'
import Plant from '../models/Plant'

const addPlant = async (userId, plant, plant_access_token) => {
  
  try{
    const [error, addedPlant] = await to(Plant.create({
      id_usuario: userId,
      nome: plant.name,
      url_imagem: plant.image.value,
      codigo_acesso_planta: plant_access_token
    }))
  
    if(error) throw new Error()

    return addedPlant
  } catch(ex){
    throw ex
  }

}

export default addPlant