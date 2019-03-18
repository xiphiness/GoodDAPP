// @flow
import React, { Component } from 'react'
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { loadReCaptcha, ReCaptcha } from 'recaptcha-v3-react'
import { Wrapper, CustomButton, CustomDialog } from './components/common'
import GoodWallet from './lib/wallet/GoodWallet'
import Config from './config/config'
import userStorage from './lib/gundb/UserStorage'
import logger from './lib/logger/pino-logger'
import GDStore from './lib/undux/GDStore'
import { WebRouter } from './Router'

class App extends Component<{}, { walletReady: boolean, isLoggedIn: boolean, isUserRegistered: boolean }> {
  constructor(props) {
    super()
    this.state = {
      dialogData: { visible: false }
    }
  }
  componentWillMount() {
    //set wallet as global, even though everyone can import the singleton
    loadReCaptcha({
      key: Config.recaptcha,
      id: 'uniqueId'
    })
      .then(id => {
        logger.log('ReCaptcha loaded', id)
      })
      .catch((e, id) => {
        logger.error('Error when load ReCaptcha', id, e)
      })
    // console.log(userStorage)
    userStorage.addMsgListener(this.onMessageRequest)
  }

  onMessageRequest = async (msg: any) => {
    let keys = Object.keys(msg)
    let msgContent = await global.gun.get(keys[1]).then()
    console.log('msg:', msg, Object.keys(msg), msgContent, msg.address, GoodWallet.account)
    // if (msg.ack) return
    if (msg.address === GoodWallet.account) {
      console.log('msg same address')
      return
    }
    global.gun.get('#messages').put(null)
    if (!msg.ack)
      this.setState({
        msg,
        dialogData: {
          visible: true,
          title: 'Please confirm a transaction of ' + msg.value + ' to address ' + msg.address + ' (' + msg.name + ')'
        }
      })
  }
  onDismissDialog = async dialog => {
    let { msg } = this.state
    console.log('onDismiss msg', this.state)
    await GoodWallet.claim().catch(e => console.log(this.state.msg, 'error claim')) // Do claim anyway before the donation
    let tx = await GoodWallet.sendAmount(this.state.msg.address, this.state.msg.value).catch(e =>
      console.log('error send')
    ) // transfer money to the organizaio
    console.log({ tx })
    global.gun.get('#responses').put({ ...msg, ack: 1, txHash: tx.transactionHash })
    this.setState({
      dialogData: {
        visible: false
      }
    })
  }
  onRecaptcha = (token: string) => {
    userStorage.setProfileField('recaptcha', token, 'private')
  }
  render() {
    let { dialogData } = this.state
    return (
      <GDStore.Container>
        <PaperProvider>
          <SafeAreaView>
            <View style={styles.container}>
              {/* <ReCaptcha sitekey={Config.recaptcha} action="auth" verifyCallback={this.onRecaptcha} /> */}
              <WebRouter />
              <CustomDialog onDismiss={this.onDismissDialog} {...dialogData} />
            </View>
          </SafeAreaView>
        </PaperProvider>
      </GDStore.Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    position: 'fixed',
    maxWidth: '1024px',
    alignSelf: 'center',
    backgroundColor: '#fff'
  }
})

let hotWrapper = () => () => App
console.log('Platform', Platform.OS)
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader')
  hotWrapper = hot
}
//$FlowFixMe
export default hotWrapper(module)(App)
