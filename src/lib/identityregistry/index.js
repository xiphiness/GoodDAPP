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
 *
 *
 */
export async function add(id /*: string*/, metadata /*: string*/, sender /*: string*/ = '') {
  //NOTE: Assumption is defaultAccount for now
  let res = await this.contract.methods.add(id, metadata).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

export async function remove(id /*: string*/, sender /*: string*/ = '') {
  let res = await this.contract.methods.remove(id).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

export async function update(id /*: string*/, metadata /*: string*/, sender /*: string*/ = '') {
  let res = await this.contract.methods.update(id, metadata).send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

export async function removeSelf(sender /*: string*/ = '') {
  let res = await this.contract.methods.removeSelf().send({ from: sender || this.web3.eth.defaultAccount })
  return res
}

export async function isHuman(id /*: string*/) {
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
