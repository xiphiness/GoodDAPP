import Gun from 'gun'
import Config from '../../config/config'
import logger from '../logger/pino-logger'
import gundbextend from './gundb-extend'

const initGunDB = () => {
  if (!global.gun) {
    if (process.env.NODE_ENV === 'test') {
      global.gun = Gun()
    } else global.gun = Gun(['http://localhost:3003/gun', 'http://goodcart.herokuapp.com/gun'])
    logger.debug('Initialized gundb in http://goodcart.herokuapp.com/gun')
  }
}

export default initGunDB()
