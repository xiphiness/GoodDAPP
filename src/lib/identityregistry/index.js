/**
 *
 * IdentityRegistry client module - Main point of entry
 *
 */

'use strict'

const defaultConfig = require('./config/default-config')

let web3
let config
let contract

/**
 * Initializes variables.
 */
function init() {
  setWeb3(null)
  setConfig(defaultConfig)
  refreshContract()
}

/**
 * Refresh function to reset contract upon new config provided
 */
export function refreshContract() {
  let web3 = getWeb3()
  setContract(new web3.eth.Contract(config.IdentityRegistry.abi, config.IdentityRegistry.address))
}

/**
 * ========================================
 *   IdentityRegistry interface functions
 * ========================================
 */

/**
 * ASYNC - Calls IdentityRegistry contract's add() function.
 *
 * @param {string} id - Address of the identity to add [address]
 * @param {string} metadata - Metadata [bytes]
 * @param {string} [sender=""] - The sender of the transaction [address]
 *
 */
export async function add(id, metadata, sender = '') {
  //NOTE: Assumption is defaultAccount for now
  let res = await this.contract.methods.add(id, metadata).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

/**
 * ASYNC - Calls IdentityRegistry contract's remove() function.
 *
 * @param {string} id - Address of the identity to remove [address]
 * @param {string} [sender=""] - The sender of the transaction [address]
 *
 */
export async function remove(id, sender = '') {
  let res = await this.contract.methods.remove(id).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

/**
 * ASYNC - Calls IdentityRegistry contract's update() function.
 *
 * @param {string} id - Address of the identity to update [address]
 * @param {string} metadata - Metadata [bytes]
 * @param {string} [sender=""] - The sender of the transaction [address]
 *
 */
export async function update(id, metadata, sender = '') {
  let res = await this.contract.methods.update(id, metadata).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

/**
 * ASYNC - Calls IdentityRegistry contract's removeSelf() function. If successful, will remove an identity registered under the address of the sender.
 *
 * @param {string} [sender=""] - The sender of the transaction [address]
 *
 */
export async function removeSelf(sender = '') {
  let res = await this.contract.methods.removeSelf().send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

/**
 * ASYNC - Calls IdentityRegistry contract's isHuman() function. Will return true if the address passed is human, false otherwise.
 *
 * @param {string} id - Address of the identity to update [address]
 *
 */
export async function isHuman(id) {
  let res = await this.contract.methods.isHuman(id).call()
  return res
}

/**
 * Getters and setters
 */

//Getters
export function getConfig() {
  return config ? config : throw 'config not defined!'
}

export function getContract() {
  return contract
}

export function getWeb3() {
  return web3
    ? web3
    : throw "web3 not defined! Please set initialize and pass a Web3 object to the module via 'setWeb3()'"
}

//Setters
export function setConfig(_config) {
  config = _config
}

export function setWeb3(_web3) {
  web3 = _web3
}
export function setContract(_contract) {
  contract = _contract
}

/**
 *
 * Initialization execution below
 *
 */

init()
