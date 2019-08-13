/**
 *
 * IdentityRegistry client module - Main point of entry
 *
 */

'use strict'

//const Web3 = require('web3');
const defaultConfig = require('./config/default-config')

//Declare variables
let web3
let config
let contract

//Set up defaults
function init() {
  setWeb3(null)
  setConfig(defaultConfig)
  refreshContract()
}

//Getters and setters
export function setConfig(_config) {
  config = _config
}

export function getConfig() {
  return config ? config : throw 'config not defined!'
}

export function setWeb3(_web3) {
  web3 = _web3
}

export function getWeb3() {
  return web3
    ? web3
    : throw "web3 not defined! Please set initialize and pass a Web3 object to the module via 'setWeb3()'"
}

//Refresh function to reset contract upon new config provided
export function refreshContract() {
  setContract(new web3.eth.Contract(config.IdentityRegistry.abi, config.IdentityRegistry.address))
}

export function getContract() {
  return contract
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
