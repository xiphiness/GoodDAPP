// @flow
import React from 'react'
import debounce from 'lodash/debounce'
import { validateFullName } from '../../lib/validators/validateFullName'
import { withStyles } from '../../lib/styles'
import InputText from '../common/form/InputText'
import Section from '../common/layout/Section'
import CustomWrapper from './signUpWrapper'

type Props = {
  doneCallback: ({ name: string }) => null,
  screenProps: any,
  navigation: any,
  styles: any,
}

type State = {
  errorMessage: string,
  fullName: string,
}

export type NameRecord = {
  fullName: string,
}

class NameForm extends React.Component<Props, State> {
  state = {
    errorMessage: '',
    fullName: this.props.screenProps.data.fullName || '',
    isValid: true,
  }

  input = undefined

  handleChange = (fullName: string) => {
    this.checkErrorsSlow()
    this.setState({ fullName })
  }

  handleSubmit = () => {
    const { fullName } = this.state
    const isValid = this.checkErrors()
    if (isValid) {
      this.props.screenProps.doneCallback({ fullName })
    }
  }

  checkErrors = () => {
    const errorMessage = validateFullName(this.state.fullName)
    this.setState({ errorMessage, isValid: errorMessage === '' })
    return errorMessage === ''
  }

  checkErrorsSlow = debounce(this.checkErrors, 500)

  handleEnter = (event: { nativeEvent: { key: string } }) => {
    if (event.nativeEvent.key === 'Enter') {
      this.handleSubmit()
    }
  }

  render() {
    const { fullName, errorMessage } = this.state
    const { key } = this.props.navigation.state
    return (
      <CustomWrapper valid={this.state.isValid} handleSubmit={this.handleSubmit}>
        <Section.Stack grow justifyContent="flex-start">
          <Section.Row justifyContent="center" style={this.props.styles.row}>
            <Section.Title textTransform="none">{'Hi, Please enter your full name'}</Section.Title>
          </Section.Row>
          <Section.Row justifyContent="center">
            <InputText
              id={key + '_input'}
              value={fullName}
              onChangeText={this.handleChange}
              error={errorMessage}
              onKeyPress={this.handleEnter}
              onCleanUpField={this.handleChange}
              autoFocus
            />
          </Section.Row>
        </Section.Stack>
      </CustomWrapper>
    )
  }
}

NameForm.navigationOptions = {
  title: 'Name',
}

const getStylesFromProps = ({ theme }) => ({
  row: {
    marginVertical: theme.sizes.defaultQuadruple,
  },
})

export default withStyles(getStylesFromProps)(NameForm)
