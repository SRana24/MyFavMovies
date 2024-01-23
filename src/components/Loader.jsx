import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loader;
