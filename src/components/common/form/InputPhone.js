// @flow
import React, { useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import { isMobileSafari } from 'mobile-device-detect'
import SimpleStore from '../../../lib/undux/SimpleStore'
import Config from '../../../config/config'

const InputPhone = (props: any) => {
  const simpleStore = SimpleStore.useStore()

  const onFocusMobileSafari = () => {
    console.info('onFocus')
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    simpleStore.set('isMobileSafariKeyboardShown')(true)
  }

  const onBlurMobileSafari = () => simpleStore.set('isMobileSafariKeyboardShown')(false)

  const shouldChangeSizeOnKeyboardShown = isMobileSafari && simpleStore.set && Config.safariMobileKeyboardGuidedSize

  useEffect(() => {
    return () => simpleStore.set('isMobileSafariKeyboardShown')(false)
  }, [])

  return (
    <PhoneInput
      {...props}
      onFocus={() => {
        if (shouldChangeSizeOnKeyboardShown) {
          onFocusMobileSafari()
        }
        if (props.onFocus) {
          props.onFocus()
        }
      }}
      onBlur={() => {
        if (shouldChangeSizeOnKeyboardShown) {
          onBlurMobileSafari()
        }
        if (props.onBlur) {
          props.onBlur()
        }
      }}
    />
  )
}

export default InputPhone
