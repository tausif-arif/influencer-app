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
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './src/context'

const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
          <AuthProvider >
      
     {/* <OnboardingScreen/> */}
     {/* <AnalyticsDashboard/> */}
     <Navigation/>
     </AuthProvider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})