
import to from 'await-to-js'
import axios from 'axios'
import 'dotenv/config'
import { readBuilderProgram } from 'typescript'

const plantIdUrl = process.env.PLANT_ID_URL
const plantIdApiKey = process.env.PLANT_ID_API_KEY
const env = process.env.ENVIRONMENT

const getPlantInfo = async (plant_access_token) => {
  
  const mockedResponse = {
    "common_names": [
        "roseiras"
    ],
    "taxonomy": {
        "class": "Magnoliopsida",
        "genus": "Rosa",
        "order": "Rosales",
        "family": "Rosaceae",
        "phylum": "Tracheophyta",
        "kingdom": "Plantae"
    },
    "url": "https://pt.wikipedia.org/wiki/Rosa",
    "gbif_id": 8395064,
    "inaturalist_id": 53438,
    "rank": "genus",
    "description": {
        "value": "A rosa (do latim rosa) é uma das flores mais populares no mundo. Vem sendo cultivada pelo homem desde a Antiguidade. A primeira rosa cresceu nos jardins asiáticos há 5 000 anos. Na sua forma selvagem, a flor é ainda mais antiga. Celebrada ao longo dos séculos, a rosa, símbolo dos apaixonados, também marcou presença em eventos históricos importantes e decisivos. Fósseis dessas rosas datam de há 35 milhões de anos.",
        "citation": "https://pt.wikipedia.org/wiki/Rosa",
        "license_name": "CC BY-SA 3.0",
        "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "synonyms": [
        "Bakeria",
        "Chabertia",
        "Chavinia",
        "Cottetia",
        "Crepinia",
        "Ernestella",
        "Hesperhodos",
        "Hulthemia",
        "Hulthemosa",
        "Juzepczukia",
        "Laggeria",
        "Lowea",
        "Ozanonia",
        "Platyrhodon",
        "Pugetia",
        "Rhodophora",
        "Rhodopsis",
        "Ripartia",
        "Rosa cinnamonea",
        "Saintpierrea",
        "Scheutzia",
        "× Hulthemosa"
    ],
    "image": {
        "value": "https://plant-id.ams3.cdn.digitaloceanspaces.com/knowledge_base/wikidata/017/01796bf84a265caffcf6dd760fea533b8ded2b34.jpg",
        "citation": "//commons.wikimedia.org/wiki/User:Tigerente",
        "license_name": "CC BY-SA 3.0",
        "license_url": "https://creativecommons.org/licenses/by-sa/3.0/"
    },
    "edible_parts": null,
    "watering": {
        "max": 2,
        "min": 2
    },
    "propagation_methods": null,
    "language": "pt",
    "entity_id": "d5d25f70440d18d2",
    "name": "Rosa"
  }
  
  if(env != "prod"){
    return mockedResponse
  }

  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${plantIdUrl}/api/v3/kb/plants/${plant_access_token}?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods&language=pt`,
    headers: { 
      'Api-Key': plantIdApiKey
    }
  };
  
  const [error, plantInfo] = await to(axios.request(config))

  if(error) throw new Error()
  
  const plant = plantInfo?.data
  
  return plant
}

export default getPlantInfo