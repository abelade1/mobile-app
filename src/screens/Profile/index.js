import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Following from './Following';
import Followers from './Followers';
import ProfileMain from './ProfileMain';
import ProfileSettings from './Settings';
import GrowItCalendar from './AddToCalendar'
import Articles from "../Articles/ArticleGuide";


const Stack = createStackNavigator();

const { Navigator, Screen } = Stack;

const ProfileNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name='Profile-Settings' component={ProfileSettings} />
      <Screen name='Main-Profile' component={ProfileMain} />
      <Screen name='Following' component={Following} />
      <Screen name='Followers' component={Followers} />
      <Screen name='GrowItCalendar' component={GrowItCalendar} />
      <Screen name='Article-guide' component={Articles} />
    </Navigator>
  );
};

export default ProfileNavigator;
