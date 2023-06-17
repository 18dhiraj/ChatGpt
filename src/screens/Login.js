import * as React from 'react';
import { Image, StyleSheet, View , Button, AppState} from 'react-native';
import { useChatGpt } from 'react-native-chatgpt';

const Login = () => {
  const { login  , status} = useChatGpt();

  return (
    <View style={styles.container}>
      <Button
        contentStyle={{ height: 56 }}
        labelStyle={{ fontSize: 16 }}
        mode="contained"
        onPress={()=>login()}
        title='Login'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  image: {
    alignSelf: 'center',
    width: 128,
    height: 128,
    resizeMode: 'contain',
    borderRadius: 64,
    marginBottom: 32,
  },
});

export default Login