import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
const apiKey = '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';
import {ChatGptProvider} from 'react-native-chatgpt';
import Chat from './src/screens/BottomTabs/Chat';
import Login from './src/screens/Login';
import Navigation from './src/screens/Navigation';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <ChatGptProvider>
        <Navigation />
      </ChatGptProvider>
    </NavigationContainer>
  );
}

export default App;
