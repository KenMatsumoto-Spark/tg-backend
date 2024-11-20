
import to from 'await-to-js'
import ActivityCare from '../models/ActivityCare'

const addActivityCare = async (careId, dia, mes, ano, minuto, hora) => {

  try {
    const [error, addedActivityCare] = await to(ActivityCare.create({
      cuidado_id: careId, dia, mes, ano, minuto, hora
    }))

    if (error) throw new Error()

    return addedActivityCare
  } catch (ex) {
    throw ex
  }

}

export default addActivityCare