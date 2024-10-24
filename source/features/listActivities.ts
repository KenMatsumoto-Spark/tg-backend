
import to from 'await-to-js'
import Plant from '../models/Plant'
import ActivityType from '../models/ActivityType'

const listActivities = async () => {
  
  try{
    const [error, activityTypes] = await to(ActivityType.find())
  
    if(error) throw new Error()

    return activityTypes
  } catch(ex){
    throw ex
  }

}

export default listActivities