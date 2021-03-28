import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const style = StyleSheet.create({
  wrapper: {
    marginVertical: 80,
  },
});

export default () => (
  <View style={style.wrapper}>
    <ActivityIndicator />
  </View>
)