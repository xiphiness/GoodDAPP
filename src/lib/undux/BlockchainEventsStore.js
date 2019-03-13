// @flow
import { createConnectedStore } from 'undux'
import unduxLogger from '../undux/plugins/logger'

type StoreProps = {
  [string]: Array<EventLog>
}

let initialState: StoreProps = {}

let { useStore, withStore, Container } = createConnectedStore(initialState, unduxLogger)

export { useStore, withStore, Container }
