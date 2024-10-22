
import to from 'await-to-js'
import axios from 'axios'
import 'dotenv/config'

const plantIdUrl = process.env.PLANT_ID_URL
const plantIdApiKey = process.env.PLANT_ID_API_KEY

const searchPlant = async (search) => {

  const urlConstructionString = `${plantIdUrl}/api/v3/kb/plants/name_search?q=${search}&language=pt&thumbnails=true`

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: urlConstructionString,
    headers: { 
      'Api-Key': plantIdApiKey
    }
  };

  const [error, searchData] = await to(axios.request(config))

  if(error) throw new Error(error.toString())

  const plants = searchData?.data?.entities
  
  return plants
}

export default searchPlant