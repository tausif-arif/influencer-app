import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';

// Import screens
import HomeScreen from '../containers/home';
import ContentScreen from '../containers/content';
import MonetizationScreen from '../containers/monetization';
import SettingsScreen from '../containers/settings';
import ProfileScreen from '../containers/profile';
import NotificationsScreen from '../containers/notifications';
import AudienceScreen from '../containers/audience';
import CollaborationsScreen from '../containers/collaborations';
import SubscriptionScreen from '../containers/subscription';
import AuthScreen from '../containers/auth';
import OnboardingScreen from '../containers/onboarding'; // Assuming you have this screen
import { StatusBar, View } from 'react-native';
import { useAuth } from '../context';
import { navigationRef } from './navigationUtils';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

// Auth stack remains the same
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="Auth" component={AuthScreen} />
  </Stack.Navigator>
);

// Add onboarding stack
const OnboardingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="Dashboard" component={HomeScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

const ContentStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="ContentManager" component={ContentScreen} />
    <Stack.Screen name="Audience" component={AudienceScreen} />
  </Stack.Navigator>
);

const MonetizationStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="MonetizationDashboard" component={MonetizationScreen} />
    <Stack.Screen name="Collaborations" component={CollaborationsScreen} />
    <Stack.Screen name="Subscription" component={SubscriptionScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: COLORS.background }
    }}
  >
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

// Main Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Content':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Monetization':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Content"
        component={ContentStack}
        options={{
          title: 'Content',
        }}
      />
      <Tab.Screen
        name="Monetization"
        component={MonetizationStack}
        options={{
          title: 'Earnings',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background }
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
}

// Main Navigation component with conditional rendering based on auth status
const Navigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const { isAuthenticated } = useAuth()

  // Check authentication status and onboarding status

  // if (isLoading) {
  //   // You might want to show a splash screen here
  //   return null;
  // }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="dark-content" />
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.background }
          }}
        >

          {!isAuthenticated ?
            <RootStack.Screen name="AuthStack" component={AuthStack} />
            :
            <RootStack.Screen name="MainApp" component={MainStack} />}


        </RootStack.Navigator>
      </NavigationContainer>
    </View>

  );
};

export default Navigation;