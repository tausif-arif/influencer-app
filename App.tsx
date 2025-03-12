import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OnboardingScreen from './src/containers/onboarding'
import AuthScreen from './src/containers/auth'
import AnalyticsDashboard from './src/containers/home'
import Navigation from './src/navigation'
import CollaborationsScreen from './src/containers/collaborations'
import NotificationsScreen from './src/containers/notifications'
import SubscriptionScreen from './src/containers/subscription'
import ContentScreen from './src/containers/content'
import MonetizationScreen from './src/containers/monetization'
import AudienceScreen from './src/containers/audience'

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" hidden />
     <OnboardingScreen/>
     {/* <AuthScreen/> */}
     {/* <AnalyticsDashboard/> */}
     {/* <Navigation/> */}
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})