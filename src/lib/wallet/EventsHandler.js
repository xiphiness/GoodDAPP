// @flow
import { type GoodWallet } from './GoodWallet'
import type { Web3, EventLog } from 'web3'
import { type FeedEvent } from '../gundb/UserStorage'
import userStorage from '../gundb/UserStorage'
import { useStore } from '../undux/BlockchainEventsStore'

export default class EventsHandler {
  wallet: GoodWallet
  contracts: Array<string> = ['identity', 'token', 'claim', 'oneTimePaymentLinks']
  lastBlock: number = 0
  store: any

  constructor(wallet: GoodWallet) {
    console.log(wallet)
    this.wallet = wallet
    this.init()
    this.store = useStore()
  }

  static delay(t: number, v: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(resolve.bind(null, v), t)
    })
  }

  async init() {
    this.lastBlock = (await userStorage.gunUser.get('lastBlock').then()) || 0
    this.poll()
  }

  //websockets
  async subscribe() {
    this.wallet.wallet.eth.subscribe('newBlockHeaders', header => {
      console.log('New block header', header)
    })
    let handlers = this.contracts.map(async c => {
      try {
        let contract: Web3.eth.Contract = this.wallet[c]
        let emitter = await contract.events.allEvents({
          fromBlock: this.lastBlock
        })
        emitter.on('data', (event: EventLog) => {
          console.log({ c, event })
        })
        emitter.on('error', e => {
          console.error({ c, e })
        })
        return emitter
      } catch (e) {
        console.log('Error handling events for:', c, e.message)
      }
    })
  }
  //non websockets
  async poll() {
    let { curBlock } = await this.wallet.wallet.eth.getBlock('latest', false)
    let promises: Array<Promise<any>> = []
    if (curBlock > this.lastBlock) {
      let step = Math.min(curBlock - this.lastBlock, 17280)
      let toBlock = this.lastBlock + step
      promises = this.contracts.map(async c => {
        try {
          if (this[c + 'Events']) {
            let contractEvents: Array<EventLog> = await this[c + 'Events'](this.lastBlock, toBlock)
            this.store.set(c)(contractEvents)
          }
        } catch (e) {
          console.log('Error handling events for:', c, e.message)
        }
      })
      this.lastBlock = toBlock
      promises.push(userStorage.gunuser.get('lastBlock').putAck(toBlock))
      //if we are reading backlogs then dont put a delay
      if (curBlock === toBlock) promises.push(EventsHandler.delay(5000))
    }
    await Promise.all(promises)
    this.poll()
  }

  async tokenEvents(fromBlock: number, toBlock: number): Promise<Array<EventLog>> {
    let contract: Web3.eth.Contract = this.wallet.tokenContract
    let events: Array<EventLog> = await contract.getPastEvents('allEvents', {
      fromBlock,
      filter: { from: this.wallet.account },
      toBlock
    })
    let events2: Array<EventLog> = await contract.getPastEvents('allEvents', {
      fromBlock,
      filter: { to: this.wallet.account },
      toBlock
    })
    return events.concat(events2)
  }

  async oneTimePaymentLinksEvents(fromBlock: number, toBlock: number): Promise<Array<EventLog>> {
    let contract: Web3.eth.Contract = this.wallet.oneTimePaymentLinksContract
    let events: Array<EventLog> = await contract.getPastEvents('allEvents', {
      fromBlock,
      filter: { from: this.wallet.account },
      toBlock
    })
    let events2: Array<EventLog> = await contract.getPastEvents('allEvents', {
      fromBlock,
      filter: { to: this.wallet.account },
      toBlock
    })
    return events.concat(events2)
  }
}
