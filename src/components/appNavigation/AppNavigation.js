// @flow
import React from 'react'

import { createSwitchNavigator } from '@react-navigation/core'

import Rewards from './Rewards'
import BuySell from './BuySell'
import Dashboard from './Dashboard'
import Donate from './Donate'
import TabsView from './TabsView'

// TODO: Should we do this diferently?
import rewardsIcon from '../../assets/rewardsIcon.png'
import homeIcon from '../../assets/homeIcon.png'
import buySellIcon from '../../assets/buySellIcon.png'
import donateIcon from '../../assets/donateIcon.png'

type AppNavigationState = {
  pubkey: string
}

type AppNavigationProps = {
  navigation: any
}

const routes = {
  Rewards: {
    screen: Rewards,
    icon: rewardsIcon
  },
  BuySell: {
    screen: BuySell,
    icon: buySellIcon
  },
  Dashboard: {
    screen: Dashboard,
    icon: homeIcon
  },
  Donate: {
    screen: Donate,
    icon: donateIcon
  }
}

const AppNavigator = createSwitchNavigator(routes, {
  initialRouteName: 'Dashboard'
})

class AppNavigation extends React.Component<AppNavigationProps, AppNavigationState> {
  static router = AppNavigator.router

  constructor() {
    super()
    this.goTo = this.goTo.bind(this)
  }

  goTo = (routeKey: string) => {
    this.props.navigation.navigate(routeKey)
  }

  render() {
    return (
      <React.Fragment>
        <TabsView goTo={this.goTo} routes={routes} />
        <AppNavigator navigation={this.props.navigation} />
      </React.Fragment>
    )
  }
}

export default AppNavigation
