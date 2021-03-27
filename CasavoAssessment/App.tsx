/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
enableScreens();
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { store } from './src/core';
import { Navigator } from './src';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle={'dark-content'} />
    <Provider store={store}>
      <Navigator />
    </Provider>
  </SafeAreaView>
);

export default App;
