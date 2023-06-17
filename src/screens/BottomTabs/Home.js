import React from "react";
import { Text, View ,Button } from "react-native";
import * as SecureStore from 'expo-secure-store';

const Home = () => {

  const logout = () => {
    SecureStore.deleteItemAsync('TOKEN_ACCESS_KEY').then(() => {
      alert('logout successfully');
    })
  }
  const getToken = async () => {
    let token = await SecureStore.getItemAsync('TOKEN_ACCESS_KEY')
    alert(token)
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home</Text>
      {/* <View><Button onPress={logout} title={"logout"} /></View>
      <View><Button onPress={getToken} title={"token"} /></View> */}
    </View>
  )
}

export default Home