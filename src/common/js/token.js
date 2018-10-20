import localStore from './localStore'
import {gettoken} from 'api/common'
export function handleToken () {
  let token = localStore.get('token', '')
  return token === '' ?  gettoken : Promise.resolve(token)
}