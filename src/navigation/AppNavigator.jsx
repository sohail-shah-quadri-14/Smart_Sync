import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ChatScreen from '../screens/ChatScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MusicScreen from '../screens/MusicScreen';
import ExerciseScreen from '../screens/Excercise';
import ReadScreen from '../components/ReadScreen';
import LaughCompo from '../components/LaughCompo';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ServicesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ServicesMain" 
        component={ServicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Exercise" 
        component={ExerciseScreen}
        options={{
          title: 'Exercise',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
      name="Music"
      component={MusicScreen}
      options={{
        title: 'Music',
      }}
      />
      <Stack.Screen
      name="Read"
      component={ReadScreen}
      options={{
        title: 'Read',
      }}
      />
      <Stack.Screen
      name="Laugh"
      component={LaughCompo}
      options={{
        title: 'Laugh',
      }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Scan':
                iconName = focused ? 'scan' : 'scan-outline';
                break;
              case 'Chat':
                iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                break;
              case 'Services':
                iconName = focused ? 'medkit' : 'medkit-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              case 'Music':
                iconName = focused ? 'musical-notes' : 'musical-notes-outline';
                break;
              default:
                iconName = 'help-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen 
          name="Scan" 
          component={ScannerScreen}
          options={{
            title: 'Scan Medicine',
          }}
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen}
          options={{
            title: 'Chat Support',
          }}
        />
        <Tab.Screen 
          name="Services" 
          component={ServicesStack}
          options={{
            title: 'Medical Services',
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            title: 'My Profile',
          }}
        />
        {/* <Tab.Screen
          name="Music"
          component={MusicScreen}
          options={{
            title: 'Music',
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;